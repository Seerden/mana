import { useMutation, useQuery } from "react-query";
import { request} from 'graphql-request';
import { List, ListUpdateActionInput, ListUpdatePayloadInput, MaybeList, NewListFromClientInput, SuccessOrError } from "graphql/codegen-output";
import { createListMutation, deleteListMutation, listsByIdQuery, updateListMutation } from "graphql/operations/list.operations";

export function useQueryListsById(ids: [String]) {
    const { data, refetch, isLoading, isFetching, ...rest } = useQuery<[List]>("listsById", async () => {
        const { listsById } = await request(process.env.REACT_APP_GRAPHQL_URI!, listsByIdQuery, { ids });
        return listsById
    }, {
        enabled: false,
        retry: false,
        // cacheTime: 30*1000  // 30 s
    });
    return { data, refetch, isLoading, isFetching, ...rest};
};

export function useMutateDeleteList (id: string) {
    const { mutate, data, ...rest } = useMutation<SuccessOrError, any, void>("deleteList", async () => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, deleteListMutation, { id });
        return response.deleteList;
    }, { retry: false });
    return { mutate, data, ...rest }
};

export function useMutateCreateList() {
    const { mutate, data, ...rest } = useMutation<MaybeList, any, NewListFromClientInput>("createList", async (newList) => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, createListMutation, {
            newList
        });
        return response;
    }, { retry: false })
    return { mutate, data, ...rest }
}   

type UpdateListVariables = {
    listId: string,
    action: ListUpdateActionInput,
    payload: ListUpdatePayloadInput
}

export function useMutateUpdateList() {
    const { mutate, data, ...rest } = useMutation<MaybeList, any, UpdateListVariables>("updateList", async ({ listId, action, payload }) => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, updateListMutation, {
            listId, 
            action,
            payload
        });
        return response;
    }, { retry: false });
    return { mutate, data, ...rest }
}