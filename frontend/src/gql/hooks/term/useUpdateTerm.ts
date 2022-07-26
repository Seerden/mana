import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import requestClient from "../../../components/newlist/helpers/request-client";
import { Mutation, MutationUpdateTermValuesArgs } from "../../codegen-output";
import { termPropsFragment } from "../../fragments/term-fragments";

const updateTermMutation = gql`
	${termPropsFragment}
	mutation ($updateOptions: [TermUpdateInput!]!) {
		updateTermValues(updateOptions: $updateOptions) {
			...TermProps
		}
	}
`;

const updateTermValuesRequest = async ({ updateOptions }: MutationUpdateTermValuesArgs) =>
	(await requestClient.request(updateTermMutation, { updateOptions })).updateTermValues;

export default function useUpdateTermValues() {
	return useMutation<Mutation["updateTermValues"], any, MutationUpdateTermValuesArgs>(
		["updateTermValues"],
		async ({ updateOptions }) => updateTermValuesRequest({ updateOptions }),
		{ retry: false }
	);
}
