import { createFileRoute } from '@tanstack/react-router'

import { NewUser } from '#/features'

export const Route = createFileRoute('/(admin)/_layout/usuarios/novo_usuario')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex flex-col gap-8">
			<NewUser />
		</div>
	)
}
