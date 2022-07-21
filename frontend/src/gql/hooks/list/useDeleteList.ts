import request, { gql } from "graphql-request";
import { useMutation } from "react-query";
import { uri } from "../../../helpers/graphql-uri";
import { List, ListAndTerms } from "../../codegen-output";

const deleteListMutation = gql`
	mutation ($list_id: Int!) {
		deleteList(listIds: [$list_id]) {
			list {
				list_id
			}
		}
	}
`;

const deleteListRequest = (list_id: List["list_id"]) =>
	request(uri, deleteListMutation, { list_id });

export function useMutateDeleteList() {
	return useMutation<ListAndTerms, any, List["list_id"]>(
		"deleteList",
		async (list_id) => deleteListRequest(list_id),
		{ retry: false }
	);
}
