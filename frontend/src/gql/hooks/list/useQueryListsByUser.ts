import { gql } from "graphql-request";
import { useQuery } from "react-query";
import requestClient from "../../../components/newlist/helpers/request-client";
import { List } from "../../codegen-output";
import { listPropsFragment } from "../../fragments/list-fragments";
import { termPropsFragment } from "../../fragments/term-fragments";

/**
 * NOTE: TermProps fragment does not by default include `term.saturation`.
 */

const query = gql`
	${listPropsFragment}
	${termPropsFragment}
	query {
		listsByUser {
			...ListProps
			terms(populate: true) {
				...TermProps
			}
		}
	}
`;

const req = async () => (await requestClient.request(query)).listsByUser;

export default function useQueryListsByUser() {
	return useQuery<List[]>(["lists"], () => req());
}
