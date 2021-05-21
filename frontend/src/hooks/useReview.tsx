import React, { useMemo, useState, useEffect, useReducer, useCallback } from 'react';
import { useRecoilValue, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { makeReviewList } from 'helpers/reviewHelpers';
import qs from 'query-string';
import {
    timePerCardState,
    passfailState,
    reviewSettingsState,
    termsToReviewState,
    termUpdateArrayState,
    reviewStageState
} from 'recoil/atoms/reviewAtoms';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';
import ReviewCard from 'components/review/ReviewCard';
import { useRouteProps } from './routerHooks';
import useReviewSession from './useReviewSession';
import { makeNewSaturationLevels } from 'helpers/srs/saturation';
import { Term, TermUpdateObject } from 'graphql/codegen-output';
import { useCreateReviewSessionMutation } from 'graphql/queries/reviewSession.query';
import { useQueryListsById } from 'graphql/queries/list.query';

export function useReview() {
    const { params, location } = useRouteProps();
    const [backWasShown, setBackWasShown] = useState(false);
    const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
    const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
    const setReviewStage = useSetRecoilState(reviewStageState);
    const setPassfail = useSetRecoilState(passfailState);

    const initializeFutureTerms = useCallback(() => {
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
        ));
    }, [reviewSettings.n, termsToReview]);

    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const [futureTerms, reduceFutureTerms] = useReducer(termReducer, () => initializeFutureTerms());
    const setTimePerCard = useSetRecoilState(timePerCardState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const newReviewSession = useReviewSession();
    const [termUpdateArray, setTermUpdateArray] = useRecoilState(termUpdateArrayState);
    const { mutate: mutateCreateReviewSession, data: mutateResponse } = useCreateReviewSessionMutation();
    const { data: lists, refetch: refetchLists } = useQueryListsById([params.id]);
    const isFullListReview = useMemo(() => {
        return qs.parse(location.search).kind === 'full' && location.pathname.includes('list')
    }, [location])

    const newSaturationLevels = useMemo(() => {
        return makeNewSaturationLevels(termsToReview, termUpdateArray, reviewSettings)
    }, [termsToReview, termUpdateArray, reviewSettings])

    useEffect(() => {
        if (reviewSettings.sessionEnd) {
            if (!mutateResponse) {
                mutateCreateReviewSession({ newReviewSession, termUpdateArray })
            } else {
                setReviewStage('after');
            }
        }
    }, [mutateResponse, reviewSettings.sessionEnd]);

    /** case pass/fail:  Handle what happens to current term after pass/fail is chosen. */
    function termReducer(terms, { type }: { type: PassFail | 'init' }) {
        switch (type) {
            case 'init':
                return initializeFutureTerms();

            case 'pass':
                return terms.slice(1,);
            case 'fail':
                const newIndex = Math.floor((terms.length + 1) * Math.random());
                let newTerms = [...terms];
                let currentTerm = newTerms.shift();
                if (currentTerm) {
                    newTerms.splice(newIndex, 0, currentTerm);
                    return newTerms
                };
                return terms;
            default:
                return terms
        }
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


    const updateTermUpdateArray = useCallback((termToUpdate: Term, passfail: PassFail) => { 
        // @note: this could be a reducer
        setTermUpdateArray(cur => cur.map((term: TermUpdateObject) => {
            if (term._id === termToUpdate._id) {
                return {
                    ...term,
                    history: {
                        ...term.history,
                        content: [
                            ...term.history!.content,
                            passfail
                        ]
                    }
                } as TermUpdateObject  // if we don't alias the return, it'll think the date doesn't exist
            }
            return term
        }))
    }, [termUpdateArray, setTermUpdateArray]);

    const updateTermUpdateArraySaturation = useCallback(() => {  
        // @note: again, this could be a reducer. probably combined with the above updater
        setTermUpdateArray(current => {
            return current.map((termToUpdate, index) => {
                return {
                    ...termToUpdate,
                    saturation: newSaturationLevels[index].termId === termToUpdate._id 
                        ? newSaturationLevels[index].saturation 
                        : termToUpdate.saturation
                }
            })
        })
    }, [termUpdateArray, setTermUpdateArray])

    /** Handle clicking the pass or fail button */
    const handlePassFailClick = useCallback((e, passfail: PassFail) => {
        updateTermUpdateArray(futureTerms[0].term, passfail);
        setPassfail(cur => [...cur, passfail]);
        setTimePerCard(cur => [...cur, new Date()])
        reduceFutureTerms({ type: passfail });
        setBackWasShown(false);
    }, [futureTerms])

    /** ArrowLeft/ArrowRight keydown event to simulate pressing the Pass/Fail buttons */
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

    useEffect(() => {
        if (location.pathname.includes('list')) {
            refetchLists();
        }

        return () => {
            resetTermsToReview();
        }
    }, []);

    useEffect(() => {
        if (isFullListReview && lists) {
            setTermsToReview(lists[0].terms as Term[]);
        }
    }, [lists]);

    useEffect(() => {
        if (termsToReview) {
            reduceFutureTerms({ type: 'init' })
        }
    }, [termsToReview])

    useEffect(() => {  // whenever backWasShown changes, remake LeftArrow/RightArrow keydown handler
        window.addEventListener('keydown', handleLeftRightArrowKeyDown)

        return () => {
            window.removeEventListener('keydown', handleLeftRightArrowKeyDown)
        }
    }, [backWasShown])

    const updateTermUpdateArrayDate = useCallback(() => {
        setTermUpdateArray(cur => cur.map(entry => ({
                ...entry,
                history: {
                    ...entry.history,
                    date: new Date()
                }
            } as TermUpdateObject
            )))
    }, [termUpdateArray, setTermUpdateArray])

    useEffect(() => {  // end review session once futureTerms.length reaches 0
        if (termsToReview.length > 0 && futureTerms?.length === 0) {
            updateTermUpdateArraySaturation();
            updateTermUpdateArrayDate();
            setReviewSettings(current => ({
                ...current,
                sessionEnd: new Date()
            }));
        }
    }, [futureTerms]);

    return {
        backWasShown,
        setBackWasShown,
        futureTerms,
        reduceFutureTerms,
        progress,
        completedCount,
        handlePassFailClick,
    };

}