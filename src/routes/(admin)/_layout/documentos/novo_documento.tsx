import { createFileRoute } from '@tanstack/react-router'

import { NewDocument } from '#/features'
import { documentTypeQuery } from '#/services/documents/hooks/useGetTypes'

export const Route = createFileRoute('/(admin)/_layout/documentos/novo_documento')({
	beforeLoad: async ({ context }) => {
		await context.queryClient.ensureQueryData(documentTypeQuery())
	},
	component: NewDocumentPage,
})

function NewDocumentPage() {
	return (
		<div className="flex flex-col gap-8">
			<NewDocument />
		</div>
	)
}
