import { Term } from "gql/codegen-output";
import { atom } from "recoil";
import { ReviewSessionWithoutUserIdInput } from "../../../gql/codegen-output";
import { ReviewStage, SessionEntryWithoutTimeOnCard } from "../types/review.types";

export const reviewStageState = atom<ReviewStage>({
	key: "reviewStageState",
	default: "before",
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
