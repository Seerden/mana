import { gql } from "graphql-request";

export const deleteTermsMutation = gql`
	mutation ($listId: String!, $remainingTermIds: [String!], $ids: [String!]!) {
		deleteTermsFromList(listId: $listId, remainingTermIds: $remainingTermIds, ids: $ids) {
			success
			error
		}
	}
`;

export const editTermMutation = gql`
	mutation ($updateObj: [TermEditObject!]!) {
		editTerms(updateObj: $updateObj)
	}
`;
