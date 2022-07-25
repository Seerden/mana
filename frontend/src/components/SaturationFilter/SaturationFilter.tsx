import { colorBySaturation } from "helpers/list.api";
import { Initial } from "./FilterButtons";
import { FilterStep, useSaturationFilter } from "./hooks/useSaturationFilter";
import * as S from "./SaturationFilter.style";

function SaturationFilter() {
	const {
		filterStep,
		cycleFilterStep,
		termFilter,
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
					onStartClick={() => cycleFilterStep()}
					onResetClick={() => resetTermFilter()}
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
