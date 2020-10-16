/* eslint react-hooks/exhaustive-deps: 0 */

import React, { memo, useEffect, useState, useReducer } from "react";
import { useRouteProps } from '../hooks/routerHooks';
import { useLogState } from '../hooks/state';
import { getListFromDB, updateList } from '../helpers/db.api';
import { buildTermList } from '../helpers/review.helpers';
import './css/Review.css'

const Review = memo((props) => {
    const n = 2; // number of times each term should be reviewed. @todo expand on this functionality
    const { params } = useRouteProps();
    /**
     * @todo refactor sessionStart, sessionEnd into single session state
     */
    const [sessionStart, setSessionStart] = useState(() => new Date())
    const [sessionEnd, setSessionEnd] = useState(false);
    const [list, setList] = useState(null);
    const [passCount, setPassCount] = useState(0);

    const [futureTerms, reduceFutureTerms] = useReducer(termReducer, []);
    const [progress, setProgress] = useState(0);  // percentage of terms marked 'pass' in the session

    function termReducer(terms, action) {
        /* handle what happens to current term after pass/fail is chosen */
        switch (action.type) {
            case 'init':
                return action.payload
            case 'pass': 
                setPassCount(count => count + 1)
                // remove term from deck
                return terms.slice(1,);
            case 'fail':
                /*  @todo:    insert term somewhere in 'current cycle' of review session 
                                i.e. if not all terms have been passed at least once, I don't want to place the term among the second 'cycle'
                    @current:   re-insert the term at a random index */
                let newIndex = Math.floor((terms.length + 1) * Math.random());

                let newTerms = [...terms]
                let currentTerm = newTerms.shift();
                newTerms.splice(newIndex, 0, currentTerm);
                return newTerms
            default:
                return terms
        }
    }

    function updateSessionHistory(term, passfail){
        const content = list.content;
        let idx = content.findIndex(i => i.to === term.to && i.from === term.from)
        if (!content[idx].history || content[idx].history.length === 0 ) {
            content[idx].history = [{date: Date.now(), content: []}]
        }
        if (content[idx].history.length > 0) {
            let histLen = (content[idx].history).length
            let lastHist = content[idx].history[histLen-1];
            if (lastHist.date < sessionStart) {
                content[idx].history.push({date: sessionStart, content: [passfail]})
            } else {
                content[idx].history[histLen-1].content.push(passfail)
            }
        }
        let newList = {...list, content: [...content]};
        setList(newList);
        return newList
    }    

    useEffect(() => {
        getListFromDB({ _id: params.id }).then(res => {
            /* the three lines below just serve to filter the terms' _id properties
            could possibly be a single destructing expression, but it works fine as is */
            let _list = res;
            setList(_list);

            let toReview = (buildTermList(_list.content, n))
            reduceFutureTerms({ type: 'init', payload: toReview })
        })

    }, [])

    useEffect(() => {
        if (list && futureTerms) {
            let sessionLength = list.content.length * n;
            let termsCompleted = sessionLength - futureTerms.length;
            setProgress(Math.floor(100 * termsCompleted / sessionLength));
        }
    }, [futureTerms])

    function handleClick(e, passfail) {
        e.preventDefault();
        let updatedList = updateSessionHistory(futureTerms[0], passfail);  // updateSessionHistory returns the newly updated state
        reduceFutureTerms({type: passfail})

        if (passCount === n*list.content.length-1) {
            /*  handle session completion:
                - push list with updated term histories and updated session history to db
                - show post-session stats
                    - include redirect button (back to lists or list/:id)
             */
            let end = new Date()
            setSessionEnd(end)
            console.log('Session completed...');

            updatedList.sessions.push({start: sessionStart, end: end, numTerms: n*updatedList.content.length})
            updateList({_id: params.id, owner: list.owner}, updatedList)  
            /**  although updateSessionHistory is called here, which updates 'list' (which is a piece of state), this 'list' in updateList still gets the new state value.. 
            *    I thought, since these occur in the same render cycle, that 'list' here would only have access to the list state from before updateSessionHistory() was called
            *    @todo investigate. meanwhile, use updatedList since that's certain to be the correct value
            */
                .then(res => console.log(res))
                .catch(err => console.log(err))

        }
    }

    return (
        <div className="Review">
            { list &&
                <div className="Review-head">
                    Reviewing
                        <span className="Review-name">{list.name}</span>
                    by
                        <span className="Review-owner">{list.owner}</span>
                </div>
            }

            { !sessionEnd && futureTerms.length > 0 &&
                <>
                    <div className="Review-current">
                        {futureTerms[0].to} | {futureTerms[0].from}
                    </div>

                    <div className="Review-buttons">
                        <input onClick={(e) => handleClick(e, 'fail')} className="Review-button fail" type="button" value="Fail" />
                        <input onClick={(e) => handleClick(e, 'pass')} className="Review-button pass" type="button" value="Pass" />
                    </div>

                    <div className="Review-progress__wrapper">
                        <div id="Review-progress__bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </>
            }

            { sessionEnd && 
                <div className="Review-end">
                    Session completed.
                    <div>Started on {sessionStart.toISOString()}</div>
                    <div className="">Completed on {sessionEnd.toISOString()}</div>
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

