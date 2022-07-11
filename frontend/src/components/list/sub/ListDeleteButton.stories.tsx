import { ComponentMeta, ComponentStory } from "@storybook/react";
import ListDeleteButton from "./ListDeleteButton";

export default {
	component: ListDeleteButton,
	argTypes: {},
} as ComponentMeta<typeof ListDeleteButton>;

export const Basic: ComponentStory<typeof ListDeleteButton> = (props) => (
	<ListDeleteButton {...props} />
);
