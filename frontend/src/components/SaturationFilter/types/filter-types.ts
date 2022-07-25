import { operators } from "../helpers/operators";

export type FilterValue = {
	value?: number;
	operator: `${operators}`;
};

export type ThresholdKey = "minimum" | "maximum";

export type Threshold = {
	[k in ThresholdKey]?: FilterValue;
};

// TODO: very reusable type, consider globally defining this.
type Direction = "forwards" | "backwards";

export type TermFilter = {
	[k in Direction]?: Threshold;
};
