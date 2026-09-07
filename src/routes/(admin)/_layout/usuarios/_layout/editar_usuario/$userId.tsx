import { createFileRoute } from '@tanstack/react-router'

import { EditUser } from '#/features'
import { documentCategoryQuery } from '#/services/documents/hooks/useGetCategories'
import { userQuery } from '#/services/users/hooks/useGetUser'

export const Route = createFileRoute('/(admin)/_layout/usuarios/_layout/editar_usuario/$userId')({
	beforeLoad: async ({ params, context }) => {
		const { userId } = params
		await context.queryClient.query(documentCategoryQuery())
		await context.queryClient.query(userQuery({ userId }))
	},
	component: EditUserPage,
})

function EditUserPage() {
	return (
		<div className="flex flex-col gap-8">
			<EditUser />
		</div>
	)
}
