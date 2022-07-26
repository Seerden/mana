import { gql } from "graphql-request";

/**
 * Most common term props.
 * @note term.history and term.saturation are not populated by default
 */
export const termPropsFragment = gql`
	fragment TermProps on Term {
		term_id
		from_language
		to_language
		to_value
		from_value
	}
`;
