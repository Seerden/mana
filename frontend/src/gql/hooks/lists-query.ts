import request, { gql } from "graphql-request";
import { useRouteProps } from "hooks/routerHooks";
import { useQuery } from "react-query";

export function useQueryListsByUser() {
	const { params } = useRouteProps();
	const response = useQuery("listsByUser", async () => {
		const { listsByUser } = await request(
			process.env.GRAPHQL_URI,
			gql`
            query {
                listsByUser(owner: "${params.username}") {
                    _id
                    owner
                    name
                    from
                    to
                    reviewDates {
                        forwards,
                        backwards
                    }
                    sessions {
                        _id
                    }
                    terms(populate: false) {
                        _id
                    }
                }
            }
        `
		);

		return listsByUser;
	});
	return response;
}
