import { QueryClient } from "react-query";

export default function useQueryClient() {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				cacheTime: 0,
				refetchOnWindowFocus: false,
			},
		},
	});

	return [client] as const;
}
