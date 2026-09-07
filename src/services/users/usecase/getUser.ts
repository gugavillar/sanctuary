import { api } from '#/services/api'

export type User = {
	id: string
	name: string
	email: string
	role: 'ADMIN' | 'USER'
	categoryPermissions: Array<{
		category: {
			id: string
			category: string
		}
		categoryId: string
		createdAt: string
		id: string
		level: 'VIEW' | 'VIEW_AND_ADD'
		updatedAt: string
		userId: string
	}>
}

export type GetUserParams = {
	userId: string
}

export const getUser = async ({ userId }: GetUserParams) => {
	const response = await api.get<User>('/users/get-user', { params: { userId } })
	return response.data
}
