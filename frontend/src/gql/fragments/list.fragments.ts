import { gql } from "graphql-request";

export const CoreTermFields = gql`
fragment CoreTermFields on Term {
    ...on Term {
        _id
        from
        to
        languages {
            from
            to
        }
        history {
            date
            content
            direction
        }
        saturation {
            forwards
            backwards
        }
    }
}
`;

export const CoreListFields = gql`
    fragment CoreListFields on List {
        _id
        owner
        name
        to
        from
        reviewDates {
            forwards
            backwards
        }
        sessions {
            _id
        }
    }
`;