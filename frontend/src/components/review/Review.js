import React, { memo, useEffect, useState, useRef, useReducer } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from '../../hooks/routerHooks';
import { useLogState } from '../../hooks/state';
import { getListFromDB, updateList } from '../../helpers/db.api';
import { buildTermList } from '../../helpers/review.helpers';
import ReviewCard from './ReviewCard';
import './css/Review.css';
import dayjs from 'dayjs';

const Review = memo((props) => {
    const n = 2; // number of times each term should be reviewed. @todo expand on this functionality
    const { params } = useRouteProps();
    const [sessionStart, setSessionStart] = useState(() => new Date())
    const [sessionEnd, setSessionEnd] = useState(false);
    const [list, setList] = useState(null);
    const [passCount, setPassCount] = useState(0);
    const [futureTerms, reduceFutureTerms] = useReducer(termReducer, []);
    const [currentCard, setCurrentCard] = useState(null);
    const [progress, setProgress] = useState(0);  // percentage of terms marked 'pass' in the session

    const failRef = useRef(null);
    const passRef = useRef(null);

    useEffect(() => {  // get list from database and initialize futureTerms
        getListFromDB({ _id: params.id }).then(res => {
            setList(res);
            let toReview = (buildTermList(res.content, n))
            reduceFutureTerms({ type: 'init', payload: toReview })
        })
    }, [])

    useEffect(() => {  // remove, recreate keydown listener, create <ReviewCard />
        if (futureTerms.length > 0) {
            setCurrentCard(<ReviewCard key={`card-${futureTerms[0].from}`} term={futureTerms[0]} />)
        }

        if (list && futureTerms) {
            let sessionLength = list.content.length * n;
            let termsCompleted = sessionLength - futureTerms.length;
            setProgress(Math.floor(100 * termsCompleted / sessionLength));
        }
        
        window.addEventListener('keydown', handleKeydown)
        return () => window.removeEventListener('keydown', handleKeydown)
    }, [futureTerms])

    /**
     * ArrowLeft/ArrowRight keydown event to simulate pressing the Pass/Fail buttons
     * @param {*} e event object
     */
    const handleKeydown = e => {
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
            setTimeout(() => {  // highlight button for UX
                if (ref.current) {
                    ref.current.blur()
                }
            }, 100)
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
                // setPassCount(passCount+1)
                // remove term from deck
                return terms.slice(1,);
            case 'fail':
                /*  @todo:    insert term somewhere in 'current cycle' of review session 
                                i.e. if not all terms have been passed at least once, I don't want to place the term among the second 'cycle'
                    @current:   re-insert the term at a random index */
                let newIndex = Math.floor((terms.length + 1) * Math.random());

                let newTerms = [...terms];
                let currentTerm = newTerms.shift();
                newTerms.splice(newIndex, 0, currentTerm);
                return newTerms
            default:
                return terms
        }
    }

    function updateSessionHistory(term, passfail) {
        const content = list.content;
        let idx = content.findIndex(i => i.to === term.to && i.from === term.from)
        if (!content[idx].history || content[idx].history.length === 0) {
            content[idx].history = [{ date: Date.now(), content: [] }]
        }
        if (content[idx].history.length > 0) {
            let histLen = content[idx].history.length
            let lastHist = content[idx].history[histLen - 1];

            if (dayjs(lastHist.date) < dayjs(sessionStart)) {
                content[idx].history.push({ date: sessionStart, content: [passfail] })
            } else {
                content[idx].history[histLen - 1].content.push(passfail)
            }
        }
        let newList = { ...list, content: [...content] };
        setList(newList);
        return newList
    }

    function handleClick(e, passfail) {
        let updatedList = updateSessionHistory(futureTerms[0], passfail);  // updateSessionHistory returns the newly updated state
        reduceFutureTerms({ type: passfail })

        if (passfail === 'pass') { setPassCount(passCount + 1) }
        if (passCount === (n * list.content.length - 1) && passfail === 'pass') {  // end session
            let end = new Date()
            setSessionEnd(end)
            updatedList.sessions.push({ start: sessionStart, end: end, numTerms: n * updatedList.content.length })
            updateList({ _id: params.id, owner: list.owner }, updatedList)
        }
    }

    return (
        <div className="Review">
            { list &&
                <div className="Review__title">
                    Reviewing
                    <span className="Review__title--name">{list.name}</span>
                    by
                    <span className="Review__title--owner">{list.owner}</span>
                </div>
            }

            { !sessionEnd && currentCard &&
                <>
                    {currentCard}

                    <div className="Review__buttons">
                        <input ref={failRef} onClick={(e) => handleClick(e, 'fail')} className="Review-button fail" type="button" value="Fail" />
                        <input ref={passRef} onClick={(e) => handleClick(e, 'pass')} className="Review-button pass" type="button" value="Pass" />
                    </div>

                    <div className="Review-progress__wrapper">
                        <div id="Review-progress__bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </>
            }

            { sessionEnd &&
                <div className="Review__post">
                    <h2>Session completed.</h2>
                    <div>Started on {sessionStart.toISOString()}</div>
                    <div>Completed on {sessionEnd.toISOString()}</div>
                    <Link className="Link-button" to={`/u/${list.owner}/list/${params.id}`}>Back to list</Link>
                    <Link className="Link-button"to={`/u/${list.owner}/lists`}>My lists</Link>
                </div>
            }

            { !list && <div className="Loading">Loading list...</div>}
        </div>
    )
})

export default Review;

/*
@todo?  set progress bar color based in session cycle. go to 100% n time with various colors, instead of slowly progress a single bar
        makes it feel like progress is faster

@todo   add sessions property to List itself, include sessionStart and sessionEnd on session start, end
*/

