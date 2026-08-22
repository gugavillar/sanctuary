import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/_layout/dashboard')({
	component: DashboardPage,
})

function DashboardPage() {
	return (
		<div>
			<p>Dashboard</p>
		</div>
	)
}
