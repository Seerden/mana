import { List } from "gql/codegen-output";
import { listsByIdQuery } from "gql/operations/list-operations";
import { request } from "graphql-request";
import { useQuery } from "react-query";

const uri = process.env.GRAPHQL_URI;

export function useQueryListsById(
	ids: [string],
	options?: { onSuccess: (data: List[]) => void }
) {
	const { data, refetch, isLoading, isFetching, ...rest } = useQuery<List[]>(
		"listsById",
		async () => {
			const { listsById } = await request(uri, listsByIdQuery, { ids });
			return listsById;
		},
		{
			enabled: false,
			retry: false,
			onSuccess(lists) {
				if (options?.onSuccess && lists?.length) {
					options.onSuccess(lists);
				}
			},
		}
	);
	return { data, refetch, isLoading, isFetching, ...rest };
}
