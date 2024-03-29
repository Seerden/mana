import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const HeaderWrapper = styled.header`
	box-shadow: 0 3px 0 -2px #333;
	position: sticky;
	top: 0;
	left: 0;
	padding: 1rem;

	background-color: #111;
	z-index: 10;
	height: max-content;
	width: 100%;
	font-size: 1.3rem;
`;

export const HeaderContent = styled.nav`
	width: 100%;
	min-width: max-content;
`;

export const HeaderLogo = styled.span`
	align-self: center;
`;

export const LogoutButton = styled.button`
	float: right;
	margin-left: 1rem;
	background-color: #111;
	border: none;
	color: white;
	padding: 0.5rem 1rem;
	border: 2px solid transparent;
	outline: none;
	transition: all 80ms linear;

	&:not(:hover) {
		border: 2px solid #333;
	}

	&:hover {
		background-color: #333;
		box-shadow: 0 0 0.5rem black;
	}
`;

const hoverColor = "white";

export const HeaderNavLink = styled(NavLink)<{ $isActive?: boolean }>`
	position: relative;
	margin-left: 1rem;
	font-size: 1.1rem;
	color: azure;
	text-decoration: none;
	width: max-content;
	align-self: center;
	padding: 0.2rem 0.5rem;
	box-shadow: 0 2px 0 0 ${(p) => p.theme.colors.blue.main};

	background-image: linear-gradient(
		${(p) => p.theme.colors.blue.main},
		${(p) => p.theme.colors.blue.main}
	);
	background-repeat: no-repeat;
	background-position: 50% 100%;
	background-size: 0% 0%;

	transition: all 80ms ease-in;

	z-index: 3;

	&:hover {
		color: white;
		background-size: 100% 20%;
		transition: all 100ms ease-out;
	}

	${(p) =>
		p.$isActive &&
		css`
			--main: ${(p) => p.theme.colors.blue.main};
			--white: ${(p) => p.theme.colors.light.white};

			background-color: var(--main);
			color: black;
			border-bottom: 2px solid var(--main);
			box-shadow: 0 0.7rem 0 0 var(--main);

			&:hover {
				background-size: 0 0;
				color: black;
				background-color: var(--white);
				border-color: var(--white);
				box-shadow: 0 0.7rem 0 0 var(--white);
			}
		`}
`;
