import { api } from '#/services/api'

export type EditUserParams = {
	email: string
	name: string
	role: 'ADMIN' | 'USER'
	permissions: Array<{ categoryId: string; level: 'VIEW' | 'VIEW_AND_ADD' }>
	id: string
}

export const editUser = async (data: EditUserParams) => {
	const response = await api.post('/users/edit', data)
	return response.data
}
