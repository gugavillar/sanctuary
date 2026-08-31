import { createFileRoute } from '@tanstack/react-router'

import { Users } from '#/features'
import { usersQuery } from '#/services/users/hooks/useGetUsers'

export const Route = createFileRoute('/(admin)/_layout/usuarios/_layout/')({
	component: UsersPage,
	loader: async ({ context }) => {
		await context.queryClient.query(usersQuery({ search: '' }))
	},
})

function UsersPage() {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-3xl">Usuários</h1>
			<Users />
		</div>
	)
}
