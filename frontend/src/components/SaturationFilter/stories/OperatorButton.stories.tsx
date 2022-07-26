import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RecoilRoot } from "recoil";
import OperatorButton from "../FilterButtons";
import { Operator, operators } from "../helpers/operators";
import * as S from "../SaturationFilter.style";

export default {
	component: OperatorButton,
	argTypes: {},
} as ComponentMeta<typeof OperatorButton>;

export const OperatorButtons: ComponentStory<typeof OperatorButton> = (props) => (
	<RecoilRoot>
		<S.FilterIcons style={{ gap: "0.8rem" }}>
			{Object.values(operators).map((operator: Operator) => (
				<OperatorButton key={operator} {...props} operator={operator} />
			))}
		</S.FilterIcons>
	</RecoilRoot>
);
