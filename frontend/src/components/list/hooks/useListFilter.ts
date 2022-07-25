import { filterTermsBySaturation } from "components/list/helpers/filterTermsBySaturation";
import { FilterInterface } from "components/list/types/list.types";
import { useQueryListsById } from "gql/hooks/list/useQueryLists";
import useRouteProps from "hooks/useRouteProps";
import { useMemo, useState } from "react";

const defaultFilter: FilterInterface = {
	saturation: { level: undefined, direction: "any" },
};

export function useListFilter() {
	const { params } = useRouteProps();
	const { data: lists } = useQueryListsById([+params.id]);
	const [filter, setFilter] = useState<FilterInterface>(defaultFilter);

	const visibleTermIds = useMemo(() => {
		if (!lists[0]?.terms) return [];

		return filterTermsBySaturation(filter, lists[0].terms);
	}, [lists[0].terms, filter]);

	return {
		filter,
		setFilter,
		visibleTermIds,
	} as const;
}
