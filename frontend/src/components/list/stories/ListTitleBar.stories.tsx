import { ComponentMeta, ComponentStory } from "@storybook/react";
import { List } from "../../../gql/codegen-output";
import ListTitleBar from "../sub/ListTitleBar";

export default {
	component: ListTitleBar,
	argTypes: {},
} as ComponentMeta<typeof ListTitleBar>;

const mockList: List = {
	list_id: 1,
	created_at: 1,
	from_language: "Pg",
	last_reviewed: 1,
	name: "My list",
	user_id: 1,
	terms: [],
	to_language: "lang",
};

export const Basic: ComponentStory<typeof ListTitleBar> = (props) => (
	<ListTitleBar
		handleDelete={() => ({})}
		handleListTitleBlur={() => ({})}
		list={mockList}
	/>
);
