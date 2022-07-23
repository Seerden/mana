import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { uri } from "../../../helpers/graphql-uri";
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

const queryListsByIdRequest = (list_ids: Array<List["list_id"]>) =>
	request(uri, listsByIdQuery, { list_ids });

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
