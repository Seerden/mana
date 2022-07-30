import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";
import { User, UserInput } from "../../codegen-output";

export const createUserMutation = gql`
	mutation ($userInput: UserInput!) {
		createUser(userInput: $userInput) {
			user_id
			username
		}
	}
`;

const createUserRequest = async ({ username, password }: UserInput) => {
	const vars = {
		password,
		username,
	};

	return (await requestClient.request(createUserMutation, { userInput: vars }))
		.createUser;
};

export function useCreateUser() {
	return useMutation<User, any, UserInput>(["registerUser"], async (userInput) =>
		createUserRequest(userInput)
	);
}
