import { ComponentMeta, ComponentStory } from "@storybook/react";
import SettingsButton from "../sub/SettingsButton";

export default {
	component: SettingsButton,
	argTypes: {},
} as ComponentMeta<typeof SettingsButton>;

const Template: ComponentStory<typeof SettingsButton> = (props) => (
	<SettingsButton {...props} />
);

export const N = Template.bind({});
N.args = {
	field: "n",
	value: 1,
};

export const Direction = Template.bind({});
Direction.args = {
	field: "direction",
	value: "forwards",
};
