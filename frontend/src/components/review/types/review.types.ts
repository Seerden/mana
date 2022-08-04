import { ReviewSessionEntryInput } from "../../../gql/codegen-output";

export type PassFailArray = Array<"pass" | "fail">;
export type ReviewStage = "before" | "started" | "after";

export type SessionEntryWithoutTimeOnCard = Omit<ReviewSessionEntryInput, "time_on_card">;
