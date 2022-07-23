import request, { gql } from "graphql-request";
import { useMutation } from "react-query";
import { uri } from "../../../helpers/graphql-uri";
import { Mutation, MutationUpdateTermValuesArgs } from "../../codegen-output";

const updateTermMutation = gql`
	mutation ($updateOptions: [TermUpdateInput!]!) {
		updateTermValues(updateOptions: $updateOptions) {
			term_id
		}
	}
`;

const updateTermValuesRequest = ({ updateOptions }: MutationUpdateTermValuesArgs) =>
	request(uri, updateTermMutation, { updateOptions });

export default function useUpdateTermValues() {
	return useMutation<Mutation["updateTermValues"], any, MutationUpdateTermValuesArgs>(
		"updateTermValues",
		async ({ updateOptions }) => updateTermValuesRequest({ updateOptions }),
		{ retry: false }
	);
}
