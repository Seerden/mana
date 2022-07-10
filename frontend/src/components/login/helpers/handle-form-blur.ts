/**
 * Simple form input blur handler. Only works on top-level keys, don't use for nested form state.
 */
export const handleFormBlur = (e, state, setState) => {
	const { name, value } = e.currentTarget;
	setState({ ...state, [name]: value });
};
