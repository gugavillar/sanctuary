import { queryOptions } from '@tanstack/react-query'

import { getDocumentCategories } from '../usecase/getCategories'

export const documentCategoryQuery = () =>
	queryOptions({
		queryFn: getDocumentCategories,
		queryKey: ['document-category'],
		select: (data) => data?.map((item) => ({ label: item.category, value: item.id })),
	})
