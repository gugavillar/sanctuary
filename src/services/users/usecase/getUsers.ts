import { api } from '#/services/api'

type User = {
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

export type GetUsersReturn = {
	currentPage: number
	users: Array<User>
	perPage: number
	totalCount: number
	totalPages: number
}

export type GetUsersParams = {
	search?: string
	page: number
}

export const getUsers = async ({ search, page }: GetUsersParams) => {
	const response = await api.get<GetUsersReturn>('/users/list', { params: { page, ...(search && { search }) } })
	return response.data
}
