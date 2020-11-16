import React, { memo, useEffect, useState, useMemo, useReducer } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useRouteProps } from 'hooks/routerHooks';
import { useRequest } from 'hooks/useRequest';
import { useLogState } from "hooks/state";
import { makeReviewList } from 'helpers/reviewHelpers';
import { putTerms } from 'helpers/apiHandlers/listHandlers';
import { saturate } from 'helpers/srs/saturation';
import { reviewSettingsState, termsToReviewState, newHistoryEntriesState, reviewStageState } from 'recoil/atoms/reviewAtoms';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';
import ReviewCard from './ReviewCard';
import ReviewInfo from './ReviewInfo';
import './style/Review.scss';

const Review = memo((props) => {
    const { params } = useRouteProps();
    const setReviewStage = useSetRecoilState(reviewStageState);
    const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
    const termsToReview = useRecoilValue(termsToReviewState);
    const [backWasShown, setBackWasShown] = useState(false);
    const [futureTerms, reduceFutureTerms] = useReducer(termReducer, null);
    const { response: resB, setRequest: setPutTermRequest } = useRequest({});
    const { response: resC, setRequest: setPutTermSaturationRequest } = useRequest({});
    const progress = useMemo(() => {
        if (futureTerms) {
            let sessionLength = termsToReview.length * reviewSettings.n;
            let termsCompleted = sessionLength - futureTerms.length;
            return Math.floor(100 * termsCompleted / sessionLength);
        }
    }, [futureTerms]);
    const [newHistoryEntries, setNewHistoryEntries] = useRecoilState(newHistoryEntriesState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const resetNewHistoryEntries = useResetRecoilState(newHistoryEntriesState);

    useLogState('futureterms', futureTerms)

    useEffect(() => {   // this is temporary, until I've migrated these requests from here to ReviewPage
        resB && resC && setReviewStage('after');
    }, [resB, resC])

    useEffect(() => {  // end session
        if (reviewSettings.sessionEnd) {
            setPutTermRequest(() => putTerms(params.username, { type: 'history' }, { termsToUpdate: newHistoryEntries }));
            setPutTermSaturationRequest(() => putTerms(params.username, { type: 'saturation' }, { termsToUpdate: makeNewSaturationLevels() }));
        }
    }, [reviewSettings.sessionEnd])

    useEffect(() => {
        reduceFutureTerms({
            type: 'init',
            payload: makeReviewList(termsToReview, Number(reviewSettings.n))
        })

        return () => {
            resetTermsToReview();
            resetNewHistoryEntries();
        }
    }, [])

    useEffect(() => {  // create new card to show, remove old and add new up/down key handler
        futureTerms?.length === 0 && setReviewSettings(current => ({ ...current, sessionEnd: new Date() }));
    }, [futureTerms])

    useEffect(() => {
        window.addEventListener('keydown', handleLeftRightArrowKeyDown)

        return () => {
            window.removeEventListener('keydown', handleLeftRightArrowKeyDown)
        }
    }, [backWasShown])


    /**
  * case init:       Initialize futureTerms with termsToReview
  * case pass/fail:  Handle what happens to current term after pass/fail is chosen.
  * @param {Array} terms     array of terms
  * @param {Object} action   properties: type (init, pass, fail). if type 'init', send terms as action.payload
  */
    function termReducer(terms, action) {
        switch (action.type) {
            case 'init':
                return action.payload.map(term => (
                    {
                        term: term,
                        card: <ReviewCard
                            setBackWasShown={setBackWasShown}
                            key={uuidv4()}
                            direction={reviewSettings.direction}
                            term={term}
                        />
                    })
                )
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

    /**
     * Find current term in newHistoryEntries and push 'pass' or 'fail' to it
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

    /**
     * Handle clicking the pass or fail button
     * @param {*} e javascript event
     * @param {string} passfail 'pass'/'fail'
     */
    function handlePassFailClick(e, passfail) {
        updateTermHistory(futureTerms[0], passfail);
        reduceFutureTerms({ type: passfail })
        setBackWasShown(false);
    }

    /**
        * ArrowLeft/ArrowRight keydown event to simulate pressing the Pass/Fail buttons
        * @param {*} e event object
        */
    const handleLeftRightArrowKeyDown = (e) => {
        let passfail;
        switch (e.code) {
            case 'ArrowLeft':
                passfail = 'fail';
                break;
            case 'ArrowRight':
                passfail = 'pass';
                break;
            default:
                return
        }

        if (backWasShown) {
            handlePassFailClick(null, passfail)
        }
    }

    // shouldn't have to be here at all: add .saturation property to term if it doesn't have one yet.
    function addEmptySaturationIfTermHasNone(term) {
        let _term = { ...term };

        if (!_term.saturation) {
            _term = Object.assign(_term, { saturation: { forwards: null, backwards: null } });
        }

        if (!_term.saturation.forwards) {
            _term = Object.assign(_term, { saturation: { ..._term.saturation, forwards: null } });
        }

        if (!_term.saturation.backwards) {
            _term = Object.assign(_term, { saturation: { ..._term.saturation, backwards: null } });
        }

        return _term;
    }

    function makeNewSaturationLevels() {
        return termsToReview.map(term => {
            let _term = {  // copy term, add this session's history to it
                ...term,
                history: [
                    ...term.history,
                    newHistoryEntries.find(t => t.termId === term._id).newHistoryEntry
                ]
            };

            _term = addEmptySaturationIfTermHasNone(_term);

            const saturation = { ...(_term.saturation ? _term.saturation : []), [reviewSettings.direction]: saturate(_term, reviewSettings.direction) };

            return ({ termId: _term._id, saturation })
        });
    }

    return (
        <div className="PageWrapper Review">
            <div className="PageHeader Review__title">
                <div> Reviewing. </div>
                <div> <Link className="Button" to={`/u/${params.username}/list/${params.id}`}>Back to list</Link> </div>
            </div>

            { futureTerms?.length > 0 &&
                <>
                    {futureTerms[0].card}

                    { backWasShown
                        ?
                        <>
                            <div className="Review__buttons">
                                <input
                                    onClick={(e) => { if (backWasShown) handlePassFailClick(e, 'fail') }}
                                    disabled={!backWasShown}
                                    className="Review__button Review__button--fail"
                                    type="button"
                                    value="Fail"
                                />
                                <input
                                    onClick={(e) => { if (backWasShown) handlePassFailClick(e, 'pass') }}
                                    disabled={!backWasShown}
                                    className="Review__button Review__button--pass"
                                    type="button"
                                    value="Pass"
                                />
                            </div>

                        </>
                        :
                        <div className="Review__prevent">
                            Cannot move on to the next term until you've seen the back of the card.
                        </div>
                    }

                    <div className="Review__progress--wrapper">
                        <div
                            className="Review__progress--bar"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <ReviewInfo
                        start={reviewSettings.sessionStart}
                        numTerms={numTermsToReview}
                        n={reviewSettings.n}
                        progress={progress}
                    />
                </>
            }
        </div>
    )
})

export default Review;