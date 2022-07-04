import { colorBySaturation } from "helpers/list.api";
import React, { memo } from "react";
import { FilterInterface } from "types/list.types";
import * as S from "./SaturationFilter.style";
import { useSaturationFilter } from "./useSaturationFilter";

interface SaturationFilterProps {
	filter: FilterInterface;
	setFilter: React.Dispatch<React.SetStateAction<FilterInterface>>;
}

const SaturationFilter = memo(({ setFilter }: SaturationFilterProps) => {
	const {
		filterDisplayState,
		setFilterDisplayState,
		saturationFilter,
		setSaturationFilter,
		icons,
		directionButtons,
	} = useSaturationFilter(setFilter);

	return (
		<>
			<S.SaturationFilter>
				{filterDisplayState === "initial" && (
					<>
						<S.FilterLabelButton
							onClick={() => setFilterDisplayState("level")}
							borderAndShadowColor={
								saturationFilter
									? colorBySaturation(saturationFilter.level) ?? "#333"
									: "#333"
							}
						>
							Filter by saturation level
							<S.ResetButton
								type="button"
								value="Reset"
								onClick={(e) => {
									e.stopPropagation();
									setSaturationFilter({
										level: undefined,
										direction: "any",
									});
								}}
							/>
						</S.FilterLabelButton>
					</>
				)}

				{filterDisplayState === "level" && (
					<S.FilterIcons
						borderColor={
							saturationFilter ? colorBySaturation(saturationFilter.level) : "#333"
						}
					>
						{icons}
					</S.FilterIcons>
				)}

				{filterDisplayState === "direction" && (
					<S.Filter
						borderColor={
							saturationFilter ? colorBySaturation(saturationFilter.level) : "#333"
						}
					>
						<S.Direction>{directionButtons}</S.Direction>
					</S.Filter>
				)}
			</S.SaturationFilter>
		</>
	);
});

export default SaturationFilter;
