import React, { useEffect, useMemo } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { reviewStageState, termsToReviewState } from 'recoil/atoms/reviewAtoms';
import Review from './Review';
import PartialReview from './PartialReview';
import CompleteReview from './CompleteReview';
import PreReview from './PreReview';
import PostReview from './PostReview';
import { useRouteProps } from "hooks/routerHooks";
import qs from 'query-string';

const ReviewPage = (props) => {
    const { location } = useRouteProps();
    const [reviewStage, setReviewStage] = useRecoilState(reviewStageState);
    const termsToReview = useRecoilValue(termsToReviewState);
    const resetReviewStage = useResetRecoilState(reviewStageState);
    const ReviewStageToRender = useMemo(() => {
        switch (reviewStage) {
            case 'before':
                return PreReview
            case 'started':
                return Review
            case 'after':
                return PostReview
            default:
                return;
        }
    }, [reviewStage]);

    const WrapperToRender = useMemo(() => {
        switch (qs.parse(location.search).kind) {
            case 'full':
                // return React.Fragment
                return CompleteReview;
            case 'partial':
                return PartialReview;
            default:
                return React.Fragment;
        }
    }, [])

    useEffect(() => {
        resetReviewStage();

        return () => {
            setReviewStage(null);
        }
    }, []);

    return (
        <>
            { WrapperToRender && ReviewStageToRender &&
                <WrapperToRender>
                    <ReviewStageToRender/>
                </WrapperToRender>
            }
        </>
    )
}



export default ReviewPage