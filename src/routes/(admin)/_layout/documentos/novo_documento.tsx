import { createFileRoute } from '@tanstack/react-router'

import { NewDocument } from '#/features'

export const Route = createFileRoute('/(admin)/_layout/documentos/novo_documento')({
	component: NewDocumentPage,
})

function NewDocumentPage() {
	return (
		<div className="flex flex-col gap-8">
			<NewDocument />
		</div>
	)
}
