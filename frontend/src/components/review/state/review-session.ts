import { atom } from "recoil";
import { ReviewSessionWithoutUserIdInput } from "../../../gql/codegen-output";
import { SessionEntryWithoutTimeOnCard } from "../types/review.types";

export const reviewSessionState = atom<Partial<ReviewSessionWithoutUserIdInput>>({
	default: {},
	key: "reviewSessionState",
});

export const reviewEntriesState = atom<Partial<SessionEntryWithoutTimeOnCard>[]>({
	default: [],
	key: "reviewEntries",
});
