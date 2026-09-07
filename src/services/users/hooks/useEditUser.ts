import { useMutation, useQueryClient } from '#/lib/query-client'

import { editUser } from '../usecase/editUser'

export const useEditUser = () => {
	const queryClient = useQueryClient()
	const { isPending, mutateAsync } = useMutation({
		mutationFn: editUser,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['users'],
			})
			queryClient.invalidateQueries({
				queryKey: ['user'],
			})
		},
	})
	return { isPending, mutateAsync }
}
