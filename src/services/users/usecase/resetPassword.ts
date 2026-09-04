import { api } from '#/services/api'

export type ResetPasswordParams = {
	userId: string
}

export const resetPassword = async (data: ResetPasswordParams) => {
	const response = await api.post('/users/reset-password', data)
	return response.data
}
