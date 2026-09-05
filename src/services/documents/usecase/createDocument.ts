import { api } from '#/services/api'

export type CreateDocumentParams = {
	title: string
	typeId: string
	categoryId: string
	date?: string
	identification?: string
	description?: string
	tags: Array<string>
	file: File
}

export const createDocument = async (data: CreateDocumentParams) => {
	const formData = new FormData()
	Object.entries(data).forEach(([key, value]) => {
		if (value === undefined || value === null) return
		formData.append(key, value as any)
	})
	const response = await api.post('/documents/create', formData)
	return response.data
}
