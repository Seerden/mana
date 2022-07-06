import { useQueryListsById } from "gql/hooks/list-query";
import { useRouteProps } from "hooks/routerHooks";
import qs from "query-string";
import { useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { termsToReviewState } from "state/atoms/reviewAtoms";

export function useInitializeReview() {
	const { params, location } = useRouteProps();
	const { data: lists, refetch: refetchLists } = useQueryListsById([params.id]);
	const setTermsToReview = useSetRecoilState(termsToReviewState);
	const resetTermsToReview = useResetRecoilState(termsToReviewState);
	const isFullListReview =
		qs.parse(location.search).kind === "full" && location.pathname.includes("list");

	/* 
        useReview handles various types of reviews
        for the case where a user manually selects a partial list, the terms to be reviewed 
        (termsToReview) will already be present at this stage. For a full-list review, 
        though, we can fetch the list and setTermsToReview in this hook.
        
        @todo: consider rewriting the Review page for a consistent UX: 
            if a user navigates to a partial review without coming from /list, 
            there won't be any termsToReview present and so 
            the component won't be able to do its job, and that would be our fault, 
                not the user's
            - Maybe we should fetch the entire list on Review mount, and allow the user 
                to select terms in Review itself
            - Maybe we shouldn't allow full control over which terms are selected for 
                a review, but only allow various pre-determined subsets of terms, e.g. terms 
                    with specfic saturation states. then we'd be able to delegate term selection 
                    to Review by deriving terms from props/link, like 
                        /review?kind=saturation&level=0    
    */

	// if full-list review, fetch list from database
	useEffect(() => {
		if (location.pathname.includes("list")) {
			refetchLists();
		}

		return () => resetTermsToReview();
	}, []);

	/*
        if full-list review and list has been fetched (which is a result from the above useEffect), 
        put list's terms in termsToReview 
    */
	useEffect(() => {
		if (lists?.length && isFullListReview) {
			setTermsToReview(lists[0].terms);
		}
	}, [lists]);
}
