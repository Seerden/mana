import { useState, useEffect, useCallback } from "react";
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useRouteProps } from "hooks/routerHooks";
import { numTermsToReviewState } from "state/selectors/reviewSelectors";
import { listState } from "state/atoms/listAtoms";
import { useQueryListsById } from "gql/hooks/list.query";
import { List } from "gql/codegen-output";
import ListTerm from "components/list/ListTerms/ListTerm";
import { useListFilter } from "./useListFilter";
import { useListPrepareReview } from "./useListPrepareReview";
import { useListUpdate } from "./useListUpdate";

function useList() {
    const [list, setList] = useState<List | null>(null);
    const { params } = useRouteProps();
    const { data: lists, refetch: refetchLists } = useQueryListsById([params.id]);
    const { filter, setFilter, termsToDisplay, truncatedTerms, setTruncatedTerms } =
        useListFilter();
    const {
        selectingTerms,
        setSelectingTerms,
        suggestedTermsForReview,
        updateTermsToReview,
    } = useListPrepareReview({ list, filter, truncatedTerms });
    const { handleListTitleBlur, handleTermDelete, handleDelete } = useListUpdate(
        list,
        setList
    );
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const setListAtom = useSetRecoilState(listState);
    const resetListAtom = useResetRecoilState(listState);

    useEffect(() => {
        refetchLists();

        return () => {
            setList(null);
            resetListAtom();
        };
    }, []);

    useEffect(() => {
        // set list and list context when list is returned from API
        if (lists) {
            setList(lists[0]);
            setListAtom(lists[0]);
        }
    }, [lists]);

    useEffect(() => {
        list && extractTermsFromListAsTruncatedTerms(list);
    }, [list]);

    const extractTermsFromListAsTruncatedTerms = useCallback(
        (list: List) => {
            if (list?.terms?.length > 0) {
                const newTruncatedTerms = list.terms.map((term, idx) => {
                    const termProps = {
                        handleTermDelete,
                        key: `term-${term._id}`,
                        idx: idx,
                        term,
                    };

                    return {
                        term: term,
                        // @ts-ignore
                        saturation: term.saturation,
                        // @ts-ignore
                        element: <ListTerm {...termProps} />,
                    };
                });

                // @ts-ignore
                setTruncatedTerms(newTruncatedTerms);
            }
        },
        [setTruncatedTerms, list]
    );

    return {
        list,
        truncatedTerms,
        termsToDisplay,
        suggestedTermsForReview,
        selectingTerms,
        numTermsToReview,
        filter,
        handleListTitleBlur,
        handleDelete,
        updateTermsToReview,
        setSelectingTerms,
        setFilter,
    } as const;
}

export default useList;
