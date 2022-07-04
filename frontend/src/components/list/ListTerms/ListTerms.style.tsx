import styled from "styled-components";
import { subsectionHeaderStyle, tempSectionStyle } from "../../../helpers/theme/theme";

export const ListTerms = styled.section`
	${tempSectionStyle}
`;

export const Header = styled.header`
	${subsectionHeaderStyle}
`;

export const FilterInfo = styled.div`
	border-top: 2px solid ${(p) => p.theme.colors.dark.grey.dark};
	padding-top: 0.5rem;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.35rem;
`;

export const FilterString = styled.span`
	width: 10rem;
	text-align: center;
	background-color: ${(p) => p.theme.colors.dark.grey.darker};
	color: ${(p) => p.theme.colors.light.tint};
	padding: 0.5rem 0.8rem;
	border-radius: 3px;
	border: 2px solid ${(p) => p.theme.colors.dark.darker};
	font-size: 0.9rem;
`;

export const AllFiltered = styled.span`
	display: inline-block;
	color: ${(p) => p.theme.colors.dark.black};
	padding: 0.3rem 1rem;
	border-radius: 5px;
	box-shadow: 0 0 1rem ${(p) => p.theme.colors.dark.black};
	margin: 0 auto;
	width: max-content;
	margin-top: 1rem;
	background-color: ${(p) => p.theme.colors.light.faded};
`;
