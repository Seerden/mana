import React, { memo } from "react";
import useTimer from './useTimer';
import './style/ReviewInfo.scss';
import { useRecoilState, useRecoilValue } from "recoil";
import { reviewSettingsState } from "recoil/atoms/reviewAtoms";
import { numTermsToReviewState } from "recoil/selectors/reviewSelectors";

const ReviewInfo = memo(({ progress }: { progress: Number}) => {
    const [reviewSettings] = useRecoilState(reviewSettingsState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const start = reviewSettings.sessionStart;
    const n = reviewSettings.n;
    const numTerms = numTermsToReview;
    const {timeSinceStart, title} = useTimer({start});

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
                        You started this session <span title={title}>{timeSinceStart}</span>.
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
            </div>

        </details>
    )
})

export default ReviewInfo