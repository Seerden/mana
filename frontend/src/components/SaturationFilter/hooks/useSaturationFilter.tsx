import { colorMap } from "helpers/list.api";
import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { termFilterState } from "../../../state/filter";
import OperatorButton, {
	DirectionButton,
	SaturationThresholdButton,
} from "../FilterButtons";
import { Operator, operators } from "../helpers/operators";
import { FilterStep, FilterUpdate } from "../types/filter-types";

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

	const thresholdButtons = Object.keys(colorMap).map((level) => (
		<SaturationThresholdButton
			level={+level}
			key={`saturation-wrapper-${level}`}
			onClick={() => {
				handleFilterButtonClick({ field: "value", value: +level });
			}}
		/>
	));

	const directionButtons = ["forwards", "backwards", "any"].map(
		(direction: Direction | "any") => (
			<DirectionButton
				key={direction}
				direction={direction}
				onClick={() =>
					handleFilterButtonClick({ field: "direction", value: direction })
				}
			/>
		)
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
