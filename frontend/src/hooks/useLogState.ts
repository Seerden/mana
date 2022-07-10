import { useEffect } from "react";

/**
 * useEffect hook to log whenever a piece of state (or its initializer) changes
 */
export const useLogState = (name, state, setState) => {
	useEffect(() => {
		if (state) {
			console.log(`${name} changed:`, state);
		}
	}, [name, state, setState]);
};
