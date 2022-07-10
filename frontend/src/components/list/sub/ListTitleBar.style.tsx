import styled from "styled-components";
import { tempSectionStyle } from "../../../helpers/theme/theme";

const regularPadding = "0.5rem 1rem";

// .List__TitleBar
export const TitleBar = styled.section`
	${tempSectionStyle};

	margin-bottom: 0;
	padding: 0;
	border: none;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

// &__header
export const TitleBarHeader = styled.header`
	display: flex;
`;

// &--listname
export const ListName = styled.h3`
	background-color: ${(p) => p.theme.colors.blue.main};
	color: ${(p) => p.theme.colors.dark.black};
	font-weight: 400;
	margin-bottom: 0;
	padding: ${regularPadding};
	min-width: 5rem;
	text-align: center;
`;

// &--languages
export const ListLanguages = styled.span`
	margin-bottom: 0;
	background-color: ${(p) => p.theme.colors.dark.grey.darker};
	color: ${(p) => p.theme.colors.light.tint};
	padding: ${regularPadding};
	border: 2px solid ${(p) => p.theme.colors.blue.main};
`;
