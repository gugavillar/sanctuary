import type { UUID } from 'node:crypto'

import { api } from '#/services/api'

export type GetDocumentTypeReturn = {
	id: UUID
	type: string
}

export const getDocumentTypes = async () => {
	const response = await api.get<Array<GetDocumentTypeReturn>>('/documents/types')
	return response.data
}
