import request, { gql } from "graphql-request";
import { MaybeUser } from "graphql/codegen-output";
import { useMutation } from "react-query";

const registerUserMutation = gql`
mutation ($username: String!, $password: String!) {
    error 
    user {
        username
    }
}
`

export function useMutateRegisterUser() {
    const mutationResponse = useMutation<MaybeUser, any, NewUser>("registerUser", async ({ username, password }) => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, registerUserMutation, {
            username,
            password
        });

        return response;
    });

    return mutationResponse;
}