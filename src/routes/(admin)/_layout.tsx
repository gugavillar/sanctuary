import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Sidebar } from '#/components/ui'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/(admin)/_layout')({
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession()

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
