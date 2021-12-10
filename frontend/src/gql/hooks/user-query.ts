import { MaybeUser } from "gql/codegen-output";
import { registerUserMutation } from "gql/operations/user-operations";
import request from "graphql-request";
import { useMutation } from "react-query";

const uri = process.env.GRAPHQL_URI;

export function useMutateRegisterUser() {
    return useMutation<{ createUser: MaybeUser }, any, NewUser>(
        "registerUser",
        async ({ username, password }) => {
            const response = await request(uri, registerUserMutation, {
                username,
                password,
            });

            return response;
        }
    );
}
