type Direction = "forwards" | "backwards";

export const colorMap = {
	0: "orangered",
	1: "goldenrod",
	2: "seagreen",
	3: "deepskyblue",
	4: "blueviolet",
};

export const colorBySaturation = (level: number) => {
	return level >= 0 ? colorMap[level as keyof typeof colorMap] : "#333";
};
