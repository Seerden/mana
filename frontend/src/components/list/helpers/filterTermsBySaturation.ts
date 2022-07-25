import { FilterInterface } from "components/list/types/list.types";
import { Term } from "../../../gql/codegen-output";

export function filterTermsBySaturation(
	filter: FilterInterface,
	terms: Term[]
): Term["term_id"][] {
	return terms.map((t) => t.term_id);

	if (!terms?.length) return [];
	if (!filter.saturation?.level) return terms.map((t) => t.term_id);

	return terms
		.filter((term) => {
			if (!term.saturation) return true;

			if (filter.saturation.direction !== "any") {
				return (
					+term.saturation?.[filter.saturation.direction] ===
					Number(filter?.saturation.level)
				);
			}

			const { forwards, backwards } = term.saturation;
			// TODO: temporarily cast to number pending refactor
			return [forwards, backwards].includes(filter?.saturation.level as number);
		})
		.map((t) => t.term_id);
}
