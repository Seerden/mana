import { useQueryClient } from "@tanstack/react-query";
import { List, Term } from "gql/codegen-output";
import { useDeleteTerms } from "gql/hooks/term/useDeleteTerms";
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
	const { mutate: mutateDeleteTerms } = useDeleteTerms();
	const { mutate: mutateDeleteList } = useMutateDeleteList();

	const handleListTitleBlur: FocusEventHandler<HTMLHeadingElement> = useCallback(
		(e) => {
			e.persist();

			if (!e.currentTarget.innerText) {
				// change e.currentTarget in DOM without React's knowing so
				// TODO: instead of doing it like this, do
				// client.setQueryData(['list', list_id], () => ({...list})) to
				// force-update cache. If the title HTML element renders {list.name}
				// then it should update properly
				e.currentTarget.innerText = list.name;
			}

			const { innerText } = e.currentTarget;
			if (innerText !== list.name) {
				mutateUpdateList(
					{
						list_id: +params.id,
						payload: { name: innerText },
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
			}
		},
		[list]
	);

	// TODO: instead of using idx, use the actual term_id. Requires some
	// refactoring.
	function handleTermDelete(term_id: Term["term_id"]) {
		if (!list?.terms?.length) return; // TODO: why do we do this, exactly? A list can be empty, no?

		// Optimistically update list state
		client.setQueryData(["list", term_id], (cur: List) => {
			return {
				...cur,
				terms: cur.terms.filter((term) => term.term_id !== term_id),
			};
		});

		mutateDeleteTerms([term_id]);
	}

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

	return { handleTermDelete, handleListTitleBlur, handleDelete } as const;
}
