import { createFileRoute, redirect } from '@tanstack/react-router'

import { Logo } from '#/components/icons'
import { ChangePassword } from '#/features'
import { getSession } from '#/lib/get-session'

export const Route = createFileRoute('/alterar-senha')({
	beforeLoad: async () => {
		const session = await getSession()

		if (!session) {
			throw redirect({ to: '/' })
		}

		return {
			session,
		}
	},
	component: ChangePasswordPage,
})

function ChangePasswordPage() {
	return (
		<div className="grid h-dvh grid-cols-1 items-center gap-4 p-8 lg:grid-cols-2">
			<Logo className="hidden w-full lg:block" />
			<ChangePassword />
		</div>
	)
}
