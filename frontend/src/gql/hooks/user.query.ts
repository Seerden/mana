import request from "graphql-request";
import { MaybeUser } from "gql/codegen-output";
import { registerUserMutation } from "gql/operations/user.operations";
import { useMutation } from "react-query";

const uri = process.env.GRAPHQL_URI;

export function useMutateRegisterUser() {
    const mutationResponse = useMutation<MaybeUser, any, NewUser>("registerUser", async ({ username, password }) => {
        const response = await request(uri, registerUserMutation, {
            username,
            password
        });

        return response;
    });

    return mutationResponse;
}