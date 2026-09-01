import type { UUID } from 'crypto'

import { api } from '#/services/api'

export type GetDocumentsReturn = {
	id: UUID
	title: string
	identification: string | null
	description: string | null
	tags: Array<string>
	type: { type: string }
	category: { category: string }
}

export const getDocuments = async () => {
	const response = await api.get<Array<GetDocumentsReturn>>('/documents/list')
	return response.data
}
