import { api } from '#/services/api'

export const generateUrl = async ({ id }: { id: string }) => {
	const response = await api.get<{ url: string }>('/documents/generate-url', { params: { id } })
	return response.data
}
