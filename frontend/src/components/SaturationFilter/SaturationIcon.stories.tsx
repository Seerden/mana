import { ComponentMeta, ComponentStory } from "@storybook/react";
import SaturationIcon from "./SaturationIcon";

export default {
	component: SaturationIcon,
	argTypes: {},
} as ComponentMeta<typeof SaturationIcon>;

export const BasicIcon: ComponentStory<typeof SaturationIcon> = (props) => (
	<div style={{ width: "50px", height: "50px" }}>
		<SaturationIcon
			{...props}
			style={{ width: "50px", height: "50px", display: "flex" }}
		/>
	</div>
);

BasicIcon.argTypes = {
	direction: {
		options: ["forwards", "backwards"],
		control: { type: "radio" },
		defaultValue: "forwards",
	},

	saturation: {
		defaultValue: { forwards: 2, backwards: 4 },
	},
};
