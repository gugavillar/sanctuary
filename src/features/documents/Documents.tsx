import { useNavigate } from '@tanstack/react-router'
import { PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { Button, Input } from '#/components/forms'
import { Pagination, Table } from '#/components/ui'
import { useQuery } from '#/lib/query-client'
import { documentsQuery } from '#/services/documents/hooks/useGetDocuments'

import { HEADER_LABELS_DOCUMENTS } from './Documents.utils'

export const Documents = () => {
	const [page, setPage] = useState(1)
	const [search, setSearch] = useState('')
	const [debouncedValue] = useDebounceValue(search, 500)
	const navigate = useNavigate()
	const { data: documents, isLoading } = useQuery(documentsQuery({ page, search: debouncedValue }))

	const handleAddDocument = () => {
		navigate({ to: '/documentos/novo_documento' })
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-end justify-between gap-6">
				<Input
					className="max-w-3xl"
					label="Buscar"
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Encontre um documento"
					value={search}
				/>
				<Button className="w-sm bg-emerald-600 text-white hover:bg-emerald-500" onClick={handleAddDocument}>
					<PlusCircleIcon />
					<span>Adicionar documento</span>
				</Button>
			</div>
			<Table bodyData={documents?.documents ?? []} headerLabels={HEADER_LABELS_DOCUMENTS} isLoading={isLoading} />
			<Pagination currentPage={page} setPage={setPage} totalPages={documents?.totalPages} />
		</div>
	)
}
