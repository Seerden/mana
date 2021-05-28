import request from "graphql-request";
import { MaybeReviewSession, ReviewSession, ReviewSessionBaseInput, TermUpdateObject } from "graphql/codegen-output";
import { createReviewSessionMutation, reviewSessionsByUserQuery } from "graphql/operations/reviewSession.operations";
import { useRouteProps } from "hooks/routerHooks";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

type ReviewSessionVariables = {
    newReviewSession: ReviewSessionBaseInput,
    termUpdateArray: TermUpdateObject[]
}

export function useCreateReviewSessionMutation() {
    const { mutate, data, ...rest } = useMutation<MaybeReviewSession, any, ReviewSessionVariables>("createReviewSession", async ({ newReviewSession, termUpdateArray }) => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, createReviewSessionMutation, {
            newReviewSession: newReviewSession,
            termUpdateArray: termUpdateArray
        })
        return response
    })

    return { mutate, data, ...rest };
}

export function useQueryReviewSessionsByUser() {
    const { params } = useRouteProps();
    const [owner, setOwner] = useState(params.username);

    const { data, refetch, ...rest } = useQuery<[ReviewSession] | null>(['reviewSessionsByUser', owner], async () => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, reviewSessionsByUserQuery, { owner }) ;
        return response.reviewSessionsByUser;
    }, { enabled: true, retry: false, refetchOnMount: true, refetchOnWindowFocus: false });

    return [{ data, refetch, ...rest }, setOwner] as const;

}