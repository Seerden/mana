import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";
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

const deleteListRequest = async (list_id: List["list_id"]) => {
	const { deleteList } = await requestClient.request(deleteListMutation, {
		list_id,
	});
	return deleteList;
};

export function useMutateDeleteList() {
	return useMutation<ListAndTerms, any, List["list_id"]>(
		["deleteList"],
		async (list_id) => deleteListRequest(list_id),
		{ retry: false }
	);
}
