import React, { useMemo, useState, useEffect, useReducer, useCallback } from 'react';
import { useRecoilValue, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { makeReviewList } from 'helpers/reviewHelpers';
import qs from 'query-string';
import { timePerCardState, passfailState, reviewSettingsState, termsToReviewState, termUpdateArrayState, reviewStageState } from 'recoil/atoms/reviewAtoms';
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

    function makeReviewCard(term: Term) {
        return (
            <ReviewCard
                setBackWasShown={setBackWasShown}
                key={`review-card-${new Date()}`}
                direction={reviewSettings.direction}
                term={term}
            />
        )
    }

    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const [futureTerms, reduceFutureTerms] = useReducer(termReducer, () => initializeFutureTerms());
    const setTimePerCard = useSetRecoilState(timePerCardState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const newReviewSession = useReviewSession();
    const [termUpdateArray, setTermUpdateArray] = useRecoilState(termUpdateArrayState);
    const { mutate: mutateCreateReviewSession, data: mutateResponse } = useCreateReviewSessionMutation();
    const { data: lists, refetch: refetchLists } = useQueryListsById([params.id]);
    const isFullListReview = qs.parse(location.search).kind === 'full' && location.pathname.includes('list')

    const makeNewSaturationLevelsCallback = useCallback(() => {
        return makeNewSaturationLevels(termsToReview, termUpdateArray, reviewSettings)
    }, [termsToReview, termUpdateArray, reviewSettings])

    useEffect(() => {
        console.log(termUpdateArray);
    }, [termUpdateArray])

    useEffect(() => {
        if (location.pathname.includes('list')) {
            refetchLists();
        }

        return () => {
            resetTermsToReview();
        }
    }, []);

    useEffect(() => {
        if (reviewSettings.sessionEnd) {
            if (!mutateResponse) {
                mutateCreateReviewSession({ newReviewSession, termUpdateArray })
            } else {
                setReviewStage('after');
            }
        }
    }, [mutateResponse, reviewSettings.sessionEnd]);

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

    useEffect(() => {  // end review session once futureTerms.length reaches 0
        if (termsToReview.length > 0 && futureTerms?.length === 0) {
            reduceTermUpdateArray({ type: 'saturation', newSaturationLevels: makeNewSaturationLevelsCallback() })
            updateTermUpdateArrayDate();
            setReviewSettings(current => ({
                ...current,
                sessionEnd: new Date()
            }));
        }
    }, [futureTerms]);

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

    type TermUpdatePassfail = { // @todo: this should be a union of objects. one for saturation case, one for passfail case
        type: 'passfail',
        passfail: PassFail,
        currentTerm: Term
    };

    type TermUpdateSaturation = {
        type: 'saturation',
        newSaturationLevels: ReturnType<typeof makeNewSaturationLevels>
    };

    /** 'reducer' to update value of termUpdateArray
     *  note that this doesn't actually function as a reducer, since termUpdateArray is recoil atom state, and not React useState
     *  @todo: look into the possibility of implementing this as a selector
     */
    function reduceTermUpdateArray(action: TermUpdatePassfail | TermUpdateSaturation) { // @note: an actual reducer would have 'state' as first parameter here.
        switch (action.type) {
            case 'passfail':
                const { passfail, currentTerm } = action;
                setTermUpdateArray(state => state.map((term) => {
                    if (term._id === currentTerm._id) {
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
                break;

            case 'saturation':
                const { newSaturationLevels } = action;
                setTermUpdateArray(state => state.map((termToUpdate, index) => {
                    return {
                        ...termToUpdate,
                        saturation: newSaturationLevels[index].termId === termToUpdate._id
                            ? newSaturationLevels[index].saturation
                            : termToUpdate.saturation
                    }
                }))
                break;
        }
    }

    const { completedCount, progress } = useMemo(() => {
        let completedCount: number = 0;
        let progress: number = 0;

        if (futureTerms) {
            const sessionLength = numTermsToReview * reviewSettings.n;
            const termsCompleted = sessionLength - futureTerms.length;

            progress = Math.floor(100 * termsCompleted / sessionLength);
            completedCount = sessionLength - futureTerms.length;
        }

        return { completedCount, progress }
    }, [futureTerms, numTermsToReview, reviewSettings.n]);

    /** Handle clicking the pass or fail button */
    const handlePassFailClick = useCallback((e, passfail: PassFail) => {
        reduceTermUpdateArray({ type: 'passfail', currentTerm: futureTerms[0].term, passfail });
        setPassfail(cur => [...cur, passfail]);
        setTimePerCard(cur => [...cur, new Date()])
        reduceFutureTerms({ type: passfail });
        setBackWasShown(false);
    }, [futureTerms, setPassfail, setTimePerCard, backWasShown])

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
    };

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