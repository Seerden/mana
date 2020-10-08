/* eslint react-hooks/exhaustive-deps: 0 */

import React, { memo, useEffect, useState, useReducer } from "react";
import ReviewTerm from './ReviewTerm';

const Review = memo(({ location }) => {
    const list = location ? location.state.list : null;  // this is passed on by the <Link> in List.js @TODO: add robustness to this

    const [data, setData] = useState({
        length: 0,
        columns: null,
        terms: []
    });
    const [currentTerm, currentTermDispatch] = useReducer(currentTermReducer, 0)

    useEffect(() => {
        if(list) {
            console.log(list);
            setData({
                length: list.content.length, 
                terms: list.content,
            })
        }
    }, [])

    function currentTermReducer(currentTerm, action) {
        switch (action.type) {
            case 'increment':
                return currentTerm + 1
            case 'decrement':
                if (currentTerm !== 0) {
                    return currentTerm - 1
                }
                else {
                    return currentTerm
                }
            default:
                return currentTerm;
        }
    }

    return (
        <div className="Review">
            { data.length > 0 && 
                <ReviewTerm dispatch={currentTermDispatch} term={data.terms[currentTerm]} />
            }
        </div>
    )
})

export default Review;