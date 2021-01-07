import React, { memo } from "react";
import Timer from './Timer';
import './style/ReviewInfo.scss';
import { useRecoilState, useRecoilValue } from "recoil";
import { timerState, reviewSettingsState } from "recoil/atoms/reviewAtoms";
import { numTermsToReviewState } from "recoil/selectors/reviewSelectors";
import { useReviewSession } from 'hooks/useReviewTimer'

const ReviewInfo = memo(({ progress }) => {
    const [reviewSettings] = useRecoilState(reviewSettingsState);
    const [numTermsToReview] = useRecoilState(numTermsToReviewState);
    const start = reviewSettings.start;
    const n = reviewSettings.n;
    const numTerms = numTermsToReview;
    const timer = useRecoilValue(timerState);

    return (
        <details className="Review__info">

            <summary>
                <span className="Review__info--header">
                    <span>Session information</span>
                </span>
            </summary>

            <div className="Review__info--dynamic">
                <div className="Review__info--completion">
                    Session completion: {progress}%.
                    <div>
                        You started this session <Timer start={start} />.
                    </div>
                </div>
            </div>

            <div className="Review__info--hideable">
                <div>
                    Number of terms in this list: <strong>{numTerms}</strong>.
                </div>
                <div>
                    Pass each term <strong>{n} time{n !== 1 ? 's' : ''}</strong> to complete the session.
                </div>
                <div>
                    Time since last card: {timer}
                </div>
            </div>

        </details>
    )
})

export default ReviewInfo