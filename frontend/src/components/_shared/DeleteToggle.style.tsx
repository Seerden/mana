import styled, { css } from "styled-components";

const deleteButtonStyle = css`
	padding: 0.4rem 0.85rem;
	display: block;
	margin-left: auto;
	transition: all 70ms linear;

	background-color: #333;
	border: 2px solid transparent;
	border-radius: 3px;
	outline: none;
	color: azure;
	font-size: 0.8rem;
	width: max-content;
	height: 100%;
	justify-content: center;

	&:hover {
		background-color: orangered;
		transform: translateY(-3px);
		box-shadow: 0 0 0.5rem black;
	}
`;

export const DeleteButtonWrapper = styled.div`
	width: max-content;
	display: flex;
	float: right;
	margin-left: auto;
	min-height: 60px;
	align-items: center;
`;

export const DeleteButton = styled.button`
	${deleteButtonStyle}
`;

export const ConfirmDeleteButton = styled.button<{ confirm?: true }>`
	${deleteButtonStyle}

	background-color: #111;
	display: inline-flex;
	width: max-content;

	border-bottom: 2px solid ${(p) => (p.confirm ? "orangered" : "forestgreen")};

	&:hover {
		background-color: ${(p) => (p.confirm ? "orangered" : "forestgreen")};
	}
`;

export const ConfirmDeleteLabel = styled.div`
	display: inline-flex;
	justify-content: center;
	font-size: 0.8rem;
	font-weight: 700;
	padding: 0 0.5rem;
`;
