import type { UUID } from 'crypto'

import { api } from '#/services/api'

export type GetDocumentCategoriesReturn = {
	id: UUID
	category: string
}

export const getDocumentCategories = async () => {
	const response = await api.get<Array<GetDocumentCategoriesReturn>>('/documents/categories')
	return response.data
}
