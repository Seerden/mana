import React, { useState, useEffect } from "react";
import { useRecoilValue } from 'recoil';
import { reviewStageState } from 'recoil/atoms/reviewAtoms';
import Review from './Review';
import PreReview from './PreReview';
import PostReview from './PostReview';

const ReviewPage = (props) => {
    const reviewStage = useRecoilValue(reviewStageState);

    switch (reviewStage) {
        case 'before':
            return <PreReview />
        case 'started': 
            return <Review />
        case 'after':
            return <PostReview />
        default:
            return <PreReview />
    }
}

export default ReviewPage