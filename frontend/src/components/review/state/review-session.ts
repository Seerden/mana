import { atom } from "recoil";
import { ReviewSessionEntryInput, ReviewSessionInput } from "../../../gql/codegen-output";

export const reviewSessionState = atom<Partial<ReviewSessionInput>>({
	default: {},
	key: "reviewSessionState",
});

export const reviewEntriesState = atom<Partial<ReviewSessionEntryInput>[]>({
	default: [],
	key: "reviewEntries",
});
