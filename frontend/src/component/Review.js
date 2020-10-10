/* eslint react-hooks/exhaustive-deps: 0 */

import React, { memo, useEffect, useState, useReducer } from "react";
import ReviewTerm from './ReviewTerm';
import './css/Review.css'
import { getListFromDB } from '../helpers/db.api';
import { useRouteProps } from '../hooks/routerHooks';
import { useLogState } from '../hooks/state';
import { buildTermList } from '../helpers/review/review.helpers';

const Review = memo((props) => {
    // function currentTermReducer(currentTerm, action) {
    //     switch (action.type) {
    //         case 'increment':
    //             return currentTerm + 1
    //         case 'decrement':
    //             if (currentTerm !== 0) {
    //                 return currentTerm - 1
    //             }
    //             else {
    //                 return currentTerm
    //             }
    //         default:
    //             return currentTerm;
    //     }
    // }

    const { match } = useRouteProps();
    const [list, setList] = useState(null);
    const [termsToReview, setTermsToReview] = useState(null);
    const [cur, setCur] = useState(0);
    const n = 2; // number of times each term should be reviewed. @TODO expand on this functionality
    useLogState('list', list)

    useEffect(() => {
        getListFromDB({ id: match.params.id }).then(res => {
            // the three lines below just serve to filter the terms' _id properties
            // should definitely be a single destructing expression to do this, but I'm not sure
            let {owner, name, from, to, content} = res.data;
            content = content.map(i => ({from: i.from, to: i.to}))
            let _list = {owner, name, from, to, content}
            setList(_list)
        })
    }, [])

    useEffect(() => {
        /* 
            modify this to only setTerms when there's not a currently ongoing session in localStorage
            if there is a local storage, prompt user to continue or start anew    
        */
        list && setTermsToReview((buildTermList(list.content, n)));
    }, [list])
    return (
        <>
        { list && 
            <div className="List">
                <h1>
                    Reviewing <span className="Review-name">{list.name}</span> by <span className="Review-owner">{list.owner}</span>
                </h1>
            </div>
        }

        { termsToReview && 
            <div className="Review-current">
                {termsToReview[cur].to} | {termsToReview[cur].from}
            </div>
        }

        { !list && 
            <div className="Loading">
                Loading list...
            </div>        
        }
        </>
    )
})

export default Review;

/*
// grab list from db
1. build array of review terms (every term occurs n times, n could be specified eventually)
2. make buttons to pass/fail and corresponding handlers

*/