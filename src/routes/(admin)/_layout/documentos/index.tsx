import { createFileRoute } from '@tanstack/react-router'

import { Documents } from '#/features'
import { documentsQuery } from '#/services/documents/hooks/useGetDocuments'

export const Route = createFileRoute('/(admin)/_layout/documentos/')({
	component: DocumentsPage,
	loader: async ({ context }) => {
		await context.queryClient.query(documentsQuery({ page: 1, search: '' }))
	},
})

function DocumentsPage() {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-3xl">Documentos</h1>
			<Documents />
		</div>
	)
}
