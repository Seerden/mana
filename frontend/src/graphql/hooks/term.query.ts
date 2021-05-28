import { useMutation } from "react-query";
import { gql, request} from 'graphql-request';
import { ErrorOrSuccess, TermEditObject } from "graphql/codegen-output";

const deleteTermsMutation = gql`
mutation ($listId: String!, $remainingTermIds: [String!], $ids: [String!]!) {
    deleteTermsFromList(listId: $listId, remainingTermIds: $remainingTermIds, ids: $ids) {
        success
        error
    }
}
`

const editTermMutation = gql`
mutation ($updateObj: [TermEditObject!]!) {
    editTerms(updateObj: $updateObj) 
}
`

export type DeleteTermsVariables = {
    listId: string,
    remainingTermIds: string[],
    ids: string[]
}

export function useMutateEditTerm() {
    const { mutate, data, ...rest } = useMutation<Number, any, TermEditObject>("editTerm", async (variables) => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, editTermMutation, {updateObj: variables});
        return response;
    }, { retry: false });

    return { mutate, data, ...rest }
}

/**
 * Create useMutation query for the deletion of terms from a list.
 * @param listId id of the list whose terms are being removed
 * @param remainingTermIds ids of the remaining terms in the list. 
 * @param ids ids of the terms being removed
 */
export function useMutateDeleteTerms() {
    const { mutate, data, ...rest } = useMutation<ErrorOrSuccess, any, DeleteTermsVariables>("deleteTerms", async (variables) => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, deleteTermsMutation, variables);
        return response
    }, { retry: false });

    return { mutate, data, ...rest };
}

