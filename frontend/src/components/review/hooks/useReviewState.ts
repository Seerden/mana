import {
	passfailState,
	reviewSettingsState,
	reviewStageState,
	termsToReviewState,
	termUpdateArrayState,
	timePerCardState,
} from "components/review/state/review-atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useReviewSession from "./useReviewSession";

/**
 * useReview has so many pieces of interconnected state, it's pretty much a BIG BALL OF MUD.
 * For readability during the refactoring process, let's put all state from useReview in here,
 * and return the things useReview needs, if only just to reduce LOC in useReview
 */
export function useReviewState() {
	const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
	const termsToReview = useRecoilValue(termsToReviewState);
	const setReviewStage = useSetRecoilState(reviewStageState);
	const setPassfail = useSetRecoilState(passfailState);
	const setTimePerCard = useSetRecoilState(timePerCardState);
	const [termUpdateArray, setTermUpdateArray] = useRecoilState(termUpdateArrayState);
	const newReviewSession = useReviewSession();

	return {
		reviewSettings,
		setReviewSettings,
		termsToReview,
		setReviewStage,
		setPassfail,
		setTimePerCard,
		termUpdateArray,
		setTermUpdateArray,
		newReviewSession,
	} as const;
}
