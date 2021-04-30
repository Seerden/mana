import React, { useMemo, useState, useEffect, useReducer, useCallback } from 'react';
import { useRecoilValue, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { makeReviewList } from 'helpers/reviewHelpers';
import { 
    timePerCardState, 
    passfailState, 
    reviewSettingsState, 
    termsToReviewState, 
    newHistoryEntriesState 
} from 'recoil/atoms/reviewAtoms';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';
import ReviewCard from 'components/review/ReviewCard';

type PassFail = 'pass' | 'fail';

export function useReview() {
    const [backWasShown, setBackWasShown] = useState(false);
    const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
    const setPassfail = useSetRecoilState(passfailState);
    const termsToReview = useRecoilValue(termsToReviewState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const [newHistoryEntries, setNewHistoryEntries] = useRecoilState(newHistoryEntriesState);
    const resetNewHistoryEntries = useResetRecoilState(newHistoryEntriesState);
    const [futureTerms, reduceFutureTerms] = useReducer(termReducer, initializeFutureTerms());
    const setTimePerCard = useSetRecoilState(timePerCardState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);


    /**
    * case pass/fail:  Handle what happens to current term after pass/fail is chosen.
    */
    function termReducer(terms, { type }: { type: PassFail}) {
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
        let termList = makeReviewList(termsToReview, reviewSettings.n)
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
        } else {
            return 0
        }
    }, [futureTerms]);

    /**
     * Handle clicking the pass or fail button
     */
    function handlePassFailClick(e, passfail: PassFail) {
        updateTermHistory(futureTerms[0].term, passfail);
        setPassfail(cur => [...cur, passfail]);
        setTimePerCard(cur => [...cur, new Date()])
        reduceFutureTerms({ type: passfail });
        setBackWasShown(false);
    }

    /**
     * ArrowLeft/ArrowRight keydown event to simulate pressing the Pass/Fail buttons
     */
    function handleLeftRightArrowKeyDown(e: KeyboardEvent) {
        let passfail: PassFail;
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
     */
    function updateTermHistory(term, passfail: PassFail) {
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

    useEffect(() => {
        return () => {
            resetTermsToReview();
            resetNewHistoryEntries();
        }
    }, [])

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
    
    return {
        backWasShown,
        setBackWasShown,
        futureTerms,
        reduceFutureTerms,
        progress,
        handlePassFailClick,
        newHistoryEntries,
        resetNewHistoryEntries,
    } as const;

}