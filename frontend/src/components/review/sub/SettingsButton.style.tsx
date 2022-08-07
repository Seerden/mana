import styled, { css } from "styled-components";

export const SettingsButton = styled.input<{
	selected?: boolean;
	field: "n" | "direction";
}>`
	display: inline-flex;
	text-align: center;
	justify-content: center;
	line-height: 1.2rem;
	margin-right: 3px;
	border: 2px solid transparent;
	outline: none;
	padding: 0.1rem 0.5rem;

	transition: all 50ms ease-in;

	color: ${(p) => (p.selected ? "white" : "black")};

	background-color: ${(p) => (p.selected ? "blueviolet" : "white")};

	${(p) =>
		p.field === "n" &&
		css`
			width: 40px;
		`}

	${(p) =>
		p.field === "direction" &&
		css`
			width: max-content;
		`}

	&:hover {
		backface-visibility: hidden;
		box-shadow: 0 0 0.5rem black, 0 -0.3rem 0 -0.1rem white;
		transform: translateY(2px) translateZ(1px);
	}
`;
