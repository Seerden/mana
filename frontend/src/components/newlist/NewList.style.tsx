import { FaLongArrowAltRight } from "react-icons/fa";
import styled, { css } from "styled-components";
import {
	sharedButtonStyle,
	sharedPageTitleStyle,
	subsectionHeaderStyle,
	tempSectionStyle,
} from "../../helpers/theme/theme";

export const Title = styled.h1`
	${sharedPageTitleStyle};
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;

	max-width: 40rem;

	@media screen and (max-width: 1280px) {
		max-width: 50rem;
	}

	@media screen and (min-width: 1920px) {
		display: grid;
		grid-template-areas:
			"title title"
			"terms meta"
			"terms buttons"
			"terms _";
		grid-template-columns: repeat(2, max-content);
		max-width: max-content;
		grid-gap: 0 4rem;
	}

	margin: 0 auto;
`;

// Should be renamed to Header or something
export const Section = styled.section`
	${tempSectionStyle};
	width: 100%;
	margin-top: 0;
`;

export const MetaSection = styled(Section)`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media screen and (min-width: 1280px) {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		grid-area: meta;
	}
`;

export const NameSubsection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const SectionLabel = styled.label`
	${subsectionHeaderStyle}

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

export const LanguageLabel = styled.label`
	width: 100%;
	font-weight: 500;
	background-color: #191919;
	padding: 0.3rem 0.1rem;
	margin-top: 0.4rem;
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
	padding: 0.45rem 0.6rem;

	transition: all 80ms linear;

	&:hover {
		background-color: #444;
		border-color: #111;
	}

	&:not(:focus) {
		&::placeholder {
			color: #aaa;
			font-size: 0.85rem;
		}
	}

	&:focus,
	&:active {
		border: 2px solid black;
		border-radius: 0;
		box-shadow: 0 0 0.4rem black;

		transition: all ease-in 35ms;

		&::placeholder {
			opacity: 0;
		}
	}
`;

export const NameInput = styled(Input)`
	max-width: 18rem;
`;

export const LanguageInput = styled(Input)`
	padding: 0.45rem 0.5rem;
	font-size: 0.9rem;
`;

export const LanguageIcon = styled(FaLongArrowAltRight)`
	fill: ${(p) => p.theme.colors.blue.main};
	margin-top: 1.7rem;
	padding: 0;
`;

export const Buttons = styled.section<{ isStuck?: boolean }>`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	border: 3px solid transparent;
	position: sticky;
	top: 125px;

	place-self: flex-end;

	@media screen and (min-width: 1920px) {
		place-self: flex-start;
	}

	padding: 0.8rem 0;

	${(p) =>
		p.isStuck &&
		css`
			background-color: #191919;
			padding: 0.8rem 3rem;
			transform: translateX(-30px);
			border-color: #444;
			border-radius: 0;
		`}
`;

export const Button = styled.input`
	${sharedButtonStyle};

	color: #111;
	width: max-content;
	margin: 0;
`;

export const TermsHeader = styled.div`
	display: flex;
	margin: 0 auto;
	margin-left: ${indexWidth};
	border-radius: 0 0 5px 0;
`;

export const TermsHeaderSide = styled.span`
	overflow: hidden;
	width: calc(50% - 0.6rem); // the 0.6rem is presumably 2*some padding width somewhere
	background-color: #111;
	padding: 0.4rem 0.8rem;

	&:nth-of-type(2) {
		width: calc(50% + 0.6rem);
	}
`;
