import React, { memo } from "react";
import { colorBySaturation } from "helpers/list.api";
import "./SaturationFilter.scss";
import { FilterInterface } from "types/list.types";
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

	const labelButtonStyles: React.CSSProperties = {
		boxShadow: `0 8px 0 -7px ${
			saturationFilter ? colorBySaturation(saturationFilter.level) || "#333" : "#333"
		}, 0 0 1rem black`,
		border: `2px solid ${
			saturationFilter ? colorBySaturation(saturationFilter.level) || "#333" : "#333"
		}`,
	};

	const iconsDivStyles: React.CSSProperties = {
		border: `2px solid ${
			saturationFilter ? colorBySaturation(saturationFilter.level) : "#333"
		}`,
	};

	const filterDivStyles: React.CSSProperties = {
		border: `2px solid ${
			saturationFilter ? colorBySaturation(saturationFilter.level) : "#333"
		}`,
	};

	return (
		<>
			<div className="SaturationFilter">
				{filterDisplayState === "initial" && (
					<>
						<button
							onClick={() => setFilterDisplayState("level")}
							className="SaturationFilter__label"
							style={labelButtonStyles}
						>
							Filter by saturation level
							<input
								type="button"
								value="Reset"
								className="SaturationFilter__reset"
								onClick={(e) => {
									e.stopPropagation();
									setSaturationFilter({ level: undefined, direction: "any" });
								}}
							/>
						</button>
					</>
				)}

				{filterDisplayState === "level" && (
					<div className="SaturationFilter__icons" style={iconsDivStyles}>
						{icons}
					</div>
				)}

				{filterDisplayState === "direction" && (
					<div className="SaturationFilter__filter" style={filterDivStyles}>
						<div className="SaturationFilter__direction">{directionButtons}</div>
					</div>
				)}
			</div>
		</>
	);
});

export default SaturationFilter;
