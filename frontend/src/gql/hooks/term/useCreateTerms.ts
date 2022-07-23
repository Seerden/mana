import { Term, TermWithoutIdInput } from "gql/codegen-output";
import request, { gql } from "graphql-request";
import { uri } from "helpers/graphql-uri";
import { useMutation } from "react-query";

const createTermsMutation = gql`
	mutation ($terms: [TermWithoutIdInput!]!) {
		createTerms(terms: $terms) {
			...TermProps
		}
	}
`;

const createTermsRequest = async (terms: TermWithoutIdInput[]) =>
	request(uri, createTermsMutation, { terms });

/** useMutation hook to create new Term rows for an existing list. */
export function useCreateTerms() {
	return useMutation<Term[], any, TermWithoutIdInput[]>(
		"createTerms",
		(terms) => createTermsRequest(terms),
		{ retry: false }
	);
}
