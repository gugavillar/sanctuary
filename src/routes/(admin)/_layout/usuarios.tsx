import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/_layout/usuarios')({
	component: UsersPage,
})

function UsersPage() {
	return <div>Hello "/(admin)/_layout/usuarios"!</div>
}
