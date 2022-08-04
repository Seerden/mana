import { ReviewSessionWithoutUserIdInput } from "../../../gql/codegen-output";

/** Type guard to see if a string is a valid direection. */
export function isDirection(s: string): s is Direction {
	return ["forwards", "backwards"].includes(s);
}

/** Check if all of a reviewSession's required fields are valid. */
export function isValidReviewSession(session: Partial<ReviewSessionWithoutUserIdInput>) {
	const { direction, start_date, n, list_ids, set_ids, saturation_threshold } = session;

	if (
		!list_ids?.length &&
		!set_ids?.length &&
		!(typeof saturation_threshold === "number")
	) {
		return false;
	}

	return (
		isDirection(direction) &&
		typeof n === "number" &&
		n > 0 &&
		typeof start_date === "number"
	);
}
