import { useQuery } from "react-query";
import { request } from "graphql-request";
import { List } from "gql/codegen-output";
import { listsByIdQuery } from "gql/operations/list.operations";

const uri = process.env.GRAPHQL_URI;

export function useQueryListsById(ids: [string]) {
	const { data, refetch, isLoading, isFetching, ...rest } = useQuery<[List]>(
		"listsById",
		async () => {
			const { listsById } = await request(uri, listsByIdQuery, { ids });
			return listsById;
		},
		{
			enabled: false,
			retry: false,
		}
	);
	return { data, refetch, isLoading, isFetching, ...rest };
}
