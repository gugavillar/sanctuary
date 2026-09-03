import { useMutation } from '#/lib/query-client'

import { updatePassword } from '../usecase/updatePassword'

export const useUpdatePassword = () => {
	const { isPending, mutateAsync } = useMutation({
		mutationFn: updatePassword,
	})
	return { isPending, mutateAsync }
}
