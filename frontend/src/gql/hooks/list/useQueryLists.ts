import { gql } from "graphql-request";
import { useQuery } from "react-query";
import requestClient from "../../../components/newlist/helpers/request-client";
import { List } from "../../codegen-output";
import { listPropsFragment } from "../../fragments/list-fragments";
import { termPropsFragment } from "../../fragments/term-fragments";

const listsByIdQuery = gql`
	${listPropsFragment}
	${termPropsFragment}
	query ($list_ids: [Int!]!) {
		listsById(list_ids: $list_ids) {
			...ListProps
			terms(populate: true) {
				...TermProps
			}
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
		["listsById", list_ids],
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
