import { NewList } from "components/newlist/types/newList.types";
import { atom } from "recoil";

export const newListState = atom({
	key: "newListState",
	default: {
		owner: "",
		from: "",
		to: "",
		name: "",
		terms: [],
	} as NewList,
});
