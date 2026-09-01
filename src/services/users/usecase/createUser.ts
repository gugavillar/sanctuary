import { api } from '#/services/api'

export type CreateUserParams = {
	email: string
	name: string
	role: 'ADMIN' | 'USER'
	permissions: Array<{ categoryId: string; level: 'VIEW' | 'VIEW_AND_ADD' }>
}

export const createUser = async (data: CreateUserParams) => {
	const response = await api.post('/users/create', data)
	return response.data
}
