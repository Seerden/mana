import { QueryClient } from "@tanstack/react-query";

export default function useInitializeQueryClient() {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
				refetchOnMount: true,
				cacheTime: 5 * 60 * 1000, // 5 minutes
				refetchOnWindowFocus: true,
			},
		},
	});

	return client;
}
