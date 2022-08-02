import { atom } from "recoil";
import { ReviewSessionInput } from "../../../gql/codegen-output";

export const reviewSessionState = atom<Partial<ReviewSessionInput>>({
	default: {},
	key: "reviewSessionState",
});
