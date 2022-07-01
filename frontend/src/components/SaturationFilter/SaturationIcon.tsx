import { colorBySaturation } from "helpers/list.api";
import React from "react";

function makeTooltip(direction, saturation) {
	if (saturation) {
		if (!(typeof saturation[direction] === "number")) {
			return "Not enough reviews to judge memorization. Get on it!";
		}

		if (saturation < 2) {
			return `${direction}: Review soon!`;
		}

		return `${direction}: No need to review yet`;
	}

	return `${direction}: No need to review yet`;
}

interface SaturationIconProps {
	direction?: "forwards" | "backwards";
	classes?: string;
	saturation?: { forwards: number; backwards: number } | number;
	style?: React.CSSProperties;
}

// TODO: since we're using Styled components now, we don't want `classes` (and
// possibly the same for `style`, since we can simply extend this thing with styled()

function SaturationIcon({ direction, classes, saturation, style }: SaturationIconProps) {
	const color =
		typeof saturation === "number"
			? colorBySaturation(saturation)
			: colorBySaturation(saturation, direction);

	const saturationIconStyle = {
		width: "20px",
		height: "20px",
		padding: "0rem",
		borderRadius: "50%",
		backgroundColor: color || "#333",
		boxShadow: "0 0 1rem black",
		border: "2px solid transparent",
		...style,
	};

	return (
		<span
			title={direction ? makeTooltip(direction, saturation) : ""}
			style={saturationIconStyle}
			className={classes}
		/>
	);
}

export default SaturationIcon;
