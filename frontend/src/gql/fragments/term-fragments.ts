import { gql } from "graphql-request";

const termSaturationPropsFragment = gql`
	fragment TermSaturationProps on TermSaturation {
		backwards
		forwards
		last_updated
		term_id
	}
`;

const termHistoryPropsFragment = gql`
	fragment TermHistoryProps on ReviewSessionEntry {
		created_at
		direction
		passfail
		review_entry_id
		review_session_id
		time_on_card
	}
`;

/**
 * Most common term props.
 * @note term.history and term.saturation are not populated by default
 */
export const termPropsFragment = gql`
	${termSaturationPropsFragment}
	${termHistoryPropsFragment}
	fragment TermProps on Term {
		list_id
		term_id
		from_language
		to_language
		to_value
		from_value

		saturation(populate: true) {
			...TermSaturationProps
		}

		history(populate: true) {
			...TermHistoryProps
		}
	}
`;
