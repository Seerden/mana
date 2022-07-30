import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { sharedButtonStyle, sharedHeadingStyle } from "../../helpers/theme/theme";

export const NewListLink = styled(Link)`
	${sharedButtonStyle};

	color: black;
	width: max-content;
`;

export const Header = styled.header`
	overflow: hidden;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 1rem 2.5rem;
	outline: 1px solid #363636;
	box-shadow: 0 0 1rem 0.1rem black;
`;

export const Heading = styled.header`
	${sharedHeadingStyle};

	margin-top: 1rem;
`;

export const Lists = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1.2rem;
`;

export const Sort = styled.div`
	width: max-content;
`;

export const SortSelect = styled.select`
	direction: rtl;
	display: flex;
	outline: none;
	padding: 0.5rem;
	border: 2px solid transparent;
	background-color: #363636;
	box-shadow: 5px 5px 0.5em -2px black;

	outline: 1px solid #444;
	color: azure;
	transition: all 100ms linear;

	&:hover,
	&:focus {
		border-color: deepskyblue;
	}
`;

const sharedLabelProps = css`
	font-size: 1.2rem;
	font-weight: 500;
	display: flex;
	margin-bottom: 0.2rem;
`;
export const SortLabel = styled.label`
	${sharedLabelProps};

	justify-content: flex-end;
`;

export const Filter = styled.div`
	width: 20rem;
	white-space: nowrap;
`;

export const FilterInput = styled.input`
	display: inline-block;
	width: 20rem;
	padding: 0.5rem 1rem;
	background-color: rgb(36, 36, 36);
	color: white;
	border-radius: 3px;
	outline: 1px solid #444;
	box-shadow: 0 0 0.5rem black;
	transition: all 100ms linear;
	outline: none;
	border: 2px solid #333;

	&::placeholder {
		color: #aaa;
	}

	&:focus {
		border-color: deepskyblue;
		box-shadow: 5px 5px 1.5em -2px black;
	}
`;

export const FilterLabel = styled.label`
	${sharedLabelProps};
`;
