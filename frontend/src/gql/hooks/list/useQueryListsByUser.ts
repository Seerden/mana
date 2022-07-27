import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";
import { List } from "../../codegen-output";
import { listWithTermsFragment } from "../../fragments/list-fragments";

/**
 * NOTE: TermProps fragment does not by default include `term.saturation`.
 */

const query = gql`
	${listWithTermsFragment}
	query {
		listsByUser {
			...FListWithTerms
		}
	}
`;

const req = async () => (await requestClient.request(query)).listsByUser;

export default function useQueryListsByUser() {
	const client = useQueryClient();

	return useQuery<List[]>(["listsByUser"], () => req(), {
		onSuccess: (lists) => {
			// Update each list in query cache.
			for (const list of lists) {
				client.setQueryData(["listsById", list.list_id], () =>
					lists.filter((l) => l.list_id === list.list_id)
				);
			}
		},
	});
}
