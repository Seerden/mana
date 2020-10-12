/* eslint react-hooks/exhaustive-deps: 0 */

import React, { memo, useEffect, useState, useReducer } from "react";
import ReviewTerm from './ReviewTerm';
import './css/Review.css'
import { getListFromDB } from '../helpers/db.api';
import { useRouteProps } from '../hooks/routerHooks';
import { useLogState } from '../hooks/state';
import { buildTermList } from '../helpers/review.helpers';

function termReducer(terms, action) {
    switch (action.type) {
        case 'init':
            return action.payload
        case 'pass': // remove term from deck
            return terms.slice(1,);
        case 'fail':
            // take term, shuffle it back into the deck (at random? can't be asked again right away, or maybe that's fine)
            /*  @future: want to insert in the 'current cycle' of the review session i.e. if not all terms have been passed at least once, I don't want to place the term among the second 'cycle'. requires tracking how many terms have been passed
                @current: just put the item at a random index */
            let newTerms = [...terms]
            let currentTerm = newTerms.shift();
            let newIndex = Math.floor((terms.length + 1) * Math.random());
            newTerms.splice(newIndex, 0, currentTerm);
            return newTerms
    }
}

const Review = memo((props) => {
    const { match } = useRouteProps();
    const [list, setList] = useState(null);
    const [futureTerms, reduceFutureTerms] = useReducer(termReducer, []);
    const n = 2; // number of times each term should be reviewed. @TODO expand on this functionality

    const [progress, setProgress] = useState(0);
    useLogState('progress', progress)

    useEffect(() => {
        getListFromDB({ _id: match.params.id }).then(res => {
            /* the three lines below just serve to filter the terms' _id properties
            should definitely be a single destructing expression to do this, but I'm not sure */
            let { owner, name, from, to, content } = res.data;
            content = content.map(i => ({ from: i.from, to: i.to }));
            let _list = { owner, name, from, to, content };
            setList(_list);
        })
    }, [])

    useEffect(() => {
        if (list) {
            let toReview = (buildTermList(list.content, n))
            reduceFutureTerms({ type: 'init', payload: toReview })
        }
    }, [list])

    useEffect(() => {
        if (list && futureTerms) { 
            // 100
            // 10
            // 10/100
            let sessionLength = list.content.length * 2;
            let termsCompleted = sessionLength-futureTerms.length;
            setProgress(Math.floor(100*termsCompleted/sessionLength));
        }
    }, [futureTerms])

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

            { futureTerms.length > 0 &&
                <>
                    <div className="Review-current">
                        {futureTerms[0].to} | {futureTerms[0].from}
                    </div>

                    <div className="Review-buttons">
                        <input onClick={() => reduceFutureTerms({ type: 'fail' })} className="Review-button fail" type="button" value="Fail" />
                        <input onClick={() => reduceFutureTerms({ type: 'pass' })} className="Review-button pass" type="button" value="Pass" />
                    </div>

                    <div className="Review-progress__wrapper">
                        <div id="Review-progress__bar" style={{width: `${progress}%`}}></div>
                    </div>
                </>
            }

            { !list && <div className="Loading">Loading list...</div>}
        </div>
    )
})

export default Review;