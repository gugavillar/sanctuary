import { api } from '#/services/api'

export type GetUsersReturn = {
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

export type GetUsersParams = {
	search?: string
}

export const getUsers = async ({ search }: GetUsersParams) => {
	const response = await api.get<Array<GetUsersReturn>>('/users/list', { params: { ...(search && { search }) } })
	return response.data
}
