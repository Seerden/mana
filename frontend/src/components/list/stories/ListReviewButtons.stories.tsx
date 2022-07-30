import { ComponentMeta, ComponentStory } from "@storybook/react";
import ListReviewButtons from "../sub/ListReviewButtons";

export default {
	component: ListReviewButtons,
	argTypes: {},
} as ComponentMeta<typeof ListReviewButtons>;

export const Basic: ComponentStory<typeof ListReviewButtons> = (props) => (
	<ListReviewButtons />
);
