import { useMutation } from "@tanstack/react-query";
import { Term, TermWithoutIdInput } from "gql/codegen-output";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";

const createTermsMutation = gql`
	mutation ($terms: [TermWithoutIdInput!]!) {
		createTerms(terms: $terms) {
			...TermProps
		}
	}
`;

const createTermsRequest = async (terms: TermWithoutIdInput[]) =>
	(await requestClient.request(createTermsMutation, { terms })).createTerms;

/** useMutation hook to create new Term rows for an existing list. */
export function useCreateTerms() {
	return useMutation<Term[], any, TermWithoutIdInput[]>(
		["createTerms"],
		(terms) => createTermsRequest(terms),
		{ retry: false }
	);
}
