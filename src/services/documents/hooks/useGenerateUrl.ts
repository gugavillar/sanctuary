import { useMutation } from '#/lib/query-client'

import { generateUrl } from '../usecase/generateUrl'

export const useGenerateUrl = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: generateUrl,
	})
	return { isPending, mutateAsync }
}
