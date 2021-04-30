import React, { useEffect, useMemo } from "react";
import { useRecoilState, useResetRecoilState } from 'recoil';
import { reviewStageState, reviewSettingsState } from 'recoil/atoms/reviewAtoms';
import qs from 'query-string';
import { useRouteProps } from "hooks/routerHooks";
import Review from './Review';
import PartialReview from './PartialReview';
import CompleteReview from './CompleteReview';
import PreReview from './PreReview';
import PostReview from './PostReview';

function ReviewPage () {
    const { location } = useRouteProps();
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
                return;
        }
    }, [reviewStage]);

    const WrapperToRender = useMemo(() => {
        switch (qs.parse(location.search).kind) {
            case 'full':
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
            setReviewStage('completed');
            resetReviewSettings();
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