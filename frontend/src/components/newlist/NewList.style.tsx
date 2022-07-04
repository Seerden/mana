import { BiArrowToRight } from "react-icons/bi";
import styled from "styled-components";
import { sharedButtonStyle } from "../../helpers/theme/theme";

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
export const Name = styled.section`
	display: flex;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const NameLabel = styled.label`
	font-size: 1.5rem;
`;

export const NameInput = styled.input`
	width: 100%;
	padding: 1rem;
	font-size: 1.2rem;
	box-shadow: -0.4rem 0.4rem 0 -0.2rem #111;
	border-radius: 3px;
`;

const languageWidth = "40%";
const languageGap = "0.5rem";
const languageIconWidth = "2rem";
// $language-padding: 1rem;
const indexWidth = "2rem";

export const Languages = styled.div`
	width: 100%;
	background-color: #222;
	border-radius: 5px;
	padding: 1rem 0;
	justify-content: center;
	margin-top: 1rem;
	display: flex;
	gap: ${languageGap};
	align-items: center;
	box-shadow: -0.4rem 0.4rem 0 -0.2rem #111;
`;

export const Language = styled.div`
	width: ${languageWidth};
`;

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

export const LanguageInput = styled.input`
	background-color: #333;
	outline: none;
	border: none;
	color: azure;
	border-radius: 2px;
	box-shadow: 0 0 0.4rem black;
	padding: 0.75rem $language-padding;
	border: 2px solid transparent;

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
		background-color: #eee;
		color: #111;
		border-radius: 5px;
		&::placeholder {
			color: black;
		}
	}

	display: inline-block;

	z-index: 0;
	width: 100%;
`;

export const LanguageIcon = styled(BiArrowToRight)`
	width: ${languageIconWidth};
	padding: 0;
`;

export const Buttons = styled.section`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;

	gap: 1rem;
`;

export const Button = styled.input`
	${sharedButtonStyle};

	display: inline-block;
	color: #111;
	width: 15rem;
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
