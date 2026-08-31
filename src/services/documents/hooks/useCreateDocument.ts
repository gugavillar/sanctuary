import { useMutation, useQueryClient } from '#/lib/query-client'

import { createDocument } from '../usecase/createDocument'

export const useCreateDocument = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['documents'] })
		},
	})
}
