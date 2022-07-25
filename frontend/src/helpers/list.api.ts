import { Term } from "gql/codegen-output";

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

/**
 * Extract all sessions with a given direction from a term's history
 * @param {Object} term
 */
export const termSessionsByDirection = (term: Term, direction: Direction) => {
	return term.history?.filter((session) => session?.direction === direction);
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
