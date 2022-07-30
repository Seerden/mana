import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";
import { List } from "../../codegen-output";
import { listWithTermsFragment } from "../../fragments/list-fragments";

const listsByIdQuery = gql`
	${listWithTermsFragment}
	query ($list_ids: [Int!]!) {
		listsById(list_ids: $list_ids) {
			...FListWithTerms
		}
	}
`;

const queryListsByIdRequest = async (list_ids: Array<List["list_id"]>) =>
	(await requestClient.request(listsByIdQuery, { list_ids })).listsById;

export function useQueryListsById(
	list_ids: Array<List["list_id"]>,
	options?: { onSuccess: (data: List[]) => void }
) {
	return useQuery<List[]>(
		["listsById", list_ids.length > 1 ? list_ids : list_ids[0]],
		async () => queryListsByIdRequest(list_ids),
		{
			enabled: false,
			retry: false,
			onSuccess(lists) {
				if (options?.onSuccess && lists?.length) {
					options.onSuccess(lists);
				}
			},
		}
	);
}
