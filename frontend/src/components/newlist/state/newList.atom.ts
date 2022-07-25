import { atom } from "recoil";
import { NewListWithTermsInput } from "../../../gql/codegen-output";

export const newListState = atom({
	key: "newListState",
	default: {
		from_language: "",
		to_language: "",
		name: "",
		terms: [],
	} as NewListWithTermsInput,
});
