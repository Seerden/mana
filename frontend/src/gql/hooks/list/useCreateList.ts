import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import requestClient from "../../../helpers/request-client";
import { List, NewListWithTermsInput } from "../../codegen-output";
import { listPropsFragment } from "../../fragments/list-fragments";
import { termPropsFragment } from "../../fragments/term-fragments";

const createListMutation = gql`
	${listPropsFragment}
	${termPropsFragment}
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

const createListRequest = async (newList: NewListWithTermsInput) => {
	const { createList } = await requestClient.request(createListMutation, {
		newList,
	});
	return createList;
};

export function useMutateCreateList({ onSuccess }: { onSuccess?: (args?: any) => any }) {
	return useMutation<List, any, NewListWithTermsInput>(
		["createList"],
		async (newList) => createListRequest(newList),
		{
			retry: false,
			onSuccess: () => onSuccess?.(),
		}
	);
}
