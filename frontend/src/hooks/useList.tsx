import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useRouteProps } from 'hooks/routerHooks';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';
import { selectingTermsToReviewState, listState } from 'recoil/atoms/listAtoms';
import ListTerm from '../components/list/ListTerm';
import { termsToReviewState } from "recoil/atoms/reviewAtoms";
import { suggestTermsForReview } from "helpers/srs/saturation";
import { FilterInterface, TruncatedTerm } from '../components/list/list.types';
import { useMutateDeleteList, useMutateUpdateList, useQueryListsById } from "graphql/hooks/list.query";
import { List } from "graphql/codegen-output";
import { DeleteTermsVariables, useMutateDeleteTerms } from "graphql/hooks/term.query";

function useList() {
    const [list, setList] = useState<List | null>(null);
    const [filter, setFilter] = useState<FilterInterface>({ saturation: { level: null, direction: 'any' } });
    const [truncatedTerms, setTruncatedTerms] = useState<Array<TruncatedTerm>>([]);
    const { params, navigate } = useRouteProps();
    const [selectingTerms, setSelectingTerms] = useRecoilState(selectingTermsToReviewState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const setListAtom = useSetRecoilState(listState);
    const resetListAtom = useResetRecoilState(listState);
    const setTermsToReview = useSetRecoilState(termsToReviewState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const { data: listUpdateResponse, mutate: mutateUpdateList } = useMutateUpdateList();
    const suggestedTermsForReview = useMemo(() => list && suggestTermsForReview(list.terms), [list]);

    const { data: lists, refetch: refetchLists, isLoading, isFetching } = useQueryListsById([params.id]);
    const { mutate: mutateDeleteList, data: listDeleteResponse } = useMutateDeleteList(params.id);
    const { mutate: mutateDeleteTerms, data } = useMutateDeleteTerms();

    function filterTermsBySaturation(terms: TruncatedTerm[]) {
        if (terms.length > 0) {
            return terms
                ?.filter(term => {
                    if (filter.saturation?.level) {
                        if (!term.saturation) { return true }

                        if (filter.saturation.direction !== 'any') {
                            return term.saturation?.[filter.saturation.direction] === Number(filter?.saturation.level)
                        }
                        return (
                            term.saturation?.forwards === Number(filter?.saturation.level) ||
                            term.saturation?.backwards === Number(filter?.saturation.level)
                        )
                    } else {
                        return true
                    }
                })
        } else {
            return []
        }
    };

    const termsToDisplay = useMemo(() => {
        return filterTermsBySaturation(truncatedTerms)
            ?.map(term => term.element)
    }, [truncatedTerms, filter, numTermsToReview, lists]);

    useEffect(() => {
        refetchLists()

        return () => {
            setList(null);
            resetListAtom();
        }
    }, [])

    useEffect(() => {
        if (listDeleteResponse?.success) {
            navigate(`/u/${params.username}/lists`, { replace: true })
        }
    }, [listDeleteResponse])

    useEffect(() => {  // set list and list context when list is returned from API
        if (lists) {
            setList(lists[0]);
            setListAtom(lists[0]);
        }
    }, [lists])

    useEffect(() => {
        list && extractTermsFromListAsTruncatedTerms(list);
    }, [list])

    const extractTermsFromListAsTruncatedTerms = useCallback((list: List) => {
        if (list && list.terms && list.terms?.length > 0) {
            const newTruncatedTerms = list.terms.map((term, idx) => {
                let termProps = {
                    handleTermDelete,
                    key: `term-${term._id}`,
                    idx: idx,
                    term
                };

                return ({
                    term: term,
                    // @ts-ignore
                    saturation: term.saturation,
                    // @ts-ignore 
                    element: <ListTerm {...termProps} />
                })

            })

            // @ts-ignore 
            setTruncatedTerms(newTruncatedTerms);
        }
    }, [setTruncatedTerms, list])

    const handleListTitleBlur = useCallback((e) => {
        e.persist();

        if (list && list.terms.length > 0) {
            if(!e.currentTarget.innerText) {
                e.currentTarget.innerText = list.name;
            }

            if (e.currentTarget.innerText && e.currentTarget.innerText !== list.name) {
                let updatedList: List = { ...list, name: e.currentTarget.innerText }
                if (updatedList.terms && updatedList.terms.length > 0) {
                    setList(updatedList);

                    mutateUpdateList({
                        listId: params.id,
                        action: { type: 'name' },
                        payload: { name: e.currentTarget.innerText }
                    })
                }
            }
        }
    }, [list, setList])

    function handleTermDelete(idx: number) {
        if (list && list.terms && list.terms.length > 0) {
            const updatedList: List = { ...list, terms: [...list.terms] };  // need to spread the .terms property since otherwise it's not a (deep?/shallow?) copy

            if (updatedList && updatedList.terms) {
                const termId = updatedList.terms[idx]._id;
                updatedList.terms.splice(idx, 1);
                setList(updatedList);
                setListAtom(updatedList)

                const variables: DeleteTermsVariables = {
                    listId: params.id,
                    ids: [termId],
                    remainingTermIds: updatedList.terms.map(term => term._id)
                };

                mutateDeleteTerms(variables);
            }
        }
    };

    /**
     * Trigger the API to DELETE the entire list
     */
    function handleDelete() {
        mutateDeleteList();
    };

    const updateTermsToReview = useCallback(({ type, direction }: { type: 'all' | 'visible' | 'none' | 'overdue', direction: Direction }) => {
        if (list && list.terms) {
            switch (type) {
                case 'all':
                    // @ts-ignore 
                    setTermsToReview(list.terms);
                    break;
                case 'visible':  // add all visible terms to termsToReview, as long as they're not already in there
                    setTermsToReview(cur => Array.from(new Set([...cur, ...filterTermsBySaturation(truncatedTerms).map(t => t.term)])));
                    break;
                case 'none':
                    resetTermsToReview();
                    break;
                case 'overdue':
                    if (suggestedTermsForReview) {
                        setTermsToReview(suggestedTermsForReview[direction])
                    }
                    break;
                default:
                    break;
            }
        }
    }, [list, setTermsToReview, suggestedTermsForReview])

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
        setFilter
    } as const;

}

export default useList