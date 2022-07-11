import { ComponentMeta, ComponentStory } from "@storybook/react";
import Footer from "./Footer";

export default {
	component: Footer,
	argTypes: {},
} as ComponentMeta<typeof Footer>;

export const Basic: ComponentStory<typeof Footer> = (props) => <Footer />;
