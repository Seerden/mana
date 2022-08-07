/** Simple form input blur handler. Only works on top-level keys, don't use for nested form state. */
export const handleFormBlur = (e: any, state: any, setState: (args?: any) => any) => {
	const { name, value } = e.currentTarget;
	setState({ ...state, [name]: value });
};
