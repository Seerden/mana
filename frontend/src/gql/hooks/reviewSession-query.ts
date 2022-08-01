import { useMutation, useQuery } from "@tanstack/react-query";
import {
	MaybeReviewSession,
	ReviewSession,
	ReviewSessionBaseInput,
	TermUpdateObject,
} from "gql/codegen-output";
import {
	createReviewSessionMutation,
	reviewSessionsByUserQuery,
} from "gql/operations/reviewSession-operations";
import request from "graphql-request";
import useRouteProps from "hooks/useRouteProps";
import { useState } from "react";

type ReviewSessionVariables = {
	newReviewSession: ReviewSessionBaseInput;
	termUpdateArray: TermUpdateObject[];
};

const uri = process.env.GRAPHQL_URI;

export function useCreateReviewSessionMutation() {
	const { mutate, data, ...rest } = useMutation<
		MaybeReviewSession,
		any,
		ReviewSessionVariables
	>(["createReviewSession"], async ({ newReviewSession, termUpdateArray }) => {
		const response = await request(uri, createReviewSessionMutation, {
			newReviewSession,
			termUpdateArray,
		});
		return response;
	});

	return { mutate, data, ...rest };
}

export function useQueryReviewSessionsByUser() {
	const { params } = useRouteProps();
	const [owner, setOwner] = useState(params.username);

	const { data, refetch, ...rest } = useQuery<[ReviewSession] | null>(
		["reviewSessionsByUser", owner],
		async () => {
			const response = await request(uri, reviewSessionsByUserQuery, { owner });
			return response.reviewSessionsByUser;
		},
		{ enabled: true, retry: false, refetchOnMount: true, refetchOnWindowFocus: false }
	);

	return [{ data, refetch, ...rest }, setOwner] as const;
}
