import { QueryClient } from '@tanstack/react-query';

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
