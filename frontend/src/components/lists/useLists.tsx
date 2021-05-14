import React, { useEffect, useState, useCallback, useMemo } from "react";
import ListsItem from './ListsItem';
import { handleError, handleResponse } from 'helpers/apiHandlers/apiHandlers';
import { useRequest } from "hooks/useRequest";
import { useRouteProps } from 'hooks/routerHooks'
import { getLists } from "helpers/apiHandlers/listHandlers";
import { UseListsReturn } from './lists.types';
import { gql, request } from 'graphql-request';
import { useQuery } from "react-query";

const useLists = (): UseListsReturn => {
    const [filter, setFilter] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name');  // @todo: refine type
    // const { response: lists, setRequest }: { response: List[], setRequest: React.Dispatch<any> } = useRequest({ handleError, handleResponse });
    const { params } = useRouteProps();

    // useEffect(() => {  // request Lists on mount
    //     typeof setRequest === 'function' && setRequest(() => getLists(params.username))
    // }, [])

    const uri = "http://localhost:5000/graphql";


    const { isFetching, data: lists } = useQuery("listsByUser", async () => {
        const { listsByUser } = await request(uri, gql`
            query {
                listsByUser(owner: "seerden") {
                        _id
                        owner
                        name
                        terms(populate:false) {
                            ...on TermId {
                                _id
                            }
                        }
                    }
                }

        `);

        return listsByUser;
    })

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        let val = e.currentTarget.value;
        setFilter(val.length > 0 ? val : '');
    }, [setFilter])

    const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSortBy(e.currentTarget.value);
    }, [setSortBy])

    const makeListsElement = useCallback((lists: Array<List> | undefined) => {
        if (lists && Array.isArray(lists)) {
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
    }, [lists, isFetching])

    const listsElement = useMemo(() => { if (Array.isArray(lists)) return makeListsElement(lists) }, [lists]);

    const makeFilteredListsElement = useCallback(() => {
        if (listsElement) {
            return listsElement
                .filter(l => l.name.toLowerCase().includes(filter.toLowerCase()))
                .sort((first, second) => first[sortBy] < second[sortBy] ? -1 : 1)  // TODO: sort by lowercase, sort out undefined cases (lastReviewed may be undefined)
                .map(l => l.element)
        }
        return []
    }, [listsElement, filter, sortBy])

    const filteredListsElement = useMemo(() => Array.isArray(lists) ? makeFilteredListsElement() : [], [listsElement, filter, sortBy])

    return { lists, filteredListsElement, handleFilterChange, handleSelectChange, filter, sortBy };
}

export default useLists