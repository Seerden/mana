import { User, UserInput } from "gql/codegen-output";
import request from "graphql-request";
import { useMutation } from "react-query";
import { loginMutation } from "../operations/user-operations";

type UseMutateOptions = {
	onSuccess?: (...args: any) => any;
	onError?: (...args: any) => any;
};

export function useMutateLogin(options?: UseMutateOptions) {
	return useMutation<User, any, UserInput>(
		"login",
		async (userInput) => {
			if ([userInput.username, userInput.password].some((x) => !x.length)) {
				// TODO: probably want to return an 'error'/message here.
				return;
			}

			return request(process.env.GRAPHQL_URI, loginMutation, userInput);
		},
		{
			retry: false,
			onError: (error) => options?.onError(error),
			onSuccess: (user) => options?.onSuccess(user),
		}
	);
}
