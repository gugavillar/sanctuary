import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/_layout/documentos')({
	component: DocumentsPage,
})

function DocumentsPage() {
	return <div>Documentos</div>
}
