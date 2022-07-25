export interface FilterInterface {
	saturation: {
		level: number | { forwards: number; backwards: number } | undefined;
		direction: "any" | "forwards" | "backwards";
	};
}
