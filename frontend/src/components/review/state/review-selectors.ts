import { selector } from "recoil";
import { reviewCardTermsState } from "./review-atoms";

export const numTermsToReviewState = selector({
	key: "numTermsToReviewState",
	get: ({ get }) => get(reviewCardTermsState).length,
});
