import { useMutation } from "react-query";
import { request} from 'graphql-request';
import { ErrorOrSuccess, TermEditObject } from "gql/codegen-output";
import { editTermMutation, deleteTermsMutation } from "gql/operations/term.operations";

/**
 * Variables for term deletion from list mutation
 * @property listId id of the list whose terms are being removed
 * @property remainingTermIds ids of the remaining terms in the list. 
 * @property ids ids of the terms being removed
 */
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


export function useMutateDeleteTerms() {
    const { mutate, data, ...rest } = useMutation<ErrorOrSuccess, any, DeleteTermsVariables>("deleteTerms", async (variables) => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, deleteTermsMutation, variables);
        return response
    }, { retry: false });

    return { mutate, data, ...rest };
}

