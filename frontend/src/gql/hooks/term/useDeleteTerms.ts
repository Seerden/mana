import { Term } from "gql/codegen-output";
import { gql } from "graphql-request";
import { useMutation } from "react-query";
import requestClient from "../../../components/newlist/helpers/request-client";

const deleteTerms = gql`
	mutation ($termIds: [Int!]!) {
		deleteTerms(termIds: $termIds) {
			term_id
		}
	}
`;

const deleteTermsRequest = async (term_ids: Term["term_id"][]) =>
	(await requestClient.request(deleteTerms, { term_ids })).deleteTerms;

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
