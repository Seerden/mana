import { FilterInterface } from "components/list/types/list.types";
import { colorMap } from "helpers/list.api";
import React, { useEffect, useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import * as S from "./SaturationFilter.style";

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
					<S.IconWrapper
						onClick={() => {
							handleIconClick(level);
						}}
					>
						<S.FilterIcon
							key={`saturation-filter-level-${level}`}
							saturation={levelNumber}
						/>
					</S.IconWrapper>
				</React.Fragment>
			);
		});
		return icons;
	}

	const icons = makeIcons();

	const directionButtons = ["forwards", "backwards", "any"].map((direction) => {
		return (
			<S.DirectionButton
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
			</S.DirectionButton>
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
