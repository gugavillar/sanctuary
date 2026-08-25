import { createFileRoute } from '@tanstack/react-router'

import { NewDocument, NewDocumentSkeleton } from '#/features'
import { documentCategoryQuery } from '#/services/documents/hooks/useGetCategories'
import { documentTypeQuery } from '#/services/documents/hooks/useGetTypes'

export const Route = createFileRoute('/(admin)/_layout/documentos/novo_documento')({
	component: NewDocumentPage,
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.query(documentTypeQuery()),
			context.queryClient.query(documentCategoryQuery()),
		])
	},
	pendingComponent: () => <NewDocumentSkeleton />,
})

function NewDocumentPage() {
	return (
		<div className="flex flex-col gap-8">
			<NewDocument />
		</div>
	)
}
