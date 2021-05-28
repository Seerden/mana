import request from "graphql-request";
import { MaybeUser } from "graphql/codegen-output";
import { registerUserMutation } from "graphql/operations/user.operations";
import { useMutation } from "react-query";

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