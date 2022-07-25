import { gql } from "graphql-request";
import { useMutation } from "react-query";
import requestClient from "../../../components/newlist/helpers/request-client";
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
	return useMutation<Message>("logout", async () => logoutRequest(), {
		retry: false,
	});
}
