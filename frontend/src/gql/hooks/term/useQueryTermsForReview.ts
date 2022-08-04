import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { makeReviewList } from "../../../components/review/helpers/review-helpers";
import requestClient from "../../../helpers/request-client";
import {
	Query,
	ReviewParamsInput,
	ReviewSessionWithoutUserIdInput,
} from "../../codegen-output";
import { termPropsFragment } from "../../fragments/term-fragments";

const termsForReviewQuery = gql`
	${termPropsFragment}
	query ($reviewParams: ReviewParamsInput!) {
		queryTermsForReview(reviewParams: $reviewParams) {
			...TermProps
		}
	}
`;

const termsForReviewRequest = async (params: ReviewParamsInput) =>
	(await requestClient.request(termsForReviewQuery, { reviewParams: params }))
		.queryTermsForReview;

export default function useQueryTermsForReview(
	{ n }: Partial<ReviewSessionWithoutUserIdInput>,
	params: ReviewParamsInput
) {
	return useQuery<Query["queryTermsForReview"]>(
		["termsForReview"],
		async () => termsForReviewRequest(params),
		{
			enabled: false,
			select: (terms) => makeReviewList(terms, n),
		}
	);
}
