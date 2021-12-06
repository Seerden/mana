import { useQueryListsByUser } from "gql/hooks/lists-query";
import React, { useCallback, useMemo, useState } from "react";
import { UseListsReturn } from "../../types/lists.types";
import ListsItem from "./ListsItem";

const useLists = (): UseListsReturn => {
	const [filter, setFilter] = useState<string>("");
	const [sortBy, setSortBy] = useState<string>("name"); // @todo: refine type
	const { data: lists } = useQueryListsByUser();

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

	const listsElement = useMemo(() => {
		return (
			Array.isArray(lists) &&
			lists.map((list) => {
				const { name, reviewDates, lastReviewed, created, _id } = list;
				return {
					name,
					reviewDates,
					lastReviewed,
					created,
					element: <ListsItem key={_id} list={list} />,
				};
			})
		);
	}, [lists]);

	const filteredListsElement = useMemo(() => {
		if (!Array.isArray(listsElement)) return [];

		return listsElement
			.filter((l) => l.name.toLowerCase().includes(filter.toLowerCase()))
			.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1)) // TODO: sort by lowercase, sort out undefined cases (lastReviewed may be undefined)
			.map((l) => l.element);
	}, [listsElement, filter, sortBy]);

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
