import request, { gql } from "graphql-request";
import { useMutation } from "react-query";
import { uri } from "../../../helpers/graphql-uri";
import { List, NewListWithTermsInput } from "../../codegen-output";
import { listPropsFragment } from "../../fragments/list-fragments";

const createListMutation = gql`
	${listPropsFragment}
	mutation ($newList: NewListWithTermsInput!) {
		createList(newList: $newList) {
			list {
				...ListProps
			}
			terms {
				...TermProps
			}
		}
	}
`;

const createListRequest = async (newList: NewListWithTermsInput) =>
	request(uri, createListMutation, { newList });

export function useMutateCreateList({ onSuccess }: { onSuccess?: (args?: any) => any }) {
	return useMutation<List, any, NewListWithTermsInput>(
		"createList",
		async (newList) => createListRequest(newList),
		{
			retry: false,
			onSuccess: () => onSuccess?.(),
		}
	);
}
