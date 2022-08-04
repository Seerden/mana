import { reviewStageState } from "components/review/state/review-atoms";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { reviewEntriesState, reviewSessionState } from "../state/review-session";

/**
 * useReview has so many pieces of interconnected state, it's pretty much a BIG BALL OF MUD.
 * For readability during the refactoring process, let's put all state from useReview in here,
 * and return the things useReview needs, if only just to reduce LOC in useReview
 */
export function useReviewState() {
	const setReviewStage = useSetRecoilState(reviewStageState);
	const [backWasShown, setBackWasShown] = useState<boolean>(false);

	// reviewSession state starts out without properties.
	// Before moving on from PreReview (where all the settings are selected), we
	// validate that all required fields are present. Both typing and validation
	// are easier like this than when initializing with stub values
	const [reviewSession, setReviewSession] = useRecoilState(reviewSessionState);

	// reviewEntries state will track all of the entries throughout the
	// application. Every time a user interacts with a card (pass/fail events),
	// an item it pushed to this array.
	const [reviewEntries, setReviewEntries] = useRecoilState(reviewEntriesState);

	return {
		setReviewStage,
		backWasShown,
		setBackWasShown,
		reviewSession,
		reviewEntries,
		setReviewSession,
		setReviewEntries,
	} as const;
}
