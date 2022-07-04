import styled, { css, keyframes } from "styled-components";

const flip = keyframes`
	0% {
		opacity: 1;
	}
	50% {
		transform: rotateX(90deg);
	}
	100% {
		transform: rotateX(0deg);
	}
`;

const fadeIn = keyframes`
   0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

export const ReviewCard = styled.div<{ fadeIn?: boolean; flipping?: boolean }>`
	display: flex;
	justify-content: center;

	line-height: 1.6rem;
	font-size: 1.6rem;
	font-weight: 200;

	padding: 3rem;
	border: 2px solid transparent;
	border-radius: 5px;

	background: linear-gradient(-30deg, #eee, #ddd);
	color: darkslategrey;
	box-shadow: 0 0 1em black;

	user-select: none;
	perspective: 700px;

	${(p) =>
		p.fadeIn &&
		css`
			animation: var(--duration) ease 1 ${fadeIn};
			animation-fill-mode: forwards;
		`}

	${(p) =>
		p.flipping &&
		css`
			transform: perspective(500px);
			transform-style: preserve-3d;
			transform-origin: 50% 50%;
			animation: 250ms linear ${flip};
			animation-fill-mode: forwards;
		`}
`;
