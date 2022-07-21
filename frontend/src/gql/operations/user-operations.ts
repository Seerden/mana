import { gql } from "graphql-request";

export const createUserMutation = gql`
	mutation ($username: String!, $password: String!) {
		createUser(username: $username, password: $password) {
			user_id
			username
		}
	}
`;

export const queryMeMutation = gql`
	query {
		me {
			user_id
			username
			created_at
		}
	}
`;

export const loginMutation = gql`
	mutation ($password: String!, $username: String!) {
		login(password: $password, username: $username) {
			user_id
			username
			created_at
		}
	}
`;
