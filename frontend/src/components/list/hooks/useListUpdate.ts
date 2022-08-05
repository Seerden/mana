import { useQueryClient } from "@tanstack/react-query";
import useRouteProps from "hooks/useRouteProps";
import { FocusEventHandler, useCallback } from "react";
import { useMutateDeleteList } from "../../../gql/hooks/list/useDeleteList";
import { useQueryListsById } from "../../../gql/hooks/list/useQueryLists";
import { useMutateUpdateList } from "../../../gql/hooks/list/useUpdateList";

// TODO: type these arguments
export function useListUpdate() {
	const client = useQueryClient();
	const { params, navigate } = useRouteProps();

	const list_id = +params.id;
	const { data: lists } = useQueryListsById([list_id]);
	const list = lists?.[0];

	const { mutate: mutateUpdateList } = useMutateUpdateList();
	const { mutate: mutateDeleteList } = useMutateDeleteList();

	const handleListTitleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			// Optimistically change list title, but don't submit it yet.{
			client.setQueryData(["listsById", list_id], () => [
				{
					...list,
					name: e.currentTarget.value,
				},
			]);
		},
		[list]
	);

	const handleListTitleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
		(e) => {
			e.persist();

			if (!e.currentTarget.value) {
				// change e.currentTarget in DOM without React's knowing so
				// TODO: instead of doing it like this, do
				// client.setQueryData(['list', list_id], () => ({...list})) to
				// force-update cache. If the title HTML element renders {list.name}
				// then it should update properly
				e.currentTarget.value = list.name;
			}

			const { value } = e.currentTarget;

			if (!value) return;

			mutateUpdateList(
				{
					list_id: +params.id,
					payload: { name: value },
				},
				{
					onSuccess: (updatedList) => {
						client.setQueryData(["listsById", list_id], () => [
							{
								...updatedList,
							},
						]);
					},
				}
			);
		},
		[list]
	);

	/** Sends the mutation to delete the list and its terms entirely. */
	// TODO: rename ->handleListDelete
	function handleDelete() {
		mutateDeleteList(+params.id, {
			onSuccess: ({ list }) => {
				if (list?.list_id) {
					navigate(`/u/${params.username}/lists`, { replace: true });
				}
			},
		});
	}

	return { handleListTitleBlur, handleDelete, handleListTitleChange } as const;
}
