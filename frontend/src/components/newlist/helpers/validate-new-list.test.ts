import { NewListWithTermsInput } from "../../../gql/codegen-output";
import { filterValidNewTerms, isValidNewList } from "./validate-new-list";

const [from_language, to_language] = ["English", "Spanish"];

const term: NewListWithTermsInput["terms"][number] = {
	from_language,
	to_language,
	from_value: "uno",
	to_value: "one",
};

const newList: NewListWithTermsInput = {
	from_language: "Spanish",
	to_language: "English",
	name: "I'm a list",
	terms: [{ ...term }],
};

describe("filterValidNewTerms", () => {
	it("returns empty list if no valid terms present", () => {
		expect(filterValidNewTerms([{ ...term, from_value: "" }])).toHaveLength(0);
	});

	it("returns empty list if no valid terms present", () => {
		expect(filterValidNewTerms([term])).toEqual([term]);
	});
});

describe("isValidNewList", () => {
	it("rejects list without name", () => {
		const list = { ...newList };
		list.name = "";

		expect(isValidNewList(list)).toBeFalsy();
	});

	it("rejects list without languages", () => {
		const list = { ...newList };
		list.from_language = "";

		expect(isValidNewList(list)).toBeFalsy();
	});

	it("rejects list with 0 valid terms", () => {
		const list = { ...newList, terms: [{ ...term, from_value: "" }] };

		expect(isValidNewList(list)).toBeFalsy();
	});

	it("accepts list with name, languages, and at least one term", () => {
		const list = { ...newList };
		expect(isValidNewList(list)).toBeTruthy();
	});
});
