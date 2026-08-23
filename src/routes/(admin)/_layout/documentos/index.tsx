import { createFileRoute } from '@tanstack/react-router'

import { Documents } from '#/components/features'

export const Route = createFileRoute('/(admin)/_layout/documentos/')({
	component: DocumentsPage,
})

function DocumentsPage() {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-3xl">Documentos</h1>
			<Documents />
		</div>
	)
}
