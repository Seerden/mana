import React from "react";
import { useRecoilValue } from "recoil";
import { reviewStageState, termsToReviewState } from "recoil/atoms/reviewAtoms";

const PartialReview = ({ children }) => {
    const termsToReview = useRecoilValue(termsToReviewState);
    const reviewStage = useRecoilValue(reviewStageState);

    return (
        <div className="PartialReview">
            { termsToReview?.length > 0 || reviewStage !== 'before' ? <>{children}</> : <>No terms specified to review...</> }
        </div>
    )
}

export default PartialReview