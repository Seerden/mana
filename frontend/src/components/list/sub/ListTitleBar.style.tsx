import { AiOutlineEdit } from "react-icons/ai";
import styled from "styled-components";
import { tempSectionStyle } from "../../../helpers/theme/theme";
import { DeleteButtonWrapper } from "../../_shared/DeleteToggle.style";

const regularPadding = "0.5rem 1rem";

export const TitleBar = styled.section`
	${tempSectionStyle};

	min-height: 60px;
	height: max-content;
	margin-bottom: 0;
	padding: 0;
	border: none;

	justify-content: space-between;
	align-items: center;
`;

export const TitleBarHeader = styled.header`
	display: flex;

	flex-flow: row wrap;

	@media screen and (max-width: 768px) {
		flex-flow: column-reverse wrap;

		display: grid;
		grid-template-areas:
			"lang . ."
			"title . button";
	}

	align-items: stretch;

	${DeleteButtonWrapper} {
		grid-area: button;
		place-self: flex-end;
	}
`;

export const EditIcon = styled(AiOutlineEdit)`
	fill: #555;
	align-self: center;
	position: absolute;
	right: 5px;
	top: 5px;
`;

export const ListName = styled.input`
	min-width: 5rem;
	padding: 0.7rem 1.8rem;
	font-size: 1.3rem;
	color: white;
	border: 2px solid transparent;
	background-color: #232323;

	&:focus,
	&:active {
		border-color: orange;
		transition: all 35ms linear;
		background-color: #282828;
		outline: 1px solid #444;

		& ~ ${EditIcon} {
			fill: orange;
			width: 25px;
			height: 25px;
			transition: all 45ms ease-out;
		}
	}

	&:hover:not(:focus) {
		text-decoration: underline;
	}
`;

export const ListLanguages = styled.span`
	margin-bottom: 0;
	background-color: #282828;
	color: azure;
	padding: ${regularPadding};
	display: inline-flex;
	align-items: center;
	min-width: max-content;
	max-width: max-content;
	font-weight: 500;
	border-radius: 0 8px 8px 0;
	grid-area: lang;
`;
