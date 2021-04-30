import React, { memo, useEffect, useCallback } from "react";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { useRouteProps } from 'hooks/routerHooks';
import { useRequest } from 'hooks/useRequest';
import { useReview } from 'hooks/useReview';
import { putTerms } from 'helpers/apiHandlers/listHandlers';
import { postSession } from 'helpers/apiHandlers/sessionHandlers';
import { makeNewSaturationLevels } from 'helpers/srs/saturation';
import { reviewSettingsState, termsToReviewState, reviewStageState } from 'recoil/atoms/reviewAtoms';

import ReviewInfo from './ReviewInfo';
import './style/Review.scss';
import useReviewSession from "hooks/useReviewSession";

const Review = memo((props) => {
    const { params } = useRouteProps();
    const setReviewStage = useSetRecoilState(reviewStageState);
    const reviewSettings = useRecoilValue(reviewSettingsState);
    const termsToReview = useRecoilValue(termsToReviewState);
    const {
        backWasShown,
        futureTerms,
        progress,
        handlePassFailClick,
        newHistoryEntries,
    } = useReview();
    const newReviewSession = useReviewSession();

    const { response: putTermResponse, setRequest: setPutTermRequest } = useRequest({});  // update terms with their new history entries
    const { response: putTermSaturationResponse, setRequest: setPutTermSaturationRequest } = useRequest({});  // update terms with their new saturation
    const { response: sessionPostResponse, setRequest: setPostSessionRequest } = useRequest({});

    const makeNewSaturationLevelsCallback = useCallback(() => {
        return makeNewSaturationLevels(termsToReview, newHistoryEntries, reviewSettings)
    }, [termsToReview, newHistoryEntries, reviewSettings])

    useEffect(() => {  // send PUT and POST requests (needs to not be in the useEffect above, since then history lags one update behind)
        if (reviewSettings.sessionEnd) {
            setPutTermRequest(() => putTerms(params.username, { type: 'history' }, { termsToUpdate: newHistoryEntries }));
            setPutTermSaturationRequest(() => putTerms(params.username, { type: 'saturation' }, { termsToUpdate: makeNewSaturationLevelsCallback() }));
            setPostSessionRequest(() => postSession(params.username, { newReviewSession }))
        }
    }, [reviewSettings.sessionEnd])

    useEffect(() => {  // set reviewStage to PostReview once all post-session API requests are handled
        if (putTermResponse && putTermSaturationResponse && sessionPostResponse) {
            setReviewStage('after');
        }
    }, [putTermResponse, putTermSaturationResponse, sessionPostResponse])

    return (
        <div className="PageWrapper Review">
            <div className="PageHeader Review__title">
                <div>
                    Reviewing.
                </div>
                <div>
                    <Link className="Button" to={`/u/${params.username}/list/${params.id}`}>
                        Back to list
                    </Link>
                </div>
            </div>

            {futureTerms?.length > 0 &&
                <>
                    {futureTerms[0].card}

                    {backWasShown
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