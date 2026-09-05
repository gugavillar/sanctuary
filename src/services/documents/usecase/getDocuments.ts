import type { UUID } from 'node:crypto'

import { api } from '#/services/api'

type Document = {
	id: UUID
	title: string
	identification: string | null
	description: string | null
	tags: Array<string>
	type: { type: string }
	category: { category: string }
}

export type GetDocumentsReturn = {
	currentPage: number
	documents: Array<Document>
	perPage: number
	totalCount: number
	totalPages: number
}

export const getDocuments = async ({ page, search }: { page: number; search?: string }) => {
	const response = await api.get<GetDocumentsReturn>('/documents/list', { params: { page, ...(search && { search }) } })
	return response.data
}
