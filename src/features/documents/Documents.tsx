import { useNavigate } from '@tanstack/react-router'
import { PlusCircleIcon } from 'lucide-react'

import { Button, Input } from '#/components/forms'
import { Table } from '#/components/ui'
import { useQuery } from '#/lib/query-client'
import { documentsQuery } from '#/services/documents/hooks/useGetDocuments'

import { HEADER_LABELS_DOCUMENTS } from './Documents.utils'

export const Documents = () => {
	const navigate = useNavigate()
	const { data: documents, isLoading } = useQuery(documentsQuery())

	const handleAddDocument = () => {
		navigate({ to: '/documentos/novo_documento' })
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-end justify-between gap-6">
				<Input className="max-w-3xl" label="Buscar" placeholder="Encontre um documento" />
				<Button className="w-sm bg-emerald-600 text-white hover:bg-emerald-500" onClick={handleAddDocument}>
					<PlusCircleIcon />
					<span>Adicionar documento</span>
				</Button>
			</div>
			<Table bodyData={documents ?? []} headerLabels={HEADER_LABELS_DOCUMENTS} isLoading={isLoading} />
		</div>
	)
}
