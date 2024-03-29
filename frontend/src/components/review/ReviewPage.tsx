import {
	reviewSettingsState,
	reviewStageState,
} from "components/review/state/review-atoms";
import React, { useEffect, useMemo } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import PostReview from "./sub/PostReview";
import PreReview from "./sub/PreReview";
import Review from "./sub/Review";

const mapReviewStageToComponent = {
	before: PreReview,
	started: Review,
	after: PostReview,
};

/**
 * ReviewPage controls which component is rendered depending on the current review stage
 * - `PreReview` lets user choose the settings for the review
 * - In `Review`, the user actually does their vocabulary testing
 * - In `PostReview`, the user is shown some statistics about the review they just performed,
 *      and also some buttons to be redirected to wherever else they may wish to go
 */
function ReviewPage() {
	const reviewStage = useRecoilValue(reviewStageState);
	const resetReviewStage = useResetRecoilState(reviewStageState);
	const resetReviewSettings = useResetRecoilState(reviewSettingsState);

	const ReviewStageToRender = useMemo(() => {
		return mapReviewStageToComponent[reviewStage] as React.ElementType;
	}, [reviewStage]);

	useEffect(() => {
		resetReviewStage();

		return () => {
			resetReviewStage();
			resetReviewSettings();
		};
	}, []);

	return <ReviewStageToRender />;
}

export default ReviewPage;
