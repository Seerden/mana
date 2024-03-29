import styled from "styled-components";

export const Term = styled.div`
	&:nth-last-of-type(1) {
		margin-bottom: 2rem;
	}

	display: flex;
	flex-direction: row;
	margin: 0 auto;
	display: flex;
	align-items: center;

	&:not(:nth-of-type(-n + 2)) {
		margin-top: 0.5rem;
	}
`;

const termHeight = "1.8rem";

export const TermIndex = styled.div<{ isFocussed?: boolean }>`
	padding: 0.3rem 0;
	display: flex;
	text-align: center;
	height: ${termHeight};
	width: 2rem;
	justify-content: center;
	align-items: center;
	font-size: 0.9rem;
	display: inline-block;
	border-radius: 4px 0 0 4px;
	user-select: none;

	background-color: ${(p) => (p.isFocussed ? "deepskyblue" : "#111")};
	color: ${(p) => (p.isFocussed ? "#111" : "azure")};

	transition: all 50ms linear;
`;

export const TermInputs = styled.div`
	display: flex;
	width: 100%;
`;

export const TermInput = styled.input`
	height: ${termHeight};
	display: inline-block;
	padding: 0.3rem 0.5rem;
	color: #ddd;
	width: 100%;
	font-size: 0.85rem;
	border: none;
	background-color: #2a2a2a;
	border-radius: 0 0 5px 0;
	box-shadow: 0 0 0.5rem 0 #111;
	border: 1px solid #111;

	transition: all 100ms linear, outline 5ms ease-in, box-shadow 0ms linear;

	&:nth-of-type(1) {
		width: calc(100% - 2rem);
	}

	&:focus,
	&:active {
		outline: none;
		color: white;
		border-radius: 0;
		outline: 2px solid deepskyblue;
		box-shadow: 0 0 0.5rem black;
		transform: scale(1.02);
	}
`;
