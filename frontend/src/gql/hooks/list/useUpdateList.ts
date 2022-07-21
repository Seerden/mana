import request, { gql } from "graphql-request";
import { useMutation } from "react-query";
import { uri } from "../../../helpers/graphql-uri";
import { List, ListUpdatePayloadInput } from "../../codegen-output";

const updateListMutation = gql`
	mutation ($user_id: Float!, $list_id: Float!, $payload: ListUpdatePayloadInput!) {
		updateList(user_id: $user_id, list_id: $list_id, payload: $payload) {
			list_id
		}
	}
`;

type UpdateListVariables = {
	list_id: List["list_id"];
	payload: ListUpdatePayloadInput;
};

const updateListRequest = async (variables: UpdateListVariables): Promise<List> =>
	request(uri, updateListMutation, variables);

export function useMutateUpdateList() {
	return useMutation<List, any, UpdateListVariables>(
		"updateList",
		async (variables) => updateListRequest(variables),
		{ retry: false }
	);
}
