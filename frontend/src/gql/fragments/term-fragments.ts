import { gql } from "graphql-request";

/** Most common term props. */
export const termPropsFragment = gql`
	fragment TermProps on Term {
		term_id
		from_language
		to_language
		to_value
		from_value
	}
`;
