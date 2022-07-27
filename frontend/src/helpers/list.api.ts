type Direction = "forwards" | "backwards";

/** Takes a list, returns all its sessions with the specified direction, and its
 * length.
 */
export const extractSessionsByDirection = (list, direction: Direction) => {
	// @todo: sessions currently don't exist as list.sessions entries.
	const sessionsByDirection = list.sessions?.filter(
		(sess) => sess.direction === direction
	);
	return [sessionsByDirection.length, sessionsByDirection];
};

export const colorMap = {
	0: "orangered",
	1: "goldenrod",
	2: "seagreen",
	3: "deepskyblue",
	4: "blueviolet",
};

export const colorBySaturation = (level: number) => {
	return level >= 0 ? colorMap[level] : "#333";
};
