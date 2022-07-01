import { css } from "styled-components";
import { colors } from "./colors";

export const theme = {
	colors,
} as const;

export type MainTheme = typeof theme;

export const tempSection = css`
	border: 3px solid ${(p) => p.theme.colors.dark.grey.darker};
	padding: 1rem;
	width: 800px;
	margin-top: 1rem;
`;
