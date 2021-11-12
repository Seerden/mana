import { NewListTermInput } from "gql/codegen-output";

export type FormOutput = {
	owner?: string;
	name?: string;
	from?: string;
	to?: string;
	terms?: NewListTermInput[];
};

export type FocusIndex = {
	index: number;
	side?: "from" | "to";
};