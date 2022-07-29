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

export const sharedButtonStyle = css`
	display: block;
	margin: 0.8rem 0;
	outline: none;
	border: none;
	border-radius: 3px;
	background-color: deepskyblue;
	padding: 0.5rem 1rem;
	font-size: 0.9rem;

	transition: all 80ms linear;

	&:not(:disabled) {
		&:not(:active):hover {
			background-color: #333;
			color: white;
			transform: translateY(-2px);
			box-shadow: 0 5px 0 -4px deepskyblue, 0 0 0.5rem black;
		}
		&:hover {
			box-shadow: 0 3px 0 -1px black;
		}

		&:active {
			background-color: #444;
			color: azure;
		}

		&:focus {
			outline: 1px solid white;
		}
	}

	&:disabled {
		background-color: #555;
		color: #888;
	}
`;

// Matches old .Link class
export const linkStyle = css`
	display: inline-block;
	color: deepskyblue;
	text-decoration: none;
	border-bottom: 1px solid transparent;

	transition: all ease 100ms;

	&:hover {
		transform: translateY(-2px);
		color: slateblue;
	}

	&:active {
		border-bottom: 1px solid slateblue;
	}
`;

export const sharedHeadingStyle = css`
	width: max-content;
	background-color: #333;
	font-size: 1.4rem;
	padding: 0.2rem 0.5rem;
`;

export const sharedOutlineStyle = css`
	outline: 4px solid #333;
`;

export const sharedPageTitleStyle = css`
	font-size: 1.9em;
	font-weight: 600;
	padding-right: 2em;
	border-bottom: 5px solid var(--text-light); // TODO: does this get picked up by Styled components?
	width: max-content;
	margin-bottom: 1em;
`;
