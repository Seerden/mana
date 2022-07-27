import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";
import { User, UserInput } from "../../codegen-output";

export const loginMutation = gql`
	mutation ($password: String!, $username: String!) {
		login(password: $password, username: $username) {
			user_id
			username
			created_at
		}
	}
`;

const loginRequest = async (userInput: UserInput) =>
	(await requestClient.request(loginMutation, userInput)).login;

type UseMutateOptions = {
	onSuccess?: (...args: any) => any;
	onError?: (...args: any) => any;
};

export function useMutateLogin(options?: UseMutateOptions) {
	return useMutation<User, any, UserInput>(
		["login"],
		async (userInput) => {
			if ([userInput.username, userInput.password].some((x) => !x.length)) {
				// TODO: probably want to return an 'error'/message here.
				return;
			}

			return loginRequest(userInput);
		},
		{
			retry: false,
			onError: (error) => options?.onError(error),
			onSuccess: (user) => options?.onSuccess(user),
		}
	);
}
