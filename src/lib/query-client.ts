import { QueryClient } from '@tanstack/react-query'

export const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
			},
		},
	})

export { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
