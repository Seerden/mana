/* eslint-disable no-mixed-spaces-and-tabs */
import { Operator } from "../OperatorButton";

// TODO: very reusable type, consider globally defining this.
type Direction = "forwards" | "backwards";

type FilterDirection = Direction | "any";

export type TermFilter = {
	direction: FilterDirection;
	operator: Operator;
	value: number;
};

export type FilterUpdate =
	| {
			field: "value";
			value: number;
	  }
	| { field: "direction"; value: TermFilter["direction"] }
	| { field: "operator"; value: Operator };
