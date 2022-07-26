import { QueryClient } from "@tanstack/react-query";

export default function useInitializeQueryClient() {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
				cacheTime: 5 * 60 * 1000, // 5 minutes
				refetchOnWindowFocus: true,
			},
		},
	});

	return client;
}
