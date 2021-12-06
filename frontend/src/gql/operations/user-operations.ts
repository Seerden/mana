import { gql } from "graphql-request";

export const registerUserMutation = gql`
mutation ($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
        error 
        user {
            username
        }
    }
}
`