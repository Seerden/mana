import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { sharedButtonStyle } from "../../helpers/theme/theme";

const maxWidth = "800px";
const showPassWidth = "2.5rem";
const inputWidth = "13rem";
const passwordFieldWidth = `${inputWidth} - ${showPassWidth}`;

// Header, Message, Error share some styles
// TODO: instead of splitting up Header, Message, Error into 3 elements, why not
// make it one element that takes some props?
const sharedTextStyle = css`
	padding: 1rem;
	border-radius: 3px;
	box-shadow: 0 0 1rem black;
	max-width: ${maxWidth};
	margin: 0 auto;
`;

export const Header = styled.header`
	${sharedTextStyle};

	background-color: deepskyblue;
	color: black;
	margin-bottom: 1rem;
`;

export const Message = styled.div`
	${sharedTextStyle};

	background-color: goldenrod;
	color: black;
	margin-bottom: 1rem;
`;

export const Error = styled.div`
	${sharedTextStyle}

	background-color: crimson;
	color: azure;
`;

export const Form = styled.form`
	max-width: $maxwidth;
	margin: 0 auto;
	margin-top: 1rem;
	padding: 1rem;
	box-shadow: 0 0 1rem black;
	border-radius: 5px;
	border: 2px solid #444;
`;

export const FormField = styled.div`
	max-width: 100%;
	overflow: hidden;
`;

export const FormFieldContent = styled.div`
	display: flex;
	align-items: center;
`;

export const Input = styled.input`
	background-color: #444;
	border: 2px solid transparent;
	outline: none;
	color: azure;
	padding: 0.3rem 0.5rem;

	transition: all 100ms ease;

	&:focus {
		border-color: deepskyblue;
	}

	width: ${(p) => (p.type === "text" ? inputWidth : passwordFieldWidth)};
`;

export const ShowPassword = styled.div<{ showPassword?: boolean }>`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border: 2px solid transparent;
	outline: none;
	padding: 0.3em 0.5rem;

	background-color: deepskyblue;
	border-radius: 0 3px 3px 0;

	width: ${showPassWidth};
	transition: all 100ms ease;

	color: ${(p) => (p.showPassword ? "white" : "#777")};
`;

export const InputLabel = styled.label`
	font-size: 0.9rem;
	margin-bottom: 0.4rem;
	margin-top: 0.6rem;
`;

export const Buttons = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const LoginButton = styled.input`
	${sharedButtonStyle};
`;

export const RegisterLink = styled(Link)`
	display: flex;
	margin-left: auto;
	width: max-content;
	background-color: #ccc;
	color: black;
	text-decoration: none;
	align-items: center;
	height: 2rem;

	transition: all 80ms linear;

	&:hover {
		background-color: #444;
		color: white;
	}
`;
