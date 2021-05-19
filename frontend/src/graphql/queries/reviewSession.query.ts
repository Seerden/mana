import request, { gql } from "graphql-request";
import { MaybeReviewSession, ReviewSessionBaseInput, TermUpdateObject } from "graphql/codegen-output";
import { useMutation } from "react-query";

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