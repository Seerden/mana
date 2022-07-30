import styled, { css } from "styled-components";

const boxShadow = css`
	box-shadow: -10px -10px 0 -7px ${(p) => p.theme.colors.dark.grey.darker},
		10px 10px 0 -7px ${(p) => p.theme.colors.dark.grey.darker}, 0 0 0.5rem black;
`;

export const TermIndex = styled.span`
	width: 30px;
	text-align: center;
	justify-content: center;
	font-size: 0.8rem;
	color: #777;

	@media screen and (max-width: 768px), screen and (max-height: 700px) {
		display: none;
	}
`;

export const TermSaturation = styled.span`
	* {
		// TODO: temporary workaround. Once SaturationIcon is a Styled component, we can do this differently
		display: inline-block;
	}

	@media screen and (max-width: 768px), screen and (max-height: 700px) {
		display: none;
	}
`;

export const TermValue = styled.span<{ lang: string }>`
	display: flex;
	word-wrap: break-word;
	max-width: 100%;

	@media screen and (max-width: 768px), screen and (max-height: 700px) {
		display: flex;
		padding: 0 1rem;
		justify-self: center;
		width: 100%;
	}

	&::before {
		content: "${(p) => p.lang.slice(0, 2).toUpperCase()}";
		font-size: 0.76rem;
		color: #777;
		margin-right: 0.35rem;
		align-self: center;
	}
`;

export const Term = styled.li`
	max-width: 1200px;
	padding: 0.5rem;
	margin-top: 1.2rem;
	position: relative;

	${boxShadow}

	border-radius: 10px;
	border: 2px solid ${(p) => p.theme.colors.dark.grey.darker};
	user-select: none;

	display: grid;
	grid-template-columns: 30px repeat(2, 40%) repeat(2, 30px) auto;
	align-items: center;

	@media screen and (max-width: 768px), screen and (max-height: 700px) {
		grid-template-columns: 1fr;
		justify-content: center;
		display: grid;
		margin: 0 auto;
		margin-top: 0.5rem;

		padding: 0.3rem;
		padding-left: 1rem;
	}

	@media screen and (max-width: 1280px) {
		max-width: 900px;
		margin-left: auto;
		margin-right: auto;
	}

	transition: all 50ms ease-out;

	&:hover {
		background-color: #151515; // TODO: add to theme
		color: ${(p) => p.theme.colors.light.tint};
		border-color: ${(p) => p.theme.colors.dark.grey.darker};
		// TODO: refactor box-shadow following https://tobiasahlin.com/blog/how-to-animate-box-shadow/
		box-shadow: -6px -6px 0 -3px ${(p) => p.theme.colors.dark.grey.darker},
			6px 6px 0 -3px ${(p) => p.theme.colors.dark.grey.darker}, 0 0 0.5rem black;
	}
`;

export const TermSelect = styled.div<{ selected?: boolean }>`
	display: flex;
	justify-self: center;
	color: white;

	/* TODO: add green colors to theme */
	${(p) => (p.selected ? "seagreen" : p.theme.colors.dark.grey.regular)}

	@media screen and (max-width: 768px), screen and (max-height: 700px) {
		position: absolute;
		display: flex;
		height: 100%;
		align-items: center;
		right: 5%;
	}
`;
