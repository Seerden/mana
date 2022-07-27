import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";
import { Message } from "../../codegen-output";

const logoutMutation = gql`
	mutation {
		logout {
			message
		}
	}
`;

const logoutRequest = async () => (await requestClient.request(logoutMutation)).logout;

export default function useLogout() {
	return useMutation<Message>(["logout"], async () => logoutRequest(), {
		retry: false,
	});
}
