import request, { gql } from "graphql-request";
import { Maybe, MaybeReviewSession, ReviewSession, ReviewSessionBaseInput, TermUpdateObject } from "graphql/codegen-output";
import { useRouteProps } from "hooks/routerHooks";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

const createReviewSessionMutation = gql`
mutation ($newReviewSession: ReviewSessionBaseInput!, $termUpdateArray: [TermUpdateObject!]!) {
    createReviewSession(newReviewSession: $newReviewSession, termUpdateArray: $termUpdateArray) {
        error
        savedReviewSession {
            _id
        }
    }
}
`

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

const ReviewSessionCoreFields = gql`
    fragment ReviewSessionCoreFields on ReviewSession {
        owner
        listIds {
            _id
        }
        date {
            start
            end
        }
        terms {
            listId
            termIds
        }
        settings {
            direction
            n
            sessionStart
            sessionEnd
        }
        passfail
        timePerCard
    }
`

const reviewSessionsByUserQuery = gql`
${ReviewSessionCoreFields}
query ($owner: String!) {
    reviewSessionsByUser(owner: $owner) {
        ...ReviewSessionCoreFields
    }
}
`

type Owner = string

export function useQueryReviewSessionsByUser() {
    const { params } = useRouteProps();
    const [owner, setOwner] = useState(params.username);

    const { data, refetch, ...rest } = useQuery<[ReviewSession] | null>(['reviewSessionsByUser', owner], async () => {
        // @ts-ignore
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, reviewSessionsByUserQuery, { owner }) ;
        return response.reviewSessionsByUser;
    }, { enabled: false, retry: false, refetchOnMount: false, refetchOnWindowFocus: false });

    return [{ data, refetch, ...rest }, setOwner] as const;

}