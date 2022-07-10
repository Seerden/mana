import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	sharedLinkStyle,
	sharedOutlineStyle,
	sharedPageTitleStyle,
} from "../../helpers/theme/theme";

const fieldWidth = "12em";

export const Form = styled.form`
	${sharedOutlineStyle};

	display: flex;
	flex-flow: column wrap;
	margin: 0 auto;
	width: max-content;
	padding: 2em;
`;

export const Title = styled.h2`
	${sharedPageTitleStyle};
`;

export const Button = styled.input`
	margin-top: 1rem;
	display: block;
	width: ${fieldWidth};
	padding: 0.5em 1em;
`;

export const Paragraph = styled.p`
	margin-top: 1em;
`;

export const RegisterLink = styled(Link)`
	${sharedLinkStyle};
`;

export const Input = styled.input`
	width: ${fieldWidth};
	padding: 0.3em 0.1em;
	text-indent: 0.2em;
`;

export const Label = styled.label`
	font-size: 1.1em;
	margin-bottom: 0.3em;

	&:not(:nth-of-type(1)) {
		margin-top: 0.4em;
	}
`;

export const Message = styled.p`
	outline: 2px solid orange;
	background-color: #222;
	padding: 1em 2em;
	font-size: 1.05em;
	margin-bottom: 1em;
`;
