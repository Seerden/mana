import { Term } from "gql/codegen-output";

export interface FilterInterface {
	saturation: {
		level: number | { forwards: number; backwards: number } | undefined;
		direction: "any" | "forwards" | "backwards";
	};
}

export interface TruncatedTerm {
	term: Term;
	element: JSX.Element;
	saturation: {
		forwards: number | null;
		backwards: number | null;
	};
}
