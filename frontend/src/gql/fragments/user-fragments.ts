import { gql } from "graphql-request";

export const userPropsFragment = gql`
	fragment UserProps on User {
		user_id
		username
		created_at
	}
`;
