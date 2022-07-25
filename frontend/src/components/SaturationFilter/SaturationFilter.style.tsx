import styled, { css } from "styled-components";
import SaturationIcon from "./SaturationIcon";

const pickerWidth = "17rem";

export const SaturationFilter = styled.div`
	width: max-content;
	box-shadow: 0 0 0.3rem black;

	transition: all 100ms linear;
	border-radius: 7px;
	background-color: #111;

	&:hover {
		background-color: #222;
	}
`;

const buttonProps = css`
	user-select: none;
	display: flex;
	align-items: center;
	height: 60%;
	padding: 0 0.3rem;
	border: none;
	outline: none;
	color: white;

	border-radius: 5px;
	background-color: #333;
	transition: all 100ms ease-in;

	&:hover {
		background-color: #444;
	}
`;

// some styles are shared between __icons, __label, __direction
const iconsLabelDirectionProps = css`
	height: 3rem;
	align-items: center;
	width: ${pickerWidth};
	padding: 0rem 0.6rem;
	display: flex;
	justify-content: center;
	border-radius: 5px;
`;

export const ResetButton = styled.input`
	margin-left: 1rem;

	${buttonProps}
`;

export const FilterLabelButton = styled.button<{ borderAndShadowColor?: string }>`
	${iconsLabelDirectionProps};

	background-color: inherit;
	display: flex;
	align-items: center;
	justify-self: center;
	justify-content: center;
	width: ${pickerWidth};
	border-radius: 5px;

	border: none;
	outline: none;
	color: white;
	transition: all 100ms ease;

	&:hover {
		background-color: #222;
	}

	box-shadow: 0 8px 0 -7px ${(p) => p.borderAndShadowColor}, 0 0 1rem black;
	border: 2px solid ${(p) => p.borderAndShadowColor};
`;

export const FilterIcons = styled.div<{ borderColor?: string }>`
	${iconsLabelDirectionProps};

	border: 2px solid ${(p) => p.borderColor};
`;

export const Direction = styled.div`
	display: flex;
	justify-content: space-evenly;
	height: 100%;
	align-items: center;
`;

export const DirectionButton = styled.button`
	${buttonProps};

	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
	align-items: center;
`;

export const OperatorButton = styled(DirectionButton)`
	min-width: 1.5rem;
	justify-content: center;
`;

export const Filter = styled.div<{ borderColor?: string }>`
	position: relative;
	border-radius: 5px;
	height: 3rem;
	width: 17rem;
	align-items: center;

	border: 2px solid ${(p) => p.borderColor};
`;

export const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	justify-self: center;
	height: 100%;
	width: 40px;
	border-radius: 10px;

	transition: all 70ms ease;

	&:hover {
		background-color: #333;
	}
`;

export const FilterIcon = styled(SaturationIcon)`
	display: flex;
	transition: all 50ms ease-in;

	box-shadow: 0 0 4px black !important;

	&:hover {
		transform: scale(1.04);
		box-shadow: 0 0 0.2rem black !important;
	}
`;
