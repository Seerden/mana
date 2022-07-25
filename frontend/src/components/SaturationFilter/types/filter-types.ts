/* eslint-disable no-mixed-spaces-and-tabs */

import { Operator } from "../FilterButtons";

// TODO: very reusable type, consider globally defining this.
type Direction = "forwards" | "backwards";

type FilterDirection = Direction | "any";

export type TermFilter = {
	direction: FilterDirection;
	operator: Operator;
	value?: number;
};

export type FilterUpdate =
	| {
			field: "value";
			value: number;
	  }
	| { field: "direction"; value: TermFilter["direction"] }
	| { field: "operator"; value: Operator };

export enum FilterStep {
	INITIAL = 0,
	DIRECTION = 1,
	OPERATOR = 2,
	LEVEL = 3,
}
