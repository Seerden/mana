import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { getList, putList, deleteList, deleteTerm } from 'helpers/apiHandlers/listHandlers';
import { useRouteProps } from 'hooks/routerHooks';
import { useRequest } from 'hooks/useRequest';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';
import { selectingTermsToReviewState, listState } from 'recoil/atoms/listAtoms';
import ListTerm from './ListTerm';
import { termsToReviewState } from "recoil/atoms/reviewAtoms";
import { suggestTermsForReview } from "helpers/srs/saturation";
import { FilterInterface, TermPropsInterface, TruncatedTerm } from './list.types';

function useList() {
    const [list, setList] = useState<List | null>(null);
    const [filter, setFilter] = useState<FilterInterface>({ saturation: { level: null, direction: 'any' } });
    const [truncatedTerms, setTruncatedTerms] = useState<Array<TruncatedTerm>>([]);
    const { params } = useRouteProps();
    const { response: getResponse, setRequest: setGetRequest } = useRequest({});
    const { setRequest: setPutRequest } = useRequest({});
    const { setRequest: setPutListTitleRequest } = useRequest({});
    const { response: deleteResponse, setRequest: setDeleteRequest } = useRequest({});
    const { setRequest: setTermDeleteRequest } = useRequest({});
    const [selectingTerms, setSelectingTerms] = useRecoilState(selectingTermsToReviewState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const setListAtom = useSetRecoilState(listState);
    const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const suggestedTermsForReview = useMemo(() => {
        if (list) {
            return suggestTermsForReview(list.terms)
        }
    }, [list]);

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
    }, [truncatedTerms, filter, numTermsToReview]);

    // EFFECTS
    useEffect(() => {  // retrieve list on component load
        setGetRequest(() => getList(params.username, { _id: params.id }))
    }, [])

    useEffect(() => {  // set list and list context when list is returned from API
        if (getResponse) {
            console.log(getResponse);
            setList(getResponse);
            setListAtom(getResponse);
        }
    }, [getResponse])

    useEffect(() => {
        if (list) {
            extractTermsFromListAsTruncatedTerms(list);
        }
    }, [list])

    // FUNCTIONS
    const extractTermsFromListAsTruncatedTerms = useCallback((list: List) => {
        if (list && list.terms && list.terms?.length > 0) {
            const newTruncatedTerms = list.terms.map((term, idx) => {
                let termProps: TermPropsInterface = {
                    handleTermDelete,
                    key: `term-${term._id}`,
                    idx: idx,
                    term
                };

                return ({
                    term: term,
                    saturation: term.saturation,
                    element: <ListTerm {...termProps} />
                })

            })

            setTruncatedTerms(newTruncatedTerms);
        }
    }, [setTruncatedTerms, list])

    function handleListTitleBlur(e) {
        e.persist();

        if (list && list.terms?.length > 0) {
            let updatedList: List = { ...list, name: e.currentTarget.innerText }
            if (updatedList.terms && updatedList.terms.length > 0) {
                setList(updatedList);
                setPutListTitleRequest(() => putList(params.username, { _id: params.id }, { ...updatedList, terms: updatedList.terms?.map(t => t._id) }))
            }
        }
    }

    function handleTermDelete(idx: number) {
        if (list) {
            const updatedList: List = { ...list, terms: [...list.terms] };  // need to spread the .terms property since otherwise it's not a (deep?/shallow?) copy
            const termId = updatedList.terms[idx]._id;
            updatedList.terms.splice(idx, 1);
            setList(updatedList);
            setListAtom(updatedList)
            setPutRequest(() => putList(params.username, { _id: updatedList._id, owner: updatedList.owner }, updatedList));
            setTermDeleteRequest(() => deleteTerm(params.username, termId))
        }
    };

    /**
     * Trigger the API to DELETE the entire list
     */
    function handleDelete() {
        setDeleteRequest(() => deleteList(params.username, { _id: params.id }))
    };

    const updateTermsToReview = useCallback(({ type, direction }: { type: 'all' | 'visible' | 'none' | 'overdue', direction: Direction}) => {
        if (list) {
            switch (type) {
                case 'all':
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
        deleteResponse,
        handleListTitleBlur,
        handleDelete,
        updateTermsToReview,
        setSelectingTerms,
        setFilter
    } as const;

}

export default useList