import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";
import TermReviewHistory from "../sub/TermReviewHistory";

export default {
	component: TermReviewHistory,
	argTypes: {},
} as ComponentMeta<typeof TermReviewHistory>;

const Wrapper = styled.div`
	max-width: 850px;
	border: 2px solid orange;
	padding: 1rem;
`;

const now = new Date().valueOf() / 1000;

export const Basic: ComponentStory<typeof TermReviewHistory> = (props) => (
	<Wrapper>
		<TermReviewHistory
			history={[
				[
					{
						created_at: now,
						direction: "forwards",
						passfail: "pass",
						review_entry_id: 1,
						review_session_id: 2,
						term_id: 1,
						time_on_card: 100,
					},
					{
						created_at: now,
						direction: "forwards",
						passfail: "fail",
						review_entry_id: 1,
						review_session_id: 2,
						term_id: 1,
						time_on_card: 100,
					},
					{
						created_at: now,
						direction: "forwards",
						passfail: "pass",
						review_entry_id: 1,
						review_session_id: 2,
						term_id: 1,
						time_on_card: 100,
					},
					{
						created_at: now,
						direction: "forwards",
						passfail: "pass",
						review_entry_id: 1,
						review_session_id: 2,
						term_id: 1,
						time_on_card: 100,
					},
				],
			]}
		/>
	</Wrapper>
);
