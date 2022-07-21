import { gql } from "graphql-request";

/** Most common list props. */
export const listPropsFragment = gql`
	fragment ListProps on List {
		user_id
		list_id
		created_at
		from_language
		to_language
		name
		last_reviewed
	}
`;
