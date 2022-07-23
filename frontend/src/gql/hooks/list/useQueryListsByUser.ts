import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { uri } from "../../../helpers/graphql-uri";
import { List, User } from "../../codegen-output";

/**
 * TODO: Check if TermProps and ListProps fragments work without being
 * specifically called using `${listPropsFragment}` etc.
 *
 * NOTE: TermProps fragment does not by default include `term.saturation`.
 */

const query = gql`
	query ($user_id: Float!) {
		listsByUser(user_id: $user_id) {
			...ListProps
			terms(populate: true) {
				...TermProps
			}
		}
	}
`;

const req = (user_id: User["user_id"]) => request(uri, query, { user_id });

export default function useQueryListsByUser(user_id: User["user_id"]) {
	return useQuery<List[]>(["lists"], () => req(user_id));
}
