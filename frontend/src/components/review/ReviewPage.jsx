import React, { useState, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { reviewStageState, termsToReviewState } from 'recoil/atoms/reviewAtoms';
import Review from './Review';
import PreReview from './PreReview';
import PostReview from './PostReview';

const ReviewPage = (props) => {
    const reviewStage = useRecoilValue(reviewStageState);
    const termsToReview = useRecoilValue(termsToReviewState);
    const resetReviewStage = useResetRecoilState(reviewStageState);

    useEffect(resetReviewStage, []);

    switch (reviewStage) {
        case 'before':
            if (!termsToReview.length > 0) {
                return <div>No terms to review. Go back to /list or /set and choose review from there!</div>
            } else {
                return <PreReview />
            }
        case 'started': 
            return <Review />
        case 'after':
            return <PostReview />
        default:
            return <PreReview />
    }
}

export default ReviewPage