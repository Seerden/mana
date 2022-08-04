import { reviewStageState } from "components/review/state/review-atoms";
import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { ReviewParamsInput } from "../../gql/codegen-output";
import useQueryTermsForReview from "../../gql/hooks/term/useQueryTermsForReview";
import useRouteProps from "../../hooks/useRouteProps";
import { makeReviewParams } from "./helpers/review-type";
import { reviewSessionState } from "./state/review-session";
import PostReview from "./sub/PostReview";
import PreReview from "./sub/PreReview";
import Review from "./sub/Review";

/** Renders PreReview, Review, or PostReview depending on `reviewStage`. */
function ReviewPage() {
	const reviewStage = useRecoilValue(reviewStageState);
	const resetReviewStage = useResetRecoilState(reviewStageState);
	const [reviewSession, setReviewSession] = useRecoilState(reviewSessionState);
	const resetReviewSession = useResetRecoilState(reviewSessionState);
	const { location, search, params } = useRouteProps();
	const [reviewParams, idsField] = useMemo(() => {
		const reviewParams = makeReviewParams(search, location, params);
		const idsField = (
			["list_ids", "term_ids", "set_ids"] as Array<keyof ReviewParamsInput>
		).filter((field) => (reviewParams[field] as number[])?.length > 0)?.[0];

		return [reviewParams, idsField] as const;
	}, [location, search, params]);

	const { data, refetch } = useQueryTermsForReview(reviewSession, reviewParams);

	/* NOTE:
      idsField depends on the URL, which is currently static through this
      component's life, but it's conceivable that we might end up doing so one day.
      In that case, consider introducing a `startedRef` or similar to track
      whether the review has already started, and only setReviewSession if the
      review hasn't started yet.  */
	useEffect(() => {
		setReviewSession((cur) => ({ ...cur, [idsField]: [+params.id] }));
	}, [idsField]);

	useEffect(() => {
		/**
		 * Refetch termsForReview whenever one of the required query variables (=
		 * arguments of useQueryTermsForReview)
		 * @note this logic can be improved. @see documentation/implementation/review/refetch-logic
		 */
		refetch();
	}, [reviewSession.n, reviewParams]);

	useEffect(() => {
		resetReviewStage();

		return () => {
			resetReviewStage();
			resetReviewSession();
		};
	}, []);

	switch (reviewStage) {
		case "before":
			return <PreReview initialSettings={reviewParams} />;
		case "started":
			return <Review cardTerms={data} />;
		case "after":
			return <PostReview />;
	}
}

export default ReviewPage;
