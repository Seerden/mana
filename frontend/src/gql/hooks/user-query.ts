import { createUserMutation } from "gql/operations/user-operations";
import request from "graphql-request";
import { useMutation } from "react-query";
import { User, UserInput } from "../codegen-output";

const uri = process.env.GRAPHQL_URI;

export function useCreateUser() {
	return useMutation<User, any, UserInput>("registerUser", async (userInput) =>
		request(uri, createUserMutation, userInput)
	);
}
