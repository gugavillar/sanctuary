import { createFileRoute } from '@tanstack/react-router'

import { NewUser } from '#/features'
import { documentCategoryQuery } from '#/services/documents/hooks/useGetCategories'

export const Route = createFileRoute('/(admin)/_layout/usuarios/_layout/novo_usuario')({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.query(documentCategoryQuery())
	},
})

function RouteComponent() {
	return (
		<div className="flex flex-col gap-8">
			<NewUser />
		</div>
	)
}
