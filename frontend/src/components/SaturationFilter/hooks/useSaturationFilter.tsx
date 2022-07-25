import { colorMap } from "helpers/list.api";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { useRecoilState, useResetRecoilState } from "recoil";
import { termFilterState } from "../../../state/filter";
import OperatorButton, { Operator } from "../FilterButtons";
import { operators } from "../helpers/operators";
import * as S from "../SaturationFilter.style";
import { FilterUpdate } from "../types/filter-types";

export enum FilterStep {
	INITIAL = 0,
	DIRECTION = 1,
	OPERATOR = 2,
	LEVEL = 3,
}

export function useSaturationFilter() {
	const [termFilter, setTermFilter] = useRecoilState(termFilterState);
	const resetTermFilter = useResetRecoilState(termFilterState);

	const [filterStep, setFilterStep] = useState<number>(FilterStep.INITIAL);

	/**
	 * Cycle to the next filter step.
	 * @usage only called from handleFilterButtonClick after updating filter
	 * state.
	 */
	function cycleFilterStep() {
		// Cycle through domain [0,n) where n === Object.values(FilterStep).length
		setFilterStep((cur) => (cur + 1) % 4 ?? FilterStep.INITIAL);
	}

	/** Update filter state and move on to next filter step. */
	function handleFilterButtonClick({ field, value }: FilterUpdate) {
		setTermFilter((cur) => ({ ...cur, [field]: value }));
		cycleFilterStep();
	}

	const thresholdButtons = Object.keys(colorMap).map((level) => {
		return (
			<SaturationThresholdButton
				level={+level}
				key={`saturation-wrapper-${level}`}
				onClick={() => {
					handleFilterButtonClick({ field: "value", value: +level });
				}}
			/>
		);
	});

	const directionButtons = ["forwards", "backwards", "any"].map(
		(direction: Direction | "any") => {
			return (
				<DirectionButton
					key={direction}
					direction={direction}
					onClick={() =>
						handleFilterButtonClick({ field: "direction", value: direction })
					}
				/>
			);
		}
	);

	const operatorButtons = Object.values(operators).map((operator: Operator) => (
		<OperatorButton
			key={operator}
			operator={operator}
			onClick={() => handleFilterButtonClick({ field: "operator", value: operator })}
		/>
	));

	return {
		filterStep,
		cycleFilterStep,
		termFilter,
		resetTermFilter,
		operatorButtons,
		thresholdButtons,
		directionButtons,
	} as const;
}

type ThresholdButtonProps = {
	level: number;
	onClick?: (...args: any) => void;
};

function SaturationThresholdButton({ level, onClick }: ThresholdButtonProps) {
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
