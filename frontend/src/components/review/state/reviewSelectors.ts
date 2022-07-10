import { selector } from "recoil";
import { termsToReviewState } from "./reviewAtoms";

export const numTermsToReviewState = selector({
	key: "numTermsToReviewState",
	get: ({ get }) => get(termsToReviewState).length,
});
