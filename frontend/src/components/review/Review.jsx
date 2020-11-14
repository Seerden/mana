import React, { memo, useEffect, useState, useRef, useReducer } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { useRouteProps } from 'hooks/routerHooks';
import { useLogState } from "hooks/state";
import { useRequest } from 'hooks/useRequest';
import { makeReviewList } from 'helpers/reviewHelpers';
import { handleGetList, getList, handlePutList, putList, putTerm, putTerms } from 'helpers/apiHandlers/listHandlers';
import { saturate } from 'helpers/srs/saturation';


import { reviewSettingsState, termsToReviewState, newHistoryEntriesState } from 'recoil/atoms/reviewAtoms';

import ReviewCard from './ReviewCard';
import PreReview from './PreReview';
import PostReview from './PostReview';
import ReviewInfo from './ReviewInfo';

import './style/Review.scss';

const Review = memo((props) => {
    const { params } = useRouteProps(),
        [list, setList] = useState(null),
        [futureTerms, reduceFutureTerms] = useReducer(termReducer, null),
        [currentCard, setCurrentCard] = useState(null),
        [progress, setProgress] = useState(0),  // percentage of terms marked 'pass' in the session
        { n, direction, started, sessionStart } = useRecoilValue(reviewSettingsState),
        [backWasShown, setBackWasShown] = useState(null),
        failRef = useRef(null),  // refs for handleLeftRightArrowKeydown to target
        passRef = useRef(null);
    let timeout = useRef(null);

    const { response: getListResponse, setRequest: setGetRequest } = useRequest({
        handleResponse: (res, setResponse) => {
            res = res.data

            if (res.terms && res.terms.length > 0) {
                setResponse(res);
                setList(res)
                reduceFutureTerms({
                    type: 'init',
                    payload: makeReviewList(res.terms, n)
                })
            }
        },
        handleError: handleGetList().handleError
    })
    const { setRequest: setPutRequest } = useRequest({ ...handlePutList() });
    const { setRequest: setPutTermRequest } = useRequest({});


    // ----- REFACTOR
    const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
    const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
    const [newHistoryEntries, setNewHistoryEntries] = useRecoilState(newHistoryEntriesState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const resetNewHistoryEntries = useResetRecoilState(newHistoryEntriesState);

    useLogState('newHistoryEntries', newHistoryEntries)

    useEffect(() => {
        list && setTermsToReview(list.terms)
    }, [list, termsToReview])

    useEffect(() => {
        if (reviewSettings.sessionEnd) {
            setPutRequest(() => putList(params.username, { _id: params.id, owner: list.owner }, list));
            setPutTermRequest(() => putTerms(params.username, {termsToUpdate: newHistoryEntries}));
        }
    }, [reviewSettings])

    useEffect(() => {  // get list from database and initialize futureTerms
        setGetRequest(() => getList(params.username, { _id: params.id }))

        return () => {
            resetTermsToReview();
            resetNewHistoryEntries();
        }
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
                payload: makeReviewList(list.terms, Number(n))
            })
        }
    }, [n]) // including list in deps causes session to be malformed somehow (progress doesn't change when moving to a new term)

    useEffect(() => {  // create new card to show, remove old and add new up/down key handler
        if (list && futureTerms) {
            let sessionLength = list.terms.length * n;
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
     * Find current term in newHistoryEntries and push 'pass' or 'fail' to it
     * @param {object} term     should always be futureTerms[0]
     * @param {string} passfail 'pass'/'fail'
     */
    function updateTermHistory(term, passfail) {
        setNewHistoryEntries(current => {
            return current.map(t => {
                if (t.termId === term._id) {
                    return {...t, newHistoryEntry: {...t.newHistoryEntry, content: [...(t.newHistoryEntry.content?.length > 0 ? t.newHistoryEntry.content : []), passfail]}}
                }
                return t
            })
        })
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
        setReviewSettings(current => ({...current, sessionEnd: end}))
        
        list.sessions.push({
            start: reviewSettings.sessionEnd,
            end: end,
            numTerms: list.terms.length,
            termsReviewed: Number(n) * list.terms.length,
            n: Number(n),
            direction
        });

        list.lastReviewed = end;

        list.terms = list.terms.map(term => {
            const newTerm = { ...term };
            newTerm.saturation = { ...newTerm.saturation, [direction]: saturate(newTerm, direction) };
            return newTerm
        });
       
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
                    { !reviewSettings.sessionEnd && currentCard &&
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

                            { reviewSettings.sessionStart &&
                                <ReviewInfo
                                    start={reviewSettings.sessionStart}
                                    numTerms={list.terms.length}
                                    n={n}
                                    progress={progress}
                                />
                            }

                        </>
                    }

                    { reviewSettings.sessionEnd &&
                        <>
                            <PostReview
                                sessionStart={reviewSettings.sessionStart}
                                sessionEnd={reviewSettings.sessionEnd}
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
