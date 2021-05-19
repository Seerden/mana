import React, { useMemo, useState, useEffect, useReducer, useCallback } from 'react';
import { useRecoilValue, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { makeReviewList } from 'helpers/reviewHelpers';
import { 
    timePerCardState, 
    passfailState, 
    reviewSettingsState, 
    termsToReviewState, 
    newHistoryEntriesState, 
    reviewStageState
} from 'recoil/atoms/reviewAtoms';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';
import ReviewCard from 'components/review/ReviewCard';
import { useRouteProps } from './routerHooks';
import useReviewSession from './useReviewSession';
import { makeNewSaturationLevels } from 'helpers/srs/saturation';

type PassFail = 'pass' | 'fail';

export function useReview() {
    const { params } = useRouteProps();
    const [backWasShown, setBackWasShown] = useState(false);
    const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
    const setPassfail = useSetRecoilState(passfailState);
    const termsToReview = useRecoilValue(termsToReviewState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const [newHistoryEntries, setNewHistoryEntries] = useRecoilState(newHistoryEntriesState);
    const resetNewHistoryEntries = useResetRecoilState(newHistoryEntriesState);
    const [futureTerms, reduceFutureTerms] = useReducer(termReducer, initializeFutureTerms());
    const setReviewStage = useSetRecoilState(reviewStageState);
    const setTimePerCard = useSetRecoilState(timePerCardState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    // const { response: putTermResponse, setRequest: setPutTermRequest } = useRequest({});  // update terms with their new history entries
    // const { response: putTermSaturationResponse, setRequest: setPutTermSaturationRequest } = useRequest({});  // update terms with their new saturation
    // const { response: sessionPostResponse, setRequest: setPostSessionRequest } = useRequest({});
    const newReviewSession = useReviewSession();

    const makeNewSaturationLevelsCallback = useCallback(() => {
        return makeNewSaturationLevels(termsToReview, newHistoryEntries, reviewSettings)
    }, [termsToReview, newHistoryEntries, reviewSettings]);

    useEffect(() => {  // send PUT and POST requests (needs to not be in the useEffect above, since then history lags one update behind)
        if (reviewSettings.sessionEnd) {
            if (newHistoryEntries.length > 0) {
                // setPutTermRequest(() => putTerms(params.username, { type: 'history' }, { termsToUpdate: newHistoryEntries }));
                // setPutTermSaturationRequest(() => putTerms(params.username, { type: 'saturation' }, { termsToUpdate: makeNewSaturationLevelsCallback() }));
                // setPostSessionRequest(() => postSession(params.username, { newReviewSession }))
            } else {
                throw Error('No new term histories present on review completion.')
            }
        }
    }, [reviewSettings.sessionEnd]);

    // useEffect(() => {  // set reviewStage to PostReview once all post-session API requests are handled
    //     if (putTermResponse && putTermSaturationResponse && sessionPostResponse) {
    //         setReviewStage('after');
    //     }
    // }, [putTermResponse, putTermSaturationResponse, sessionPostResponse])

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

    const completedCount = useMemo(() => {
        return numTermsToReview * reviewSettings.n - futureTerms.length;
    }, [futureTerms, numTermsToReview, reviewSettings.n])

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
            setReviewSettings(current => ({ 
                ...current, 
                sessionEnd: new Date() 
            }));
        }
    }, [futureTerms])
    
    return {
        backWasShown,
        setBackWasShown,
        futureTerms,
        reduceFutureTerms,
        progress,
        completedCount,
        handlePassFailClick,
        newHistoryEntries,
        resetNewHistoryEntries,
    } as const;

}