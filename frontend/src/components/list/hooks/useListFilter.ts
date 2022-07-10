import { filterTermsBySaturation } from "components/list/helpers/filterTermsBySaturation";
import { FilterInterface, TruncatedTerm } from "components/list/types/list.types";
import { numTermsToReviewState } from "components/review/state/reviewSelectors";
import { useQueryListsById } from "gql/hooks/list-query";
import { useRouteProps } from "hooks/routerHooks";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

export function useListFilter() {
	const numTermsToReview = useRecoilValue(numTermsToReviewState);
	const { params } = useRouteProps();
	const { data: lists } = useQueryListsById([params.id]);
	const [filter, setFilter] = useState<FilterInterface>({
		saturation: { level: undefined, direction: "any" },
	});
	const [truncatedTerms, setTruncatedTerms] = useState<Array<TruncatedTerm>>([]);

	const termsToDisplay = useMemo(() => {
		return filterTermsBySaturation(filter, truncatedTerms)?.map((term) => term.element);
	}, [truncatedTerms, filter, numTermsToReview, lists]);

	return {
		filter,
		setFilter,
		termsToDisplay,
		truncatedTerms,
		setTruncatedTerms,
	} as const;
}
