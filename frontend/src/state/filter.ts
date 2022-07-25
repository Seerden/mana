import { atom } from "recoil";
import { TermFilter } from "../components/SaturationFilter/types/filter-types";

export const termFilterState = atom<TermFilter>({
	key: "termFilterState",
	default: {
		direction: "any",
		operator: "≥",
		value: 0,
	},
});
