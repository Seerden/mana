import { ReviewSessionCoreFields } from "gql/fragments/reviewSession.fragments";
import { gql } from "graphql-request";

export const createReviewSessionMutation = gql`
	mutation (
		$newReviewSession: ReviewSessionBaseInput!
		$termUpdateArray: [TermUpdateObject!]!
	) {
		createReviewSession(
			newReviewSession: $newReviewSession
			termUpdateArray: $termUpdateArray
		) {
			error
			savedReviewSession {
				_id
			}
		}
	}
`;

export const reviewSessionsByUserQuery = gql`
	${ReviewSessionCoreFields}
	query ($owner: String!) {
		reviewSessionsByUser(owner: $owner) {
			...ReviewSessionCoreFields
		}
	}
`;
