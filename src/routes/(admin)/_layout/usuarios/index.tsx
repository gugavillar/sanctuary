import { createFileRoute } from '@tanstack/react-router'

import { Users } from '#/features'

export const Route = createFileRoute('/(admin)/_layout/usuarios/')({
	component: UsersPage,
})

function UsersPage() {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-3xl">Usuários</h1>
			<Users />
		</div>
	)
}
