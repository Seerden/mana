import useReviewPage from "./hooks/useReviewPage";
import PostReview from "./sub/PostReview";
import PreReview from "./sub/PreReview";
import Review from "./sub/Review";

/** Renders PreReview, Review, or PostReview depending on `reviewStage`. */
function ReviewPage() {
	const { reviewStage, reviewParams, cardTerms } = useReviewPage();
	switch (reviewStage) {
		case "before":
			return <PreReview initialSettings={reviewParams} />;
		case "started":
			return <Review cardTerms={cardTerms} />;
		case "after":
			return <PostReview />;
	}
}

export default ReviewPage;
