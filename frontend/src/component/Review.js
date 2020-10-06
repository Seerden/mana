/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState, useReducer } from "react";
import * as d3 from 'd3';
import csv from './testcsv.csv'
import axios from 'axios';

import ReviewTerm from './ReviewTerm';

const Review = (props) => {
    const [lists, setLists] = useState(null);
    const [data, setData] = useState({
        length: 0,
        columns: null,
        terms: []
    });
    const [currentTerm, currentTermDispatch] = useReducer(currentTermReducer, 0)

    useEffect(() => {
        // @TODO: replace this csv import with db call, change all occurrences of data.length and .terms in Review and ReviewTerm components
        d3.csv(csv).then(d => {
            setData({
                ...data,
                length: d.length,
                columns: d.columns,
                terms: [...data.terms, ...d]
            })
        })

        axios.get('/db/listsbyuser/seerden').then(r => {
            setLists(r.data);
        })

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
            { data.length > 0 && <ReviewTerm dispatch={currentTermDispatch} term={data.terms[currentTerm]} />}
        </div>
    )
}

export default Review

/*
List review component.

*/