import { api } from '#/services/api'

export type CreateDocumentParams = {
	title: string
	typeId: string
	categoryId: string
	date?: string
	identification?: string
	description?: string
	tags: Array<string>
}

export const createDocument = async (data: CreateDocumentParams) => {
	const response = await api.post('/documents', data)
	return response.data
}
