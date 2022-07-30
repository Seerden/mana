import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";
import { LogoutButton } from "../../../components/layout/Header/Header.style";
import { ReviewLink } from "../../../components/list/sub/ListReviewButtons.style";
import { RegisterLink } from "../../../components/login/sub/LoginForm.style";
import { Button } from "../shared/Button";

export default {
	title: "Buttons",
	component: ReviewLink,
} as ComponentMeta<typeof ReviewLink>;

const ReviewLinkTemplate: ComponentStory<typeof ReviewLink> = (args) => (
	<ReviewLink {...args}>Click me</ReviewLink>
);

export const ReviewLinkButton = ReviewLinkTemplate.bind({});
ReviewLinkButton.args = {
	to: "/",
};

export const SharedButton: ComponentStory<typeof Button> = (args) => (
	<Button {...args}>{args.text}</Button>
);
SharedButton.args = { text: "Click me" };

export const DisabledSharedButton = SharedButton.bind({});
DisabledSharedButton.args = { disabled: true, text: "Click me" };

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;

	div {
		&:not(:nth-of-type(1)) {
			border-top: 2px solid #333;
			padding-top: 1rem;

			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	label {
		font-weight: 500;
		font-size: 1.1rem;
		background-color: #444;
		padding: 0.25rem 1rem;
		margin-bottom: 0.5rem;
		width: max-content;
	}
`;

export const Playground: ComponentStory<any> = (args) => (
	<Wrapper>
		<div>
			<label htmlFor="">Review Link button (List.tsx)</label>
			<ReviewLink to="/">Review this list</ReviewLink>
		</div>

		<div>
			<span>
				<label htmlFor="">Shared button</label>
				<Button>Click me</Button>
			</span>
			<span>
				<label htmlFor="">Disabled shared button</label>
				<Button disabled={true}>Can't click me</Button>
			</span>
		</div>

		<div>
			<label htmlFor="">Register link button (Login.tsx)</label>
			<RegisterLink to="/">Register</RegisterLink>
		</div>

		<div>
			<label htmlFor="">Log out button (Header.tsx)</label>
			<LogoutButton>Log out</LogoutButton>
		</div>
	</Wrapper>
);
