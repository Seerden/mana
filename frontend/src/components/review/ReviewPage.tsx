import useReviewPage from "./hooks/useReviewPage";
import { ReviewStages } from "./state/review-atoms";
import PostReview from "./sub/PostReview";
import PreReview from "./sub/PreReview";
import Review from "./sub/Review";

/** Renders PreReview, Review, or PostReview depending on `reviewStage`. */
function ReviewPage() {
	const { reviewStage, reviewParams, cardTerms } = useReviewPage();

	switch (reviewStage) {
		case ReviewStages.BEFORE:
			return <PreReview initialSettings={reviewParams} />;
		case ReviewStages.STARTED:
			return <Review cardTerms={cardTerms} />;
		case ReviewStages.AFTER:
			return <PostReview />;
		default:
			return <></>;
	}
}

export default ReviewPage;
