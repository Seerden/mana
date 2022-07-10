import {
	passfailState,
	reviewSettingsState,
	termsToReviewState,
	timePerCardState,
} from "components/review/state/reviewAtoms";
import { Id, ReviewSessionBaseInput } from "gql/codegen-output";
import { convertDateListToDeltaTime } from "helpers/review-helpers";
import { useRouteProps } from "hooks/routerHooks";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

function useReviewSession() {
	const { params, location } = useRouteProps();
	const reviewSettings = useRecoilValue(reviewSettingsState);
	const { direction, sessionEnd, sessionStart, n, started, ended } = reviewSettings;
	const termsToReview = useRecoilValue(termsToReviewState);
	const timePerCard = useRecoilValue(timePerCardState);
	const passfail = useRecoilValue(passfailState);

	const newReviewSession = useMemo<ReviewSessionBaseInput>(
		() => ({
			owner: params.username,
			listIds: location.pathname.includes("list")
				? ([{ _id: params.id }] as unknown as Id[])
				: ([] as Id[]), // @todo: make this work with set reviews
			date: {
				start: sessionStart,
				end: sessionEnd,
			},
			terms: {
				listId: params.id,
				termIds: termsToReview.map((term) => term._id),
			}, // @todo: again, make this work with set reviews
			settings: {
				n,
				sessionStart,
				sessionEnd,
				direction,
				ended,
				started,
			},
			timePerCard: convertDateListToDeltaTime(
				timePerCard,
				reviewSettings.sessionStart
			), // @todo: convert dates to deltatime
			passfail: passfail,
		}),
		[params, location, reviewSettings, termsToReview, timePerCard, passfail]
	);

	return newReviewSession;
}

export default useReviewSession;
