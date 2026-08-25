import { QueryClient } from '@tanstack/react-query'

export const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
			},
		},
	})

export { useQuery } from '@tanstack/react-query'
