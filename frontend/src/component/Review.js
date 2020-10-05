/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState, useReducer } from "react";
import * as d3 from 'd3';
import csv from './testcsv.csv'

import ReviewTerm from './ReviewTerm';

const Review = (props) => {
    const [data, setData] = useState({
        length: 0,
        columns: null,
        terms: []
    });
    // const [currentTerm, setCurrentTerm] = useState(0);  // @TODO: turn this into reducer 'algo'

    useEffect(() => {
        // @TODO: replace this csv import with db call, change all occurrences of data.length and .terms in 
        // Review and ReviewTerm components
        d3.csv(csv).then(d => {
            setData({
                ...data,
                length: d.length,
                columns: d.columns,
                terms: [...data.terms, ...d]
            })
        })

        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup)
        
    }, [])

    // reducer
    const [currentTerm, currentTermDispatch] = useReducer(currentTermReducer, 0)
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

    function handleKeyup(e) {
        e.preventDefault();
        switch (e.code) {
            case 'ArrowLeft':
                currentTermDispatch({ type: 'decrement' });
                break;
            case 'ArrowRight':
                currentTermDispatch({ type: 'increment' });
                break;
            default:
                break;
        }
    }

    return (
        <div className="Review">
            { data.length > 0 && <ReviewTerm term={data.terms[currentTerm]} />}
        </div>
    )
}

export default Review

/*
List review component.

*/