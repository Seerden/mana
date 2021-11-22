import { List } from "gql/codegen-output";
import { atom } from "recoil";

export const selectingTermsToReviewState = atom<boolean>({
	key: "selectingTermsToReviewState",
	default: false,
});

export const listState = atom<List>({
	key: "listState",
	default: {} as List,
});
