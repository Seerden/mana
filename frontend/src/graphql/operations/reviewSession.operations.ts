import { gql } from "graphql-request"
import { ReviewSessionCoreFields } from "graphql/fragments/reviewSession.fragments"

export const createReviewSessionMutation = gql`
mutation ($newReviewSession: ReviewSessionBaseInput!, $termUpdateArray: [TermUpdateObject!]!) {
    createReviewSession(newReviewSession: $newReviewSession, termUpdateArray: $termUpdateArray) {
        error
        savedReviewSession {
            _id
        }
    }
}
`

export const reviewSessionsByUserQuery = gql`
${ReviewSessionCoreFields}
query ($owner: String!) {
    reviewSessionsByUser(owner: $owner) {
        ...ReviewSessionCoreFields
    }
}
`