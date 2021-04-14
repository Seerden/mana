import React, { useState, useCallback, useMemo } from "react";
import ListsItem from './ListsItem';
import { handleError, handleResponse } from 'helpers/apiHandlers/apiHandlers';
import { useRequest } from "hooks/useRequest";

interface UseListsProps {
    handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>,
    handleFilterChange: React.ChangeEventHandler<HTMLInputElement>,
}

type UseListsReturn = {
    lists: any,    
    filteredListsElement: Array<typeof ListsItem>,
    handleFilterChange: UseListsProps['handleFilterChange'],
    handleSelectChange: UseListsProps['handleSelectChange'],
    setRequest: Function | null | undefined,
    filter: string,
    sortBy: string
};

const useLists = (): UseListsReturn => {
    const [filter, setFilter] = useState<string>(''),
    [sortBy, setSortBy] = useState<string>('name'),  // @todo: refine type
    { response: lists, setRequest } = useRequest({ handleError, handleResponse }),
    listsElement = useMemo(() => { if (lists) return makeListsElement(lists) }, [lists]);        

    const handleFilterChange = useCallback((e) => {
        let val = e.currentTarget.value;
        setFilter(val.length > 0 ? val : '');
    }, [setFilter])

    const handleSelectChange = useCallback((e) => {
        setSortBy(e.currentTarget.value);
    }, [setSortBy])


    interface ListsElement {
        name: string,
        state: {forwards: string | null, backwards: string | null},
        lastReviewed: Date | null,        
        created: Date,
        element: typeof ListsItem
    }

    function makeListsElement(lists): ListsElement[] {
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
    }

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

    return {lists, filteredListsElement, handleFilterChange, handleSelectChange, setRequest, filter, sortBy};
}

export default useLists