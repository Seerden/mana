import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";
import { User } from "../../codegen-output";
import { userPropsFragment } from "../../fragments/user-fragments";

const queryMeMutation = gql`
	${userPropsFragment}
	query {
		me {
			...UserProps
		}
	}
`;

const queryMeRequest = async () => (await requestClient.request(queryMeMutation)).me;

type Options = {
	onSuccess?: (user: User) => void;
};

export function useQueryMe(options: Options) {
	return useQuery<User>(["me"], async () => queryMeRequest(), {
		retry: false,
		onSuccess: (user) => options.onSuccess?.(user),
	});
}
