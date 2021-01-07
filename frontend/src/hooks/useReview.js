import React, { useMemo, useState, useEffect, useReducer } from 'react';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { makeReviewList } from 'helpers/reviewHelpers';
import { reviewSettingsState, termsToReviewState, newHistoryEntriesState } from 'recoil/atoms/reviewAtoms';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';

import ReviewCard from 'components/review/ReviewCard';

export function useReview() {
    const [backWasShown, setBackWasShown] = useState(false);

    const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
    const termsToReview = useRecoilValue(termsToReviewState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const [newHistoryEntries, setNewHistoryEntries] = useRecoilState(newHistoryEntriesState);
    const resetNewHistoryEntries = useResetRecoilState(newHistoryEntriesState);

    const [futureTerms, reduceFutureTerms] = useReducer(termReducer, initializeFutureTerms());

    /**
    * case init:       Initialize futureTerms with termsToReview
    * case pass/fail:  Handle what happens to current term after pass/fail is chosen.
    * @param {Array} terms     array of terms
    * @param {Object} action   properties: type (init, pass, fail). if type 'init', send terms as action.payload
    */
    function termReducer(terms, { type }) {
        switch (type) {
            case 'pass':
                return terms.slice(1,);
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

    function initializeFutureTerms() {
        let termList = makeReviewList(termsToReview, +reviewSettings.n)
        return termList.map(term => (
            {
                term: term,
                card: <ReviewCard
                    setBackWasShown={setBackWasShown}
                    key={uuidv4()}
                    direction={reviewSettings.direction}
                    term={term} />
            }
        ))
    }

    const progress = useMemo(() => {
        if (futureTerms) {
            let sessionLength = numTermsToReview * reviewSettings.n;
            let termsCompleted = sessionLength - futureTerms.length;
            return Math.floor(100 * termsCompleted / sessionLength);
        }
    }, [futureTerms]);

    /**
     * Handle clicking the pass or fail button
     * @param {*} e javascript event
     * @param {string} passfail 'pass'/'fail'
     */
    function handlePassFailClick(e, passfail) {
        updateTermHistory(futureTerms[0].term, passfail);
        reduceFutureTerms({ type: passfail });
        setBackWasShown(false);
    }

    /**
     * ArrowLeft/ArrowRight keydown event to simulate pressing the Pass/Fail buttons
     * @param {*} e event object
     */
    function handleLeftRightArrowKeyDown(e) {
        let passfail;
        switch (e.code) {
            case 'ArrowLeft':
                passfail = 'fail';
                break;
            case 'ArrowRight':
                passfail = 'pass';
                break;
            default:
                return;
        }

        if (backWasShown) {
            handlePassFailClick(null, passfail);
        }
    }

    /**
     * Push 'pass'/'fail' to term's newHistoryEntry
     * @param {object} term     should always be futureTerms[0]
     * @param {string} passfail 'pass'/'fail'
     */
    function updateTermHistory(term, passfail) {
        setNewHistoryEntries(currentState => {
            return currentState.map(t => {
                if (t.termId === term._id) {
                    return {
                        ...t,
                        newHistoryEntry: {
                            ...t.newHistoryEntry,
                            content: [
                                ...(t.newHistoryEntry.content?.length > 0 ? t.newHistoryEntry.content : []),
                                passfail
                            ]
                        }
                    }
                }
                return t
            })
        })

    }

    useEffect(() => {  // whenever backWasShown changes, remake LeftArrow/RightArrow keydown handler
        window.addEventListener('keydown', handleLeftRightArrowKeyDown)

        return () => {
            window.removeEventListener('keydown', handleLeftRightArrowKeyDown)
        }
    }, [backWasShown])

    useEffect(() => {  // end review session once futureTerms.length reaches 0
        if (futureTerms?.length === 0) {
            setReviewSettings(current => ({ ...current, sessionEnd: new Date() }));
        }
    }, [futureTerms])

    

    return [
        backWasShown,
        setBackWasShown,
        futureTerms,
        reduceFutureTerms,
        progress,
        handlePassFailClick,
        newHistoryEntries,
        resetNewHistoryEntries,
    ]

}