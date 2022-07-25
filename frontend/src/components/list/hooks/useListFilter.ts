import { filterTermsBySaturation } from "components/list/helpers/filterTermsBySaturation";
import { useQueryListsById } from "gql/hooks/list/useQueryLists";
import useRouteProps from "hooks/useRouteProps";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { termFilterState } from "../../../state/filter";

export function useListFilter() {
	const { params } = useRouteProps();
	const { data: lists } = useQueryListsById([+params.id]);
	const termFilter = useRecoilValue(termFilterState);

	const visibleTermIds = useMemo(() => {
		if (!lists[0]?.terms) return [];

		return filterTermsBySaturation(termFilter, lists[0].terms);
	}, [lists[0].terms, termFilter]);

	return {
		termFilter,
		visibleTermIds,
	} as const;
}
