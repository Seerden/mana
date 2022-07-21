import { listState } from "components/list/state/listAtoms";
import { List } from "gql/codegen-output";
import { DeleteTermsVariables, useMutateDeleteTerms } from "gql/hooks/term-query";
import useRouteProps from "hooks/useRouteProps";
import { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useMutateDeleteList } from "../../../gql/hooks/list/useDeleteList";
import { useMutateUpdateList } from "../../../gql/hooks/list/useUpdateList";

export function useListUpdate(list, setList) {
	const setListAtom = useSetRecoilState(listState);
	const { params, navigate } = useRouteProps();
	const { mutate: mutateUpdateList } = useMutateUpdateList();
	const { mutate: mutateDeleteTerms } = useMutateDeleteTerms();
	const { mutate: mutateDeleteList, data: deletedList } = useMutateDeleteList();

	useEffect(() => {
		if (deletedList?.list.list_id) {
			navigate(`/u/${params.username}/lists`, { replace: true });
		}
	}, [deletedList]);

	const handleListTitleBlur = useCallback(
		(e) => {
			e.persist();
			const { innerText } = e.currentTarget;

			if (list?.terms?.length > 0) {
				if (!innerText) {
					// change e.currentTarget in DOM without React's knowing so
					e.currentTarget.innerText = list.name;
				}

				if (innerText && innerText !== list.name) {
					const updatedList: List = { ...list, name: innerText };
					if (updatedList.terms?.length > 0) {
						setList(updatedList);

						mutateUpdateList({
							list_id: +params.id,
							payload: { name: innerText },
						});
					}
				}
			}
		},
		[list, setList]
	);

	function handleTermDelete(idx: number) {
		if (list?.terms.length) {
			const updatedList: List = { ...list, terms: [...list.terms] }; // need to spread the .terms property since otherwise it's not a (deep?/shallow?) copy

			if (updatedList.terms) {
				const termId = updatedList.terms[idx]._id;
				updatedList.terms.splice(idx, 1);
				setList(updatedList);
				setListAtom(updatedList);

				const variables: DeleteTermsVariables = {
					listId: params.id,
					ids: [termId],
					remainingTermIds: updatedList.terms.map((term) => term._id),
				};

				mutateDeleteTerms(variables);
			}
		}
	}

	/**
	 * Trigger the API to DELETE the entire list
	 */
	function handleDelete() {
		mutateDeleteList(+params.id);
	}

	return { handleTermDelete, handleListTitleBlur, handleDelete } as const;
}
