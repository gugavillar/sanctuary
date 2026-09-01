import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { isAdmin } from '#/lib/permissions'

export const Route = createFileRoute('/(admin)/_layout/usuarios/_layout')({
	beforeLoad: ({ context }) => {
		if (!isAdmin(context.session.user)) {
			throw redirect({ to: '/dashboard' })
		}
	},
	component: () => <Outlet />,
})
