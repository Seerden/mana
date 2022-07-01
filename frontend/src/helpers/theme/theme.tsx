import { css } from "styled-components";
import { colors } from "./colors";

export const theme = {
	colors,
} as const;

export type MainTheme = typeof theme;

export const tempSectionStyle = css`
	border: 3px solid ${(p) => p.theme.colors.dark.grey.darker};
	padding: 1rem;
	width: 800px;
	margin-top: 1rem;
`;

export const subsectionHeaderStyle = css`
	font-size: 1.3rem; // TODO: use theme value
	background-color: #ccc;
	color: ${(p) => p.theme.colors.dark.darker};
	padding: 0.2rem 0.5rem; // TODO: use theme value
	width: max-content;
	margin-bottom: 0.5rem;
`;

export const sharedLinkStyle = css`
	--color: ${(p) => p.theme.colors.blue.main};

	display: inline-block;
	padding: 0.3em 0.6em;
	background-color: ${(p) => p.theme.colors.dark.grey.darker};
	border-radius: 2px;
	color: var(--color);

	transition: all 75ms ease-in;

	&:hover {
		background-color: ${(p) => p.theme.colors.dark.darkish};
		border-radius: 0;
	}

	&:visited {
		color: var(--color);
	}
`;
