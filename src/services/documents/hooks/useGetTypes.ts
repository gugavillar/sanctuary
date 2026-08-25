import { queryOptions } from '@tanstack/react-query'

import { getDocumentTypes } from '../usecase/getTypes'

export const documentTypeQuery = () =>
	queryOptions({
		queryFn: getDocumentTypes,
		queryKey: ['document-types'],
		select: (data) => data?.map((item) => ({ label: item.type, value: item.id })),
	})
