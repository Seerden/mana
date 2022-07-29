import { NewListWithTermsInput } from "../../../gql/codegen-output";
import { filterFalsy } from "./filterFalsyValues";

export function isValidNewList(newList: NewListWithTermsInput) {
	const fields = ["name", "from_language", "to_language"];

	for (const field of fields) {
		if (!newList[field]?.length) return false;
	}

	const hasTerms = filterFalsy(newList.terms)?.length > 0;

	return !!hasTerms;
}
