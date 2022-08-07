import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import useQueryTermsForReview from "../../../gql/hooks/term/useQueryTermsForReview";
import useRouteProps from "../../../hooks/useRouteProps";
import { idsFields } from "../helpers/ids-fields";
import { makeReviewParams } from "../helpers/review-type";
import { reviewSessionState, reviewStageState } from "../state/review-atoms";

export default function useReviewPage() {
	const reviewStage = useRecoilValue(reviewStageState),
		resetReviewStage = useResetRecoilState(reviewStageState),
		[reviewSession, setReviewSession] = useRecoilState(reviewSessionState),
		resetReviewSession = useResetRecoilState(reviewSessionState);

	const { location, search, params } = useRouteProps();

	const [reviewParams, idsField] = useMemo(() => {
		const reviewParams = makeReviewParams(search, location, params);
		const idsField = idsFields.find((f) => reviewParams[f]?.length);

		return [reviewParams, idsField] as const;
	}, [location, search, params]);

	const { data: cardTerms, refetch } = useQueryTermsForReview(
		reviewSession.n,
		reviewParams
	);

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
		 * arguments of useQueryTermsForReview) changes.
		 * @note this logic can be improved:
		 *    @see documentation/implementation/review/refetch-logic.
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

	return {
		reviewStage,
		reviewParams,
		cardTerms,
	} as const;
}
