import {
	reviewSettingsState,
	reviewStageState,
} from "components/review/state/review-atoms";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import PostReview from "./sub/PostReview";
import PreReview from "./sub/PreReview";
import Review from "./sub/Review";

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

	useEffect(() => {
		resetReviewStage();

		return () => {
			resetReviewStage();
			resetReviewSettings();
		};
	}, []);

	switch (reviewStage) {
		case "before":
			return <PreReview />;
		case "started":
			return <Review />;
		case "after":
			return <PostReview />;
	}
}

export default ReviewPage;
