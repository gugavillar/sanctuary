import { createFileRoute } from '@tanstack/react-router'

import { Logo } from '#/components/icons'
import { Login } from '#/features'

export const Route = createFileRoute('/')({ component: LoginPage })

function LoginPage() {
	return (
		<div className="grid h-dvh grid-cols-1 items-center gap-4 p-8 lg:grid-cols-2">
			<Logo className="hidden w-full lg:block" />
			<Login />
		</div>
	)
}
