import { useQueryClient } from "@tanstack/react-query";
import { useQueryListsById } from "gql/hooks/list/useQueryLists";
import useRouteProps from "hooks/useRouteProps";
import { useEffect } from "react";

function useList() {
	const { params } = useRouteProps();
	const client = useQueryClient();

	const { data: lists, refetch: fetchList } = useQueryListsById([+params.id], {
		onSuccess: ([list]) => {
			// TODO: check if this doesn't get called immediately.
			client.setQueryData(["listsById", +params.id], () => [list]);
		},
	});

	useEffect(() => {
		fetchList();
	}, []);

	return {
		list: lists?.[0],
	} as const;
}

export default useList;
