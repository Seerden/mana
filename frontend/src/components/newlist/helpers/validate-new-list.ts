import { NewListWithTermsInput } from "../../../gql/codegen-output";

export function isValidNewList(newList: NewListWithTermsInput) {
	const fields = ["name", "from_language", "to_language"];

	for (const field of fields) {
		if (!newList[field]?.length) return false;
	}

	const validTerms = newList.terms.filter(({ from_value, to_value }) => {
		return from_value.length && to_value.length;
	});

	return !!validTerms?.length;
}

export function filterValidNewTerms(terms: NewListWithTermsInput["terms"]) {
	return terms.filter(({ from_value, to_value }) => {
		return from_value?.length && to_value?.length;
	});
}
