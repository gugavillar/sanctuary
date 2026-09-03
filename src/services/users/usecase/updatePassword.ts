import { api } from '#/services/api'

export type UpdatePasswordParams = {
	newPassword: string
}

export const updatePassword = async (data: UpdatePasswordParams) => {
	const response = await api.post('/users/update-password', data)
	return response.data
}
