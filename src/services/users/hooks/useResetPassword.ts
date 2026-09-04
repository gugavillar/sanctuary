import { useMutation } from '#/lib/query-client'

import { resetPassword } from '../usecase/resetPassword'

export const useResetPassword = () => {
	const { isPending, mutateAsync } = useMutation({
		mutationFn: resetPassword,
	})
	return { isPending, mutateAsync }
}
