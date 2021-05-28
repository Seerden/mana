import { gql } from "graphql-request";
import { CoreListFields, CoreTermFields } from "graphql/fragments/list.fragments";

export const updateListMutation = gql`
mutation ($listId: String!, $action: ListUpdateActionInput!, $payload: ListUpdatePayloadInput!) {
    updateList(listId: $listId, action: $action, payload: $payload) {
        list {
            name
        }
        error
    }
}
`
export const createListMutation = gql`
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

export const listsByIdQuery = gql`
${CoreListFields}
${CoreTermFields}
query ($ids: [String!]!) {
    listsById(ids: $ids) {
        ...CoreListFields
        terms(populate:true) {
            ...CoreTermFields
        }

    }
}
`;

export const deleteListMutation = gql`
mutation ($id: String!) {
    deleteList(listId: $id) {
        error
        success
    }
}
`;