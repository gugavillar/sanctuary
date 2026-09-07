import { createFileRoute } from '@tanstack/react-router'

import { Dashboard } from '#/features/dashboard'
import { dashboardQuery } from '#/services/dashboard/hooks/useGetDashboard'

export const Route = createFileRoute('/(admin)/_layout/dashboard')({
	component: DashboardPage,
	loader: async ({ context }) => {
		await context.queryClient.query(dashboardQuery())
	},
})

function DashboardPage() {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-3xl">Dashboard</h1>
			<Dashboard />
		</div>
	)
}
