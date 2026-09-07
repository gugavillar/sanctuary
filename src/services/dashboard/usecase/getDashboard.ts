import { api } from '#/services/api'

type GetDashboardReturn = {
	users: number
	thisMonth: number
	categories: number
	documentsByMonth: Array<{ month: string; count: number }>
	recentDocuments: Array<{
		id: string
		title: string
		category: {
			category: string
		}
		createdAt: string
	}>
}

export const getDashboard = async () => {
	const response = await api.get<GetDashboardReturn>('/dashboard/list')
	return response.data
}
