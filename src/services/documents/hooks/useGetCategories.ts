import { queryOptions } from '#/lib/query-client'

import { getDocumentCategories } from '../usecase/getCategories'

export const documentCategoryQuery = () =>
	queryOptions({
		queryFn: getDocumentCategories,
		queryKey: ['document-category'],
		select: (data) => data?.map((item) => ({ label: item.category, value: item.id })),
	})
