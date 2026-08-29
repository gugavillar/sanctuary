import { api } from '#/services/api'

export type GetUsersReturn = {
	id: string
	name: string
	email: string
}

export type GetUsersParams = {
	search?: string
}

export const getUsers = async ({ search }: GetUsersParams) => {
	const response = await api.get<Array<GetUsersReturn>>('/users/list', { params: { ...(search && { search }) } })
	return response.data
}
