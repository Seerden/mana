import React, { useEffect, useMemo } from "react";
import { useRecoilState, useResetRecoilState } from 'recoil';
import { reviewStageState, reviewSettingsState } from 'state/atoms/reviewAtoms';
import Review from './Review';
import PreReview from './PreReview';
import PostReview from './PostReview';

function ReviewPage () {
    const [reviewStage, setReviewStage] = useRecoilState(reviewStageState);
    const resetReviewStage = useResetRecoilState(reviewStageState);
    const resetReviewSettings = useResetRecoilState(reviewSettingsState);

    const ReviewStageToRender = useMemo(() => {
        switch (reviewStage) {
            case 'before':
                return PreReview
            case 'started':
                return Review
            case 'after':
                return PostReview
            default:
                return PreReview;
        }
    }, [reviewStage]) as React.ElementType;

    useEffect(() => {
        resetReviewStage();

        return () => {
            setReviewStage('completed');
            resetReviewSettings();
        }
    }, []);

    return (
        <ReviewStageToRender/>
    )
}

export default ReviewPage

// @todo: implement conditional render based on termsToReview length