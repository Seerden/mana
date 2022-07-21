import request, { gql } from "graphql-request";
import { useMutation } from "react-query";
import { uri } from "../../../helpers/graphql-uri";
import { User, UserInput } from "../../codegen-output";

export const createUserMutation = gql`
	mutation ($userInput: UserInput!) {
		createUser(userInput: $userInput) {
			user_id
			username
		}
	}
`;

const createUserRequest = (userInput: UserInput) =>
	request(uri, createUserMutation, userInput);

export function useCreateUser() {
	return useMutation<User, any, UserInput>("registerUser", async (userInput) =>
		createUserRequest(userInput)
	);
}
