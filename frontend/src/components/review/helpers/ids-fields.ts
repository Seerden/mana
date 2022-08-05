import { ReviewParamsInput } from "../../../gql/codegen-output";

export const idsFields = ["term_ids", "list_ids", "set_ids"] as Array<
	keyof ReviewParamsInput
>;
