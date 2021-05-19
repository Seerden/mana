import { useMutation, useQuery } from "react-query";
import { gql, request} from 'graphql-request';
import { List, MaybeList, NewListFromClientInput } from "graphql/codegen-output";
import { useEffect } from "react";

const listByIdQuery = (ids: [String]) => gql`
${CoreListFields}
${CoreTermFields}
${CoreTermIdFields}
query {
    listsById(ids: ${JSON.stringify(ids)}) {
        ...CoreListFields
        terms(populate:true) {
            ...CoreTermFields
            ...CoreTermIdFields
        }

    }
}
`

const CoreTermIdFields = gql`
fragment CoreTermIdFields on TermId {
    ...on TermId {
        _id
    }
}
`

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
`

const CoreListFields = gql`
    fragment CoreListFields on List {
        _id
        owner
        name
        to
        from
    }
`

export function useQueryListsById(ids: [String]) {
    const { 
        data, 
        refetch, 
        isLoading, 
        isFetching, 
        ...rest 
    } = useQuery<[List]>("listsById", async () => {
        const { listsById } = await request(process.env.REACT_APP_GRAPHQL_URI!, listByIdQuery(ids));
        return listsById
    }, {
        retry: false
    });

    return { data, isLoading, isFetching, ...rest} as const;
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
    const { mutate, data, ...rest } = useMutation("deleteList", async () => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, deleteListMutation(id));
        return response;
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