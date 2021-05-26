import { useMutation, useQuery } from "react-query";
import { gql, request} from 'graphql-request';
import { List, ListUpdateActionInput, ListUpdatePayloadInput, MaybeList, NewListFromClientInput, SuccessOrError } from "graphql/codegen-output";

const CoreTermIdFields = gql`
fragment CoreTermIdFields on TermId {
    ...on TermId {
        _id
    }
}
`;

const CoreTermFields = gql`
fragment CoreTermFields on Term {
    ...on Term {
        _id
        from
        to
        languages {
            from
            to
        }
        history {
            date
            content
            direction
        }
        saturation {
            forwards
            backwards
        }
    }
}
`;

const CoreListFields = gql`
    fragment CoreListFields on List {
        _id
        owner
        name
        to
        from
        reviewDates {
            forwards
            backwards
        }
        sessions {
            _id
        }
    }
`;

const listByIdQuery = gql`
${CoreListFields}
${CoreTermFields}
${CoreTermIdFields}
query ($ids: [String!]!) {
    listsById(ids: $ids) {
        ...CoreListFields
        terms(populate:true) {
            ...CoreTermFields
            ...CoreTermIdFields
        }

    }
}
`;

export function useQueryListsById(ids: [String]) {
    const { data, refetch, isLoading, isFetching, ...rest } = useQuery<[List]>("listsById", async () => {
        const { listsById } = await request(process.env.REACT_APP_GRAPHQL_URI!, listByIdQuery, { ids });
        return listsById
    }, {
        retry: false
    });

    return { data, refetch, isLoading, isFetching, ...rest};
};

const deleteListMutation = (id: string) => gql`
mutation {
    deleteList(listId: "${id}") {
        error
        success
    }
}
`;

export function useMutateDeleteList (id: string) {
    const { mutate, data, ...rest } = useMutation<SuccessOrError, any, void>("deleteList", async () => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, deleteListMutation(id));
        return response.deleteList;
    }, { retry: false });

    return { mutate, data, ...rest }
};

const createListMutation = gql`
${CoreListFields}
mutation ($newList: NewListFromClientInput!) {
    createList(newList: $newList) {
        list {
            ...CoreListFields
        }
        error
    }
}
`;

export function useMutateCreateList() {
    const { mutate, data, ...rest } = useMutation<MaybeList, any, NewListFromClientInput>("createList", async (newList) => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, createListMutation, {
            newList
        });
        return response;
    }, { retry: false })
    return { mutate, data, ...rest }
}   

const updateListMutation = gql`
mutation ($listId: String!, $action: ListUpdateActionInput!, $payload: ListUpdatePayloadInput!) {
    updateList(listId: $listId, action: $action, payload: $payload) {
        list {
            name
        }
        error
    }
}
`

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