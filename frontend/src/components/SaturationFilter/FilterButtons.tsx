import { SyntheticEvent } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { Operator } from "./helpers/operators";
import * as S from "./SaturationFilter.style";

type InitialButtonProps = {
	onResetClick?: (e?: SyntheticEvent) => void;
	onStartClick?: (e?: SyntheticEvent) => void;
	color?: string;
};

export function Initial({ onStartClick, onResetClick, color }: InitialButtonProps) {
	return (
		<S.FilterLabelButton onClick={() => onStartClick?.()} borderAndShadowColor={color}>
			Click to filter terms
			<S.ResetButton type="button" value="Reset" onClick={(e) => onResetClick?.(e)} />
		</S.FilterLabelButton>
	);
}

type OperatorButtonProps = {
	operator: Operator;
	onClick?: () => void;
};

export default function OperatorButton({ operator, onClick }: OperatorButtonProps) {
	return (
		<S.OperatorButton key={operator} value={operator} onClick={() => onClick?.()}>
			<span>{operator}</span>
		</S.OperatorButton>
	);
}

type ThresholdButtonProps = {
	level: number;
	onClick?: (...args: any) => void;
};

export function SaturationThresholdButton({ level, onClick }: ThresholdButtonProps) {
	return (
		<S.IconWrapper onClick={() => onClick?.()}>
			<S.FilterIcon saturation={level} />
		</S.IconWrapper>
	);
}

type DirectionButtonProps = {
	direction: Direction | "any";
	onClick?: (...args: any) => void;
};

export function DirectionButton({ direction, onClick }: DirectionButtonProps) {
	return (
		<S.DirectionButton
			key={`saturation-filter-${direction}`}
			value={direction}
			onClick={() => onClick?.(direction)}
		>
			<span>{direction}</span>
			{direction !== "any" && (
				<span>
					{direction === "forwards" ? <BiArrowToRight /> : <BiArrowToLeft />}
				</span>
			)}
		</S.DirectionButton>
	);
}
