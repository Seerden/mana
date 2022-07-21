import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { uri } from "../../../helpers/graphql-uri";
import { User } from "../../codegen-output";

const queryMeMutation = gql`
	query {
		me {
			user_id
			username
			created_at
		}
	}
`;

const queryMeRequest = async () => request(uri, queryMeMutation) as Promise<User>;

export function useQueryMe() {
	return useQuery("me", async () => queryMeRequest, { retry: false, enabled: false });
}
