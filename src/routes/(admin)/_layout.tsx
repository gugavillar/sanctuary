import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Sidebar } from '#/components/ui'
import { getSession } from '#/lib/get-session'

export const Route = createFileRoute('/(admin)/_layout')({
	beforeLoad: async () => {
		const session = await getSession()

		if (!session) {
			throw redirect({ to: '/' })
		}

		return {
			session,
		}
	},
	component: AdminLayout,
})

function AdminLayout() {
	return (
		<div className="grid h-dvh grid-cols-[14rem_1fr]">
			<Sidebar />
			<div className="flex flex-col overflow-y-auto p-6">
				<Outlet />
			</div>
		</div>
	)
}
