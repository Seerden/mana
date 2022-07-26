import { List } from "gql/codegen-output";
import { atom } from "recoil";

export const listState = atom<List>({
	key: "listState",
	default: {} as List,
});
