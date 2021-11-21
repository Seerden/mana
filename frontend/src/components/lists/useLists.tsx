import React, { useState, useCallback, useMemo } from "react";
import ListsItem from "./ListsItem";
import { useRouteProps } from "hooks/routerHooks";
import { UseListsReturn } from "../../types/lists.types";
import { gql, request } from "graphql-request";
import { useQuery } from "react-query";
import { List } from "gql/codegen-output";

const useLists = (): UseListsReturn => {
	const [filter, setFilter] = useState<string>("");
	const [sortBy, setSortBy] = useState<string>("name"); // @todo: refine type
	const { params } = useRouteProps();

	const { isFetching, data: lists } = useQuery("listsByUser", async () => {
		const { listsByUser } = await request(
			process.env.GRAPHQL_URI,
			gql`
            query {
                listsByUser(owner: "${params.username}") {
                    _id
                    owner
                    name
                    from
                    to
                    reviewDates {
                        forwards,
                        backwards
                    }
                    sessions {
                        _id
                    }
                    terms(populate: false) {
                        _id
                    }
                }
            }
        `
		);

		return listsByUser;
	});

	const handleFilterChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>): void => {
			const { value } = e.currentTarget;
			const newValue = value.length ? value : "";
			setFilter(newValue);
		},
		[setFilter]
	);

	const handleSelectChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>): void => {
			setSortBy(e.currentTarget.value);
		},
		[setSortBy]
	);

	const makeListsElement = useCallback(
		(lists: Array<List> | undefined) => {
			if (lists && Array.isArray(lists)) {
				return lists.map((list) => {
					const { name, reviewDates, lastReviewed, created, _id } = list;
					return {
						name,
						reviewDates,
						lastReviewed,
						created,
						element: <ListsItem key={_id} list={list} />,
					};
				});
			}
		},
		[lists, isFetching]
	);

	const listsElement = useMemo(() => {
		if (Array.isArray(lists)) return makeListsElement(lists);
	}, [lists]);

	const makeFilteredListsElement = useCallback(() => {
		if (listsElement) {
			return listsElement
				.filter((l) => l.name.toLowerCase().includes(filter.toLowerCase()))
				.sort((first, second) => (first[sortBy] < second[sortBy] ? -1 : 1)) // TODO: sort by lowercase, sort out undefined cases (lastReviewed may be undefined)
				.map((l) => l.element);
		}
		return [];
	}, [listsElement, filter, sortBy]);

	const filteredListsElement = useMemo(
		() => (Array.isArray(lists) ? makeFilteredListsElement() : []),
		[listsElement, filter, sortBy]
	);

	return {
		lists,
		filteredListsElement,
		handleFilterChange,
		handleSelectChange,
		filter,
		sortBy,
	};
};

export default useLists;
