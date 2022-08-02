import { Term } from "gql/codegen-output";
import { atom } from "recoil";
import { ReviewStage } from "../types/review.types";

export const reviewStageState = atom<ReviewStage>({
	key: "reviewStageState",
	default: "before",
});

export const termsToReviewState = atom<Array<Term>>({
	key: "termsToReviewState",
	default: [] as Term[],
});

export const reviewCardTermsState = atom<Term[]>({
	default: [],
	key: "reviewCardTerms",
});
