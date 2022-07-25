import { atom } from "recoil";
import { TermFilter } from "../components/SaturationFilter/types/filter-types";

export const termFilterState = atom<TermFilter>({
	key: "termFilterState",
	default: {
		forwards: {},
		backwards: {},
	},
});
