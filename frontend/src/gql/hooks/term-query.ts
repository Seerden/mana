import { ErrorOrSuccess, TermEditObject } from "gql/codegen-output";
import { deleteTermsMutation, editTermMutation } from "gql/operations/term-operations";
import { request } from "graphql-request";
import { useMutation } from "react-query";

const uri = process.env.GRAPHQL_URI;

/**
 * Variables for term deletion from list mutation
 * @property listId id of the list whose terms are being removed
 * @property remainingTermIds ids of the remaining terms in the list.
 * @property ids ids of the terms being removed
 */
export type DeleteTermsVariables = {
    listId: string;
    remainingTermIds: string[];
    ids: string[];
};

export function useMutateEditTerm() {
    const { mutate, data, ...rest } = useMutation<number, any, TermEditObject>(
        "editTerm",
        async (variables) => {
            const response = await request(uri, editTermMutation, {
                updateObj: variables,
            });
            return response;
        },
        { retry: false }
    );

    return { mutate, data, ...rest };
}

export function useMutateDeleteTerms() {
    const { mutate, data, ...rest } = useMutation<
        ErrorOrSuccess,
        any,
        DeleteTermsVariables
    >(
        "deleteTerms",
        async (variables) => {
            const response = await request(uri, deleteTermsMutation, variables);
            return response;
        },
        { retry: false }
    );

    return { mutate, data, ...rest };
}
