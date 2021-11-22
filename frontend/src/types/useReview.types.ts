import { Term } from "gql/codegen-output";
import { makeNewSaturationLevels } from "helpers/srs/saturation";

export type TermUpdatePassfail = {
	// @todo: this should be a union of objects. one for saturation case, one for passfail case
	type: "passfail";
	passfail: PassFail;
	currentTerm: Term;
};

export type TermUpdateSaturation = {
	type: "saturation";
	newSaturationLevels: ReturnType<typeof makeNewSaturationLevels>;
};

export type TermUpdateDate = {
	type: "date";
};
