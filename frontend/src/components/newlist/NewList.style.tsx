import { FaLongArrowAltRight } from "react-icons/fa";
import styled from "styled-components";
import { sharedButtonStyle, sharedPageTitleStyle } from "../../helpers/theme/theme";

export const Title = styled.h1`
	${sharedPageTitleStyle};
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media screen and (max-width: 1280px) {
		max-width: 50rem;
	}

	max-width: 40rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
`;

// Should be renamed to Header or something
export const NameAndLanguages = styled.section`
	width: 100%;
`;

export const NameLabel = styled.label`
	font-size: 1.5rem;
	margin-bottom: 0.2rem;

	&:not(:nth-of-type(1)) {
		margin-top: 0.8rem;
	}
`;

const indexWidth = "2rem";

export const Languages = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

export const Language = styled.div``;

export const LanguageLabel = styled.label`
	position: relative;
	display: block;
	width: 100%;
	font-weight: 500;
	background-color: #111;
	z-index: 1;
	padding: 0.4rem 0.9rem;
	outline: 3px solid #111;

	::placeholder {
		font-style: italic;
	}
`;

export const Input = styled.input`
	outline: none;
	border: 2px solid transparent;

	font-size: 1rem;

	background-color: #333;
	color: azure;

	border-radius: 2px;

	display: inline-block;
	z-index: 0;
	width: 100%;

	box-shadow: 0 0 0.4rem black;
	padding: 0.75rem 1rem;

	transition: all 80ms linear;

	&:hover {
		background-color: #444;
		border-color: #111;
	}

	&:not(:focus) {
		&::placeholder {
			color: #aaa;
		}
	}

	&:focus {
		border: 2px solid black;
		border-radius: 5px;
		background-color: #555;

		&::placeholder {
			opacity: 0;
		}
	}
`;

export const NameInput = styled(Input)`
	max-width: 18rem;
`;

export const LanguageInput = styled(Input)`
	padding: 0.75rem 0.5rem;
`;

export const LanguageIcon = styled(FaLongArrowAltRight)`
	fill: ${(p) => p.theme.colors.blue.main};
	margin-top: 1.5rem;
	padding: 0;
`;

export const Buttons = styled.section`
	display: flex;
	flex-direction: row;
	gap: 1rem;

	place-self: flex-start;
`;

export const Button = styled.input`
	${sharedButtonStyle};

	color: #111;
	width: max-content;
	margin-top: 1rem;
`;

export const Terms = styled.section`
	width: 100%;
`;

export const TermsHeader = styled.div`
	display: flex;
	margin: 0 auto;
	border-radius: 0 0 5px 0;
`;

export const TermsHeaderSide = styled.span`
	display: inline-block;
	width: 50%;
	padding: 0.75rem 0.5rem;
	background-color: #111;

	&:nth-of-type(even) {
		width: calc(50% - #${indexWidth});
	}
`;
