import { Term } from "gql/codegen-output";
import request, { gql } from "graphql-request";
import { uri } from "helpers/graphql-uri";
import { useMutation } from "react-query";

const deleteTerms = gql`
	mutation ($termIds: [Int!]!) {
		deleteTerms(termIds: $termIds) {
			term_id
		}
	}
`;

const deleteTermsRequest = async (term_ids: Term["term_id"][]) =>
	request(uri, deleteTerms, { term_ids });

// TODO: implement onSuccess callback that presumably removes these terms
// from the list they belong to in (global) state.
export function useDeleteTerms() {
	return useMutation<Term[], any, Term["term_id"][]>(
		"deleteTerms",
		(term_ids) => deleteTermsRequest(term_ids),
		{
			retry: false,
		}
	);
}
