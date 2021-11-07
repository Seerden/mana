import { gql } from "graphql-request";

export const ReviewSessionCoreFields = gql`
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