import { Term } from "gql/codegen-output";
import { atom } from "recoil";
import { ReviewSessionWithoutUserIdInput } from "../../../gql/codegen-output";
import { SessionEntryWithoutTimeOnCard } from "../types/review.types";

export enum ReviewStages {
	BEFORE = "before",
	STARTED = "started",
	AFTER = "after",
}

export const reviewStageState = atom<ReviewStages>({
	key: "reviewStageState",
	default: ReviewStages.BEFORE,
});

export const reviewCardTermsState = atom<Term[]>({
	default: [],
	key: "reviewCardTerms",
});

export const reviewSessionState = atom<Partial<ReviewSessionWithoutUserIdInput>>({
	default: {},
	key: "reviewSessionState",
});

export const reviewEntriesState = atom<Partial<SessionEntryWithoutTimeOnCard>[]>({
	default: [],
	key: "reviewEntries",
});
