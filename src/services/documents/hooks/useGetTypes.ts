import { queryOptions } from '#/lib/query-client'

import { getDocumentTypes } from '../usecase/getTypes'

export const documentTypeQuery = () =>
	queryOptions({
		queryFn: getDocumentTypes,
		queryKey: ['document-types'],
		select: (data) => data?.map((item) => ({ label: item.type, value: item.id })),
	})
