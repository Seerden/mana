import { Term } from "gql/codegen-output";
import { TermFilter } from "../../SaturationFilter/types/filter-types";

export function filterTermsBySaturation(
	filter: TermFilter,
	terms: Term[]
): Term["term_id"][] {
	if (!terms?.length) return [];
	if (typeof filter.value !== "number") return terms.map((t) => t.term_id);

	return terms
		.filter((term) => {
			const { forwards = null, backwards = null } = term.saturation ?? {};

			return Object.entries({ forwards, backwards }).every(([direction, value]) =>
				isVisible(filter, value, direction as Direction)
			);
		})
		.map((t) => t.term_id);
}

function isVisible(
	{ value, direction, operator }: TermFilter,
	saturation: number,
	saturationDirection: "forwards" | "backwards"
) {
	if (direction !== "any" && direction !== saturationDirection) {
		return false;
	}

	switch (operator) {
		case "<":
			return saturation < value || !saturation;
		case "≤":
			return saturation <= value || !saturation;
		case "=":
			return saturation == value;
		case ">":
			return saturation > value;
		case "≥":
			return saturation >= value;
	}
}
