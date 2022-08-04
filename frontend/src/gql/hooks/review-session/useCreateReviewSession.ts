import { useMutation } from "@tanstack/react-query";
import { MutationCreateSessionArgs, ReviewSession } from "gql/codegen-output";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";

export const createReviewSessionMutation = gql`
	mutation (
		$session: ReviewSessionWithoutUserIdInput!
		$entries: [ReviewSessionEntryInput!]!
	) {
		createSession(session: $session, entries: $entries) {
			session {
				review_session_id
			}
			entries {
				review_entry_id
			}
		}
	}
`;

const createReviewSessionRequest = async (args: MutationCreateSessionArgs) => {
	return (await requestClient.request(createReviewSessionMutation, { ...args }))
		.createSession;
};

export default function useCreateReviewSession() {
	return useMutation<ReviewSession, any, MutationCreateSessionArgs>(
		["createSession"],
		async ({ session, entries }) => createReviewSessionRequest({ session, entries })
	);
}
