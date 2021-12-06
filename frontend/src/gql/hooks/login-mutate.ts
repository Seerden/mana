import { MaybeUser } from "gql/codegen-output";
import request, { gql } from "graphql-request";
import { useMutation } from "react-query";

export type UserWithPassword = {
	username?: string;
	password?: string;
};

export function useMutateLogin() {
	return useMutation<MaybeUser, any, UserWithPassword>(
		"login",
		async (user) => {
			const { login } = await request(
				process.env.GRAPHQL_URI,
				gql`
                    mutation {
                        login(username: "${user?.username}", password: "${user?.password}") {
                            error 
                            user {
                                username
                                _id
                            }
                        }
                    }
                `
			);

			return login;
		},
		{ retry: false }
	);
}
