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
        d3.csv(csv).then(d => {
            setData({
                ...data,
                length: d.length,
                columns: d.columns,
                terms: [...data.terms, ...d]
            })
        })
    //eslint-disable-next-line
    }, [])

    // reducer
    const [currentTerm, currentTermDispatch] = useReducer(currentTermReducer, { cur: 0 })
    function currentTermReducer(currentTerm, action) {
        switch (action.type) {
            case 'increment':
                return { cur: currentTerm.cur + 1 }
            case 'decrement':
                if (currentTerm.cur !== 0) {
                    return { cur: currentTerm.cur - 1 }
                }
                else {
                    return currentTerm
                }
            default:
                return currentTerm;
        }
    }

    useEffect(() => {
        console.log(currentTerm);
        return () => {

        }
    }, [currentTerm])


    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup)
    }, [])

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
            { data.length > 0 && <ReviewTerm term={data.terms[currentTerm.cur]} />}
        </div>
    )
}

export default Review

/*
List review component.

*/