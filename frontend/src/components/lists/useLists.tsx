import React, { useEffect, useState, useCallback, useMemo } from "react";
import ListsItem from './ListsItem';
import { handleError, handleResponse } from 'helpers/apiHandlers/apiHandlers';
import { useRequest } from "hooks/useRequest";
import { useRouteProps } from 'hooks/routerHooks'
import { getLists } from "helpers/apiHandlers/listHandlers";
import { UseListsReturn, ListsElement } from './lists.types';

const useLists = (): UseListsReturn => {
    const [filter, setFilter] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name');  // @todo: refine type
    const { response: lists, setRequest } = useRequest({ handleError, handleResponse });
    const { params } = useRouteProps();

    useEffect(() => {  // request Lists on mount
        typeof setRequest === 'function' && setRequest(() => getLists(params.username))
    }, [])

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        let val = e.currentTarget.value;
        setFilter(val.length > 0 ? val : '');
    }, [setFilter])

    const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSortBy(e.currentTarget.value);
    }, [setSortBy])

    const makeListsElement = useCallback((lists): ListsElement[] => {
        return lists.map(list => {
            const { name, state, lastReviewed, created, _id } = list;
            return {
                name,
                state,
                lastReviewed,
                created,
                element: <ListsItem key={_id} list={list} />
            }
        })
    }, [lists])

    const listsElement = useMemo(() => { if (lists) return makeListsElement(lists) }, [lists]);

    const makeFilteredListsElement = useCallback(() => {
        if (listsElement) {
            return listsElement
                .filter(l => l.name.toLowerCase().includes(filter.toLowerCase()))
                .sort((first, second) => first[sortBy] < second[sortBy] ? -1 : 1)  // TODO: sort by lowercase, sort out undefined cases (lastReviewed may be undefined)
                .map(l => l.element)
        }
        return []
    }, [listsElement, filter, sortBy])

    const filteredListsElement = useMemo(() => makeFilteredListsElement(), [listsElement, filter, sortBy])

    return { lists, filteredListsElement, handleFilterChange, handleSelectChange, setRequest, filter, sortBy };
}

export default useLists