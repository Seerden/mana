import { colorBySaturation } from "helpers/list.api";
import React from "react";

interface SaturationIconProps {
	direction?: "forwards" | "backwards";
	saturation?: number;
	style?: React.CSSProperties;
}

// TODO: consider dropping the 'style' property, and instead extend or select
// SaturationIcon inside another styled component)
function SaturationIcon({ direction, saturation, style }: SaturationIconProps) {
	const color = colorBySaturation(saturation);

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
			title={/* TODO: add tooltip based on saturation level */ ""}
			style={saturationIconStyle}
		/>
	);
}

export default SaturationIcon;
