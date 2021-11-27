import { atom } from "recoil";
import { NewList } from "types/newList.types";

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
