import styled, { css, keyframes } from "styled-components";

const deleteButtonStyle = css`
	padding: 0.2rem 0.5rem;
	display: block;
	margin-left: auto;
	transition: all 70ms linear;

	background-color: #333;
	border: 2px solid transparent;
	border-radius: 2px;
	outline: none;
	color: azure;
	font-size: 0.7rem;
	width: 100px;
	margin-top: 1rem;
	height: 25px;
	justify-content: center;

	&:hover {
		background-color: orangered;
		transform: translateY(-3px);
		box-shadow: 0 0 0.5rem black;
	}
`;

// __delete--confirm
export const ConfirmDeleteLabel = styled.div`
	background-color: transparent;
	display: inline-flex;
	justify-content: center;
	font-size: 0.8rem;
	height: 20px;
	margin-bottom: 0;
	padding: 0 0.5rem;
`;

// __delete--confirm-yes, -no
export const ConfirmDeleteButton = styled.button<{ confirm?: true }>`
	${deleteButtonStyle}

	background-color: #111;
	display: inline-flex;
	width: max-content;
	margin-top: 0.3rem;
	height: 25px;

	&:hover {
		background-color: ${(p) => (p.confirm ? "seagreen" : "orangered")};
	}
`;

export const DeleteButton = styled.button`
	${deleteButtonStyle}
`;

export const DeleteButtonWrapper = styled.div`
	height: 60px;
	width: max-content;
	display: block;
	margin-left: auto;
`;

export const Input = styled.input<{ confirming?: boolean }>`
	display: block;
	width: 450px;
	max-width: 100%;
	border-radius: 0 3px 3px 3px;
	margin: 0;
	outline: none;
	padding: 0.7rem 1rem;
	background-color: #191919; // TODO: make theme value
	color: ${(p) => p.theme.colors.light.white};

	border: 3px solid ${(p) => p.theme.colors.dark.grey.dark};

	box-shadow: 0px 4px 0 -2px ${(p) => p.theme.colors.dark.grey.dark},
		0 -4px 0 -2px ${(p) => p.theme.colors.dark.grey.regular};

	transition: all 50ms linear;

	// Set 'confirming'-specific styles
	${({ confirming }) =>
		confirming &&
		css`
			border: 3px solid white;
			background-color: orangered;
			// Note that we don't have to also set box-shadow in &:focus, since the inputs are
			// disabled if in confirming state, so they'll never be both 'confirming' and focused.
			box-shadow: 0 0 1rem black;
		`}

	&:focus {
		background-color: #191919; // TODO: is this necessary?
		color: ${(p) => p.theme.colors.light.tint};
		border: 3px solid transparent;
		box-shadow: 0px 4px 0 -2px transparent, 0 -4px 0 -2px transparent,
			-8px -8px 0 -6px ${(p) => p.theme.colors.dark.grey.regular},
			8px 8px 0 -5px ${(p) => p.theme.colors.dark.grey.dark};
		border-radius: 0px;
	}
`;

export const TermSaturation = styled.span`
	display: flex;
	// background-color: #222;
	justify-content: center;
	width: 2rem;
	height: 100%;
	align-items: center;
`;

export const TermSide = styled.div`
	display: grid;
	grid-template-columns: repeat(2, max-content);
	align-items: center;
`;

export const Label = styled.label`
	margin-top: 1rem;
	margin-left: 2px;
	font-size: 1rem;
	background-color: #252525; // TODO: add to theme
	border-bottom: 2px solid #222;
	border-radius: 3px 7px 0 0;
	padding: 0.3rem 1rem;
	width: max-content;
`;

export const Section = styled.section`
	margin-bottom: 1rem;
`;

export const Header = styled.header`
	font-size: 1.6rem;
	font-weight: 600;
	width: max-content;
	border-bottom: 2px solid white;
	background-color: #222;
	margin-bottom: 0.5rem;
`;

export const CloseModalButton = styled.button`
	display: flex;
	line-height: 30px;
	align-items: center;
	justify-content: center;
	color: white;
	background-color: #555;
	height: 30px;
	width: 30px;
	border: 2px solid transparent;
	outline: none;
	border-radius: 50%;

	transition: all 50ms linear;

	&:hover {
		background-color: orangered;
		border-radius: 4px;
		transform: scale(1.05);
		box-shadow: 0 0.4rem 1rem 0 black;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const fadeIn = keyframes`
	100% {
		opacity: 1;
   }
`;

export const ModalWrapper = styled.div`
	animation: 100ms linear ${fadeIn};
	animation-fill-mode: forwards;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.755);
	z-index: 20;
`;

export const TermModal = styled.div`
	opacity: 0;
	animation: 100ms linear ${fadeIn};
	animation-fill-mode: forwards;

	transition: all 100ms ease;

	position: fixed;
	z-index: 21;
	top: 10%;
	padding: 2rem;
	background-color: #111;
	color: white;
	border: 2px solid #333;
	box-shadow: 10px 10px 0 -2px #444;
	width: 40vw;
	margin: 0 auto;
	left: 25%;
	overflow-y: auto;

	@media screen and (max-height: 900px) {
		top: 0;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.815);
	}

	@media screen and (max-width: 1280px) {
		width: 80%;
		left: 10%;
	}

	@media screen and (max-width: 768px) {
		width: 100%;
		left: 0;
		box-shadow: none;
		padding: 1rem 2rem;
	}
`;
