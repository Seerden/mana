import { atom } from "recoil";
import {
	ReviewSessionEntryInput,
	ReviewSessionWithoutUserIdInput,
} from "../../../gql/codegen-output";

export const reviewSessionState = atom<Partial<ReviewSessionWithoutUserIdInput>>({
	default: {},
	key: "reviewSessionState",
});

export const reviewEntriesState = atom<Partial<ReviewSessionEntryInput>[]>({
	default: [],
	key: "reviewEntries",
});
