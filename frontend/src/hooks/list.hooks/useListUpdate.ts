import { List } from "gql/codegen-output";
import { useMutateDeleteList, useMutateUpdateList } from "gql/hooks/list.mutation";
import { DeleteTermsVariables, useMutateDeleteTerms } from "gql/hooks/term.query";
import { useRouteProps } from "hooks/routerHooks";
import { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { listState } from "state/atoms/listAtoms";

export function useListUpdate(list, setList) {
    const setListAtom = useSetRecoilState(listState);
    const { params, navigate } = useRouteProps();
    const { mutate: mutateUpdateList } = useMutateUpdateList();
    const { mutate: mutateDeleteTerms } = useMutateDeleteTerms();
    const { mutate: mutateDeleteList, data: listDeleteResponse } = useMutateDeleteList(
        params.id
    );

    useEffect(() => {
        if (listDeleteResponse?.success) {
            navigate(`/u/${params.username}/lists`, { replace: true });
        }
    }, [listDeleteResponse]);

    const handleListTitleBlur = useCallback(
        (e) => {
            e.persist();

            if (list?.terms?.length > 0) {
                if (!e.currentTarget.innerText) {
                    e.currentTarget.innerText = list.name;
                }

                if (
                    e.currentTarget.innerText &&
                    e.currentTarget.innerText !== list.name
                ) {
                    const updatedList: List = { ...list, name: e.currentTarget.innerText };
                    if (updatedList.terms?.length > 0) {
                        setList(updatedList);

                        mutateUpdateList({
                            listId: params.id,
                            action: { type: "name" },
                            payload: { name: e.currentTarget.innerText },
                        });
                    }
                }
            }
        },
        [list, setList]
    );

    function handleTermDelete(idx: number) {
        if (list?.terms?.length > 0) {
            const updatedList: List = { ...list, terms: [...list.terms] }; // need to spread the .terms property since otherwise it's not a (deep?/shallow?) copy

            if (updatedList?.terms) {
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
        mutateDeleteList();
    }

    return { handleTermDelete, handleListTitleBlur, handleDelete } as const;
}
