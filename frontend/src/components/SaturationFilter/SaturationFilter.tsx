import { colorBySaturation } from "helpers/list.api";
import { Initial } from "./FilterButtons";
import { useSaturationFilter } from "./hooks/useSaturationFilter";
import * as S from "./SaturationFilter.style";
import { FilterStep } from "./types/filter-types";

function SaturationFilter() {
	const {
		filterStep,
		termFilter,
		cycleFilterStep,
		resetFilterStep,
		resetTermFilter,
		thresholdButtons,
		operatorButtons,
		directionButtons,
	} = useSaturationFilter();

	const color = termFilter ? colorBySaturation(termFilter.value) ?? "#333" : "#333";

	return (
		<S.SaturationFilter>
			{filterStep === FilterStep.INITIAL && (
				<Initial
					color={color}
					onStartClick={() => {
						resetTermFilter();
						cycleFilterStep();
					}}
					onResetClick={(e) => {
						e.stopPropagation();
						resetFilterStep();
						resetTermFilter();
					}}
				/>
			)}

			{filterStep === FilterStep.OPERATOR && (
				<S.FilterIcons borderColor={color}>{operatorButtons}</S.FilterIcons>
			)}

			{filterStep === FilterStep.LEVEL && (
				<S.FilterIcons borderColor={color}>{thresholdButtons}</S.FilterIcons>
			)}

			{filterStep === FilterStep.DIRECTION && (
				<S.Filter borderColor={color}>
					<S.Direction>{directionButtons}</S.Direction>
				</S.Filter>
			)}
		</S.SaturationFilter>
	);
}

export default SaturationFilter;
