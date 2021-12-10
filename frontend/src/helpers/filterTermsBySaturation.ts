import { FilterInterface, TruncatedTerm } from "types/list.types";

export function filterTermsBySaturation(filter: FilterInterface, terms: TruncatedTerm[]) {
    if (!terms?.length) return [];

    return terms?.filter((term) => {
        if (filter.saturation?.level) {
            if (!term.saturation) {
                return true;
            }

            if (filter.saturation.direction !== "any") {
                return (
                    term.saturation?.[filter.saturation.direction] ===
                    Number(filter?.saturation.level)
                );
            }
            return (
                term.saturation?.forwards === Number(filter?.saturation.level) ||
                term.saturation?.backwards === Number(filter?.saturation.level)
            );
        } else {
            return true;
        }
    });
}
