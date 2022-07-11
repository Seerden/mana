import { selector } from "recoil";
import { termsToReviewState } from "./review-atoms";

export const numTermsToReviewState = selector({
	key: "numTermsToReviewState",
	get: ({ get }) => get(termsToReviewState).length,
});
