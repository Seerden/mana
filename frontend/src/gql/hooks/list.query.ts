import { useMutation, useQuery } from "react-query";
import { request} from 'graphql-request';
import { List, ListUpdateActionInput, ListUpdatePayloadInput, MaybeList, NewListFromClientInput, SuccessOrError } from "gql/codegen-output";
import { createListMutation, deleteListMutation, listsByIdQuery, updateListMutation } from "gql/operations/list.operations";

const uri = process.env.GRAPHQL_URI

export function useQueryListsById(ids: [String]) {
    const { data, refetch, isLoading, isFetching, ...rest } = useQuery<[List]>("listsById", async () => {
        const { listsById } = await request(uri, listsByIdQuery, { ids });
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
        const response = await request(uri, deleteListMutation, { id });
        return response.deleteList;
    }, { retry: false });
    return { mutate, data, ...rest }
};

export function useMutateCreateList() {
    const { mutate, data, ...rest } = useMutation<MaybeList, any, NewListFromClientInput>("createList", async (newList) => {
        const response = await request(uri, createListMutation, {
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
        const response = await request(uri, updateListMutation, {
            listId, 
            action,
            payload
        });
        return response;
    }, { retry: false });
    return { mutate, data, ...rest }
}