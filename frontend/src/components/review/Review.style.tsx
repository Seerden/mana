import styled from "styled-components";

export const Review = styled.main`
	max-width: 800px;
`;

export const PreventNextCard = styled.div`
	margin-top: 1rem;
	height: 30px;
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;
	color: #555;
`;

export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Buttons = styled.div`
	display: flex;
	justify-content: space-around;
`;

export const ProgressWrapper = styled.div`
	width: 100%;
	position: absolute;
	top: 4.2rem; /* should match Header component's height */
	left: 0;
	height: 4px;
	background-color: #555;
`;

export const ProgressBar = styled.div<{ widthPercent?: string }>`
	background-color: deepskyblue;
	height: inherit;
	transition: width 300ms linear;

	width: ${(p) => p.widthPercent};
`;

export const Button = styled.input<{ passfail: "pass" | "fail" }>`
	outline: none;
	margin: none;
	border: none;
	color: azure;
	box-shadow: 0 0 0.5em black;
	margin-top: 1rem;
	background-color: #333;

	width: 120px;
	height: 30px;
	font-family: "Roboto";

	transition: all 80ms ease-in;

	&:hover {
		padding: 0; /* padding is non-zero by default which causes 'shifting' effect of text */
		transform: translateY(-1px) scale(1.03);
		transform-style: preserve-3d;
		transform: center;
		box-shadow: 0 5px 1em -6px #333;
	}

	&:hover,
	&:focus {
		background-color: ${(p) => (p.passfail === "pass" ? "seagreen" : "orangered")};
	}
`;
