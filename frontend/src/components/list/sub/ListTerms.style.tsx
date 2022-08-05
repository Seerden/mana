import styled from "styled-components";
import { subsectionHeaderStyle, tempSectionStyle } from "../../../helpers/theme/theme";
import { SaturationFilter } from "../../SaturationFilter/SaturationFilter.style";

export const ListTerms = styled.section`
	${tempSectionStyle}
`;

export const Header = styled.header`
	${subsectionHeaderStyle}
`;

export const FilterString = styled.span`
	user-select: none;
	width: max-content;
	text-align: center;
	background-color: ${(p) => p.theme.colors.dark.grey.darker};
	color: ${(p) => p.theme.colors.light.tint};
	padding: 0.5rem 0.8rem;
	border-radius: 3px;
	border: 2px solid ${(p) => p.theme.colors.dark.darker};
	font-size: 0.9rem;
`;

export const FilterInfo = styled.div`
	border-top: 2px solid ${(p) => p.theme.colors.dark.grey.dark};
	padding-top: 0.5rem;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.35rem;

	// On small viewports, we want to stack the saturation filter subsection
	// vertically, reverse the order of the elements, and stretch them to 100%.
	@media screen and (max-width: 512px) {
		border-top: none;
		flex-flow: wrap-reverse;
		justify-content: flex-end;
		margin: 0.8rem 0;

		// Stretch the SaturationFilter and its content to 100% width. By default
		// SaturationFilter's subcomponents have hardcoded width, but we can
		// overwrite it relatively easily with a '> *' selector.
		${SaturationFilter} {
			width: 100%;
			justify-content: space-between;

			> * {
				width: 100%;
			}
		}

		${FilterString} {
			width: 100%;
		}
	}
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
