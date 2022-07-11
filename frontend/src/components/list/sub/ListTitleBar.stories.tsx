import { ComponentMeta, ComponentStory } from "@storybook/react";
import { List } from "../../../gql/codegen-output";
import ListTitleBar from "./ListTitleBar";

export default {
	component: ListTitleBar,
	argTypes: {},
} as ComponentMeta<typeof ListTitleBar>;

const mockList: List = {
	_id: "1",
	created: "2022-02-10",
	from: "Pg",
	lastReviewed: "2022-03-04",
	name: "My list",
	owner: "me",
	setMembership: [],
	terms: [],
	to: "lang",
};

export const Basic: ComponentStory<typeof ListTitleBar> = (props) => (
	<ListTitleBar
		handleDelete={() => ({})}
		handleListTitleBlur={() => ({})}
		list={mockList}
	/>
);
