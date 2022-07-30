import React, { useCallback, useMemo, useState } from "react";
import useQueryListsByUser from "../../../gql/hooks/list/useQueryListsByUser";
import ListsItem from "../sub/ListsItem";

const useLists = () => {
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

	const filteredListsElement = useMemo(() => {
		return lists
			?.filter((l) => l.name.toLowerCase().includes(filter.toLowerCase()))
			.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1)) // TODO: sort by lowercase, sort out undefined cases (lastReviewed may be undefined)
			.map((l) => <ListsItem key={l.list_id} list={l} />);
	}, [lists, filter, sortBy]);

	return {
		lists,
		filteredListsElement,
		handleFilterChange,
		handleSelectChange,
		filter,
		sortBy,
	} as const;
};

export default useLists;
