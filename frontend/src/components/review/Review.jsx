import React, { memo, useEffect, useState, useRef, useContext, useReducer } from "react";
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { useRouteProps } from 'hooks/routerHooks';
import { makeReviewList } from 'helpers/reviewHelpers';
import { ReviewContext } from 'context/ReviewContext';
import { useRequest } from 'hooks/useRequest';
import { handleGetList, getList, handlePutList, putList } from 'helpers/apiHandlers/listHandlers';
import { saturate } from 'helpers/srs/saturation';

import { termsToReviewState } from 'recoil/atoms/reviewAtoms';

import ReviewCard from './ReviewCard';
import PreReview from './PreReview';
import PostReview from './PostReview';
import ReviewInfo from './ReviewInfo';

import './style/Review.scss';

const Review = memo((props) => {
    const { params } = useRouteProps(),
        [session, setSession] = useState(() => ({ start: new Date(), end: false })),
        [list, setList] = useState(null),
        [futureTerms, reduceFutureTerms] = useReducer(termReducer, null),
        [currentCard, setCurrentCard] = useState(null),
        [progress, setProgress] = useState(0),  // percentage of terms marked 'pass' in the session
        { reviewContext } = useContext(ReviewContext),
        { n, direction, started } = reviewContext.settings,
        [backWasShown, setBackWasShown] = useState(null),
        failRef = useRef(null),  // refs for handleLeftRightArrowKeydown to target
        passRef = useRef(null);
    let timeout = useRef(null);

    const { setRequest: setGetRequest } = useRequest({
        handleResponse: (res, setResponse) => {
            res = res.data

            if (res.content && res.content.length > 0) {
                setResponse(res);
                setList(res)
                reduceFutureTerms({
                    type: 'init',
                    payload: makeReviewList(res.content, n)
                })
            }
        },
        handleError: handleGetList().handleError
    })
    const { setRequest: setPutRequest } = useRequest({ ...handlePutList() })


    // ----- REFACTOR
    const termsToReview = useRecoilValue(termsToReviewState);
    useEffect(() => {
        if (termsToReview.length > 0) {
            console.log(termsToReview);
        }
    }, [termsToReview])

    // -----

    useEffect(() => {  // get list from database and initialize futureTerms
        setGetRequest(() => getList(params.username, { _id: params.id }))
    }, [])

    useEffect(() => {
        return () => {
                window.clearTimeout(timeout.current);
        }
    })

    useEffect(() => {
        if (list) {
            reduceFutureTerms({
                type: 'init',
                payload: makeReviewList(list.content, Number(n))
            })
        }
    }, [n]) // including list in deps causes session to be malformed somehow (progress doesn't change when moving to a new term)

    useEffect(() => {  // create new card to show, remove old and add new up/down key handler
        if (list && futureTerms) {
            let sessionLength = list.content.length * n;
            let termsCompleted = sessionLength - futureTerms.length;
            setProgress(Math.floor(100 * termsCompleted / sessionLength));
        }

        futureTerms?.length > 0 && setCurrentCard(
            <ReviewCard
                setBackWasShown={setBackWasShown}
                key={uuidv4()}
                direction={direction}
                term={futureTerms[0]} />)

        futureTerms?.length === 0 && endSession(list);

        window.addEventListener('keydown', handleLeftRightArrowKeyDown)

        return () => {
            setCurrentCard(null)
            window.removeEventListener('keydown', handleLeftRightArrowKeyDown)
        }
    }, [futureTerms, direction])

    /**
     * ArrowLeft/ArrowRight keydown event to simulate pressing the Pass/Fail buttons
     * @param {*} e event object
     */
    function handleLeftRightArrowKeyDown(e) {
        let ref;
        switch (e.code) {
            case 'ArrowLeft':
                ref = failRef;
                break;
            case 'ArrowRight':
                ref = passRef
                break;
            default:
                return
        }

        if (ref.current) {
            ref.current.focus()
            ref.current.click();
            timeout.current = (setTimeout(() => {  // highlight button for UX
                setBackWasShown(false);
                if (ref.current) {
                    ref.current.blur()
                }
            }, 100)
            )
        }

    }

    /**
     * case init: initialize futureTerms using list.content from database
     * case pass/fail: Handle what happens to current term after pass/fail is chosen.
     * @param {Array} terms     array of terms
     * @param {Object} action   properties: type (init, pass, fail). if type 'init', send terms as action.payload
     */
    function termReducer(terms, action) {

        switch (action.type) {
            case 'init':
                return action.payload
            case 'pass':
                return terms.slice(1,);  // remove the term
            case 'fail':
                let newIndex = Math.floor((terms.length + 1) * Math.random());

                let newTerms = [...terms];
                let currentTerm = newTerms.shift();
                newTerms.splice(newIndex, 0, currentTerm);
                return newTerms
            default:
                return terms
        }
    }

    /**
     * Find current term in list.content, update its history, and setList with updated list.content
     * @param {object} term     should always be futureTerms[0]
     * @param {string} passfail 'pass'/'fail'
     * @return {object}         copy of newly set list state
     */
    function updateTermHistory(term, passfail) {
        const content = [...list.content];
        let idx = content.findIndex(i => i.to === term.to && i.from === term.from)

        if (!content[idx].history || content[idx].history.length === 0) {
            content[idx].history = [{
                date: session.start,
                content: [],
                direction
            }]
        }
        if (content[idx].history.length > 0) {
            let histLen = content[idx].history.length
            let lastHist = content[idx].history[histLen - 1];

            if (dayjs(lastHist.date) < dayjs(session.start)) {
                content[idx].history.push({
                    date: session.start,
                    content: [passfail],
                    direction
                })
            } else {
                content[idx].history[histLen - 1].content.push(passfail)
            }
        }
        setList({ ...list, content: [...content] });
    }

    /**
     * Handle clicking the pass or fail button
     * @param {*} e javascript event
     * @param {string} passfail 'pass'/'fail'
     */
    function handlePassFailClick(e, passfail) {
        e.preventDefault();
        updateTermHistory(futureTerms[0], passfail);
        reduceFutureTerms({ type: passfail })
        setBackWasShown(false);
    }

    /**
     * Append this session's information to the list, determine each term's saturation level, and update list in database.
     * @param {Array} list list state
     */
    function endSession(list) {
        let end = new Date();
        setSession({ ...session, end });

        list.sessions.push({
            start: session.start,
            end,
            numTerms: list.content.length,
            termsReviewed: Number(n) * list.content.length,
            n: Number(n),
            direction
        });

        list.lastReviewed = end;

        list.content = list.content.map(term => {
            const newTerm = { ...term };
            newTerm.saturation = { ...newTerm.saturation, [direction]: saturate(newTerm, direction) };
            return newTerm
        });

        setPutRequest(() => putList(params.username, { _id: params.id, owner: list.owner }, list))
    }

    return (
        <div className="PageWrapper Review">
            { list &&
                <>
                    <div className="PageHeader Review__title">
                        <div> Reviewing<span className="Review__title--name"><em>{list.name}</em></span> </div>
                        <div> <Link className="Button" to={`/u/${params.username}/list/${params.id}`}>Back to list</Link> </div>
                    </div>
                </>
            }

            { list && !started
                ?
                <PreReview />
                :
                <>
                    { !session.end && currentCard &&
                        <>
                            {currentCard}

                            { backWasShown
                                ?
                                <>
                                    <div className="Review__buttons">
                                        <input
                                            ref={failRef}
                                            onClick={(e) => { if (backWasShown) handlePassFailClick(e, 'fail') }}
                                            disabled={!backWasShown}
                                            className="Review__button Review__button--fail"
                                            type="button"
                                            value="Fail"
                                        />
                                        <input
                                            ref={passRef}
                                            onClick={(e) => { if (backWasShown) handlePassFailClick(e, 'pass') }}
                                            disabled={!backWasShown}
                                            className="Review__button Review__button--pass"
                                            type="button"
                                            value="Pass"
                                        />
                                    </div>

                                </>
                                :
                                <div className="Review__prevent">
                                    Cannot move on to the next term until you've seen the back of the card.
                                </div>
                            }
                            <div className="Review__progress--wrapper">
                                <div 
                                    className="Review__progress--bar" 
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            { session.start &&
                                <ReviewInfo
                                    start={session.start}
                                    numTerms={list.content.length}
                                    n={n}
                                    progress={progress}
                                />
                            }

                        </>
                    }

                    { session.end &&
                        <>
                            <PostReview
                                sessionStart={session.start}
                                sessionEnd={session.end}
                                list={list}
                            />
                        </>
                    }
                </>
            }
        </div>
    )
})

export default Review;

/*
@todo?  set progress bar color based in session cycle. go to 100% n time with various colors, instead of slowly progress a single bar
        makes it feel like progress is faster

@todo postsession: let user know session has been stored in db

@note: list loads with n = 2 terms by default, but is rebuilt when n changes. could be cleaned up into a single case, but I need time to work that out. functions for now.

@todo? buttons are shown based on !!backWasShown, but this means flippign to next card instantly removes them, so I won't get the little 100ms light-up effect 
*/
