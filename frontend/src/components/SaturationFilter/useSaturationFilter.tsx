import { colorMap } from "helpers/list.api";
import React, { useEffect, useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { FilterInterface } from "types/list.types";
import SaturationIcon from "./SaturationIcon";

export function useSaturationFilter(setFilter) {
	const [saturationFilter, setSaturationFilter] = useState<
		FilterInterface["saturation"]
	>({
		level: undefined,
		direction: "any",
	});
	const [filterDisplayState, setFilterDisplayState] = useState("initial");

	useEffect(() => {
		setFilter((cur) => ({ ...cur, saturation: saturationFilter }));
	}, [saturationFilter, setFilter]);

	function handleIconClick(level) {
		setSaturationFilter((cur) => ({ ...cur, level }));
		setFilterDisplayState("direction");
	}

	function handleDirectionIconClick(direction) {
		setSaturationFilter((cur) => ({ ...cur, direction }));
		setFilterDisplayState("initial");
	}

	function makeIcons() {
		const icons = Object.keys(colorMap).map((level) => {
			const levelNumber = Number(level);
			return (
				<React.Fragment key={`saturation-wrapper-${level}`}>
					<div
						onClick={() => {
							handleIconClick(level);
						}}
						className="SaturationFilter__icon--wrapper"
					>
						<SaturationIcon
							classes="SaturationFilter__icon"
							key={`saturation-filter-level-${level}`}
							saturation={levelNumber}
						/>
					</div>
				</React.Fragment>
			);
		});
		return icons;
	}

	const icons = makeIcons();

	const directionButtons = ["forwards", "backwards", "any"].map((direction) => {
		return (
			<button
				className="SaturationFilter__direction--button"
				key={`saturation-filter-${direction}`}
				value={direction}
				onClick={() => handleDirectionIconClick(direction)}
			>
				<span>{direction}</span>
				{direction !== "any" && (
					<span>
						{direction === "forwards" ? <BiArrowToRight /> : <BiArrowToLeft />}
					</span>
				)}
			</button>
		);
	});

	return {
		filterDisplayState,
		setFilterDisplayState,
		saturationFilter,
		setSaturationFilter,
		icons,
		directionButtons,
	} as const;
}
