import { atom } from "recoil";
import { NewList } from "types/newList.types";

export const newListState = atom({
	key: "newListState",
	default: {} as NewList,
});
