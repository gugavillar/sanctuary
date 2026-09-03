import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Sidebar } from '#/components/ui'
import { getSession } from '#/lib/get-session'
import { getUserPermissions } from '#/lib/get-user-permissions'

export const Route = createFileRoute('/(admin)/_layout')({
	beforeLoad: async () => {
		const session = await getSession()

		if (!session) {
			throw redirect({ to: '/' })
		}

		if (session.user.mustChangePassword) {
			throw redirect({
				to: '/alterar-senha',
			})
		}

		const permissions = await getUserPermissions({ data: { userId: session.user.id } })

		return {
			permissions,
			session,
		}
	},
	component: AdminLayout,
})

function AdminLayout() {
	const { session } = Route.useRouteContext()

	return (
		<div className="grid h-dvh grid-cols-[14rem_1fr]">
			<Sidebar isAdmin={session.user.role === 'ADMIN'} />
			<div className="flex flex-col overflow-y-auto p-6">
				<Outlet />
			</div>
		</div>
	)
}
