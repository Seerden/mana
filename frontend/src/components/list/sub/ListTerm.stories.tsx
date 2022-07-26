import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { Term } from "../../../gql/codegen-output";
import ListTerm from "./ListTerm";

export default {
	component: ListTerm,
	argTypes: {},
} as ComponentMeta<typeof ListTerm>;

const mockTerm: Term = {
	user_id: 1,
	list_id: 1,
	term_id: 1,
	from_language: "A",
	to_language: "B",
	from_value: "1",
	to_value: "2",
	saturation: {
		forwards: 1,
		backwards: 2,
		last_updated: new Date().valueOf(),
		term_id: 1,
	},
};

export const Basic: ComponentStory<typeof ListTerm> = (props) => {
	const client = useQueryClient();

	return (
		<QueryClientProvider client={client}>
			<RecoilRoot>
				<ListTerm term={mockTerm} key={1} idx={0} />
			</RecoilRoot>
		</QueryClientProvider>
	);
};
