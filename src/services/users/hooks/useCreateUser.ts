import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createUser } from '../usecase/createUser'

export const useCreateUser = () => {
	const queryClient = useQueryClient()
	const { isPending, mutateAsync } = useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['users'],
			})
		},
	})
	return { isPending, mutateAsync }
}
