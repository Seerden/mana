import React, { memo, useEffect } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { useRouteProps } from 'hooks/routerHooks';
import { useRequest } from 'hooks/useRequest';
import { useReview } from 'hooks/useReview';
import { putTerms } from 'helpers/apiHandlers/listHandlers';
import { postSession } from 'helpers/apiHandlers/sessionHandlers';
import { saturate } from 'helpers/srs/saturation';
import { timePerCardState, passfailState, reviewSettingsState, termsToReviewState, newHistoryEntriesState, reviewStageState } from 'recoil/atoms/reviewAtoms';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';
import { convertDateListToDeltaTime } from 'helpers/reviewHelpers';

import ReviewInfo from './ReviewInfo';
import './style/Review.scss';

const Review = memo((props) => {
    const { params, location } = useRouteProps();

    const setReviewStage = useSetRecoilState(reviewStageState);
    const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
    const passfail = useRecoilValue(passfailState);
    const timePerCard = useRecoilValue(timePerCardState);
    const termsToReview = useRecoilValue(termsToReviewState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const [
        backWasShown,
        setBackWasShown,
        futureTerms,
        reduceFutureTerms,
        progress,
        handlePassFailClick,
        newHistoryEntries,
        resetNewHistoryEntries
    ] = useReview();

    const { response: resB, setRequest: setPutTermRequest } = useRequest({});  // update terms with their new history entries
    const { response: resC, setRequest: setPutTermSaturationRequest } = useRequest({});  // update terms with their new saturation
    const { response: sessionPostResponse, setRequest: setPostSessionRequest } = useRequest({});

    useEffect(() => {  // on unmount: reset termsToReview and newHistoryEntries
        return () => {
            resetTermsToReview();
            resetNewHistoryEntries();
        }
    }, [])

    useEffect(() => {  // send PUT and POST requests (needs to not be in the useEffect above, since then history lags one update behind)
        if (reviewSettings.sessionEnd) {
            setPutTermRequest(() => putTerms(params.username, { type: 'history' }, { termsToUpdate: newHistoryEntries }));
            setPutTermSaturationRequest(() => putTerms(params.username, { type: 'saturation' }, { termsToUpdate: makeNewSaturationLevels() }));
            setPostSessionRequest(() => postSession(params.username, {
                newReviewSession: {
                    owner: params.username,
                    listIds: location.pathname.includes('list') ? [params.id] : [],  // @todo: make this work with set reviews
                    date: {
                        start: reviewSettings.sessionStart,
                        end: reviewSettings.sessionEnd
                    },
                    terms: [{listId: params.id, termIds: termsToReview.map(term => term._id)}],  // @todo: again, make this work with set reviews
                    settings: {
                        cycles: reviewSettings.n,
                        direction: reviewSettings.direction
                    },
                    timePerCard: convertDateListToDeltaTime(timePerCard, reviewSettings.sessionStart),  // @todo: convert dates to deltatime 
                    passfail: passfail
                }
            }))
        }
    }, [reviewSettings.sessionEnd])

    useEffect(() => {  // set reviewStage to PostReview once all post-session API requests are handled
        if (resB && resC && sessionPostResponse) {
            setReviewStage('after');
        }
    }, [resB, resC, sessionPostResponse])

    function makeNewSaturationLevels() {
        return termsToReview.map(term => {
            let _term = {  // copy term, add this session's history to it
                ...term,
                history: [
                    ...term.history,
                    newHistoryEntries.find(t => t.termId === term._id).newHistoryEntry
                ]
            };

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

                    <ReviewInfo progress={progress} />
                </>
            }
        </div>
    )
})

export default Review;