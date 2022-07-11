import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";

export default {
	component: HeaderLoggedIn,
	argTypes: {},
} as ComponentMeta<typeof HeaderLoggedIn>;

const StyledMessage = styled.div`
	background-color: orange;
	color: black;
	padding: 2rem 1rem;
	margin: 0 auto;
	width: max-content;
	margin-bottom: 2rem;
`;

function Message() {
	return (
		<StyledMessage>
			This component's functionality is not implemented in this story, but its style
			is!
		</StyledMessage>
	);
}

export const LoggedIn: ComponentStory<typeof HeaderLoggedIn> = (props) => (
	<RecoilRoot>
		<Message />
		<HeaderLoggedIn />
	</RecoilRoot>
);

export const LoggedOut: ComponentStory<typeof HeaderLoggedOut> = (props) => (
	<>
		<Message />
		<HeaderLoggedOut />
	</>
);
