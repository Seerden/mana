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

/**
 * Simple form input blur handler. Only works on top-level keys, don't use for nested form state.
 */
export const handleFormBlur = (e, state, setState) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value });
};
