import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { List, Term } from "../../../gql/codegen-output";
import useQueryClient from "../../../hooks/useQueryClient";
import ListTerm from "./ListTerm";

export default {
	component: ListTerm,
	argTypes: {},
} as ComponentMeta<typeof ListTerm>;

const mockTerm: Term = {
	_id: "a",
	from: "A",
	history: [],
	listMembership: [{ _id: "1" }] as List[],
	owner: "me",
	saturation: { forwards: 1, backwards: 2 },
	to: "B",
	languages: { from: "A", to: "B" },
};

export const Basic: ComponentStory<typeof ListTerm> = (props) => {
	const [client] = useQueryClient();

	return (
		<QueryClientProvider client={client}>
			<RecoilRoot>
				<ListTerm
					term={mockTerm}
					handleTermDelete={() => {
						return;
					}}
					key={1}
					idx={0}
				/>
			</RecoilRoot>
		</QueryClientProvider>
	);
};
