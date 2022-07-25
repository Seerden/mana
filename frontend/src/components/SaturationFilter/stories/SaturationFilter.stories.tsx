import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RecoilRoot } from "recoil";
import SaturationFilter from "../SaturationFilter";

export default {
	component: SaturationFilter,
	argTypes: {},
} as ComponentMeta<typeof SaturationFilter>;

export const Basic: ComponentStory<typeof SaturationFilter> = () => (
	<RecoilRoot>
		<SaturationFilter />
	</RecoilRoot>
);
