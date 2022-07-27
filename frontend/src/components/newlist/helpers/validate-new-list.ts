import { NewListWithTermsInput } from "../../../gql/codegen-output";
import { filterFalsy } from "./filterFalsyValues";

export function isValidNewList(newList: NewListWithTermsInput) {
	const fields = ["name", "from_language", "to_language"];

	const fieldsAreValid = fields.every(
		(entry) =>
			entry in newList &&
			(typeof newList[entry] == "string" || Array.isArray(newList[entry]))
	);

	const hasTerms = filterFalsy(newList.terms)?.length > 0;

	return fieldsAreValid && hasTerms;
}
