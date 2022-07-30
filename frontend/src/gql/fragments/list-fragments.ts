import { gql } from "graphql-request";
import { termPropsFragment } from "./term-fragments";

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

export const listWithTermsFragment = gql`
	${listPropsFragment}
	${termPropsFragment}

	fragment FListWithTerms on List {
		...ListProps
		terms(populate: true) {
			...TermProps
		}
	}
`;
