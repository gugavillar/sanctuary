import { useNavigate } from '@tanstack/react-router'
import { Eye, PlusCircleIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { Button, Input } from '#/components/forms'
import { Pagination, Spinner, Table, Tooltip } from '#/components/ui'
import { useQuery } from '#/lib/query-client'
import { useGenerateUrl } from '#/services/documents/hooks/useGenerateUrl'
import { documentsQuery } from '#/services/documents/hooks/useGetDocuments'

import { HEADER_LABELS_DOCUMENTS } from './Documents.utils'

export const Documents = () => {
	const [page, setPage] = useState(1)
	const [search, setSearch] = useState('')
	const [debouncedValue] = useDebounceValue(search, 500)
	const buttonRef = useRef<string | null>(null)
	const navigate = useNavigate()
	const { data: documents, isLoading } = useQuery(documentsQuery({ page, search: debouncedValue }))
	const { mutateAsync: generateUrl, isPending } = useGenerateUrl()

	const handleAddDocument = () => {
		navigate({ to: '/documentos/novo_documento' })
	}

	const handleViewDocument = async (id: string) => {
		const response = await generateUrl({ id })
		const newTab = window.open('', '_blank')
		if (newTab) {
			newTab.location.href = response.url
		}
	}

	const formattedDocuments = documents?.documents.map((document) => ({
		...document,
		actions: (
			<Tooltip content="Visualizar documento">
				<button
					className="cursor-pointer"
					disabled={isPending}
					onClick={() => {
						buttonRef.current = document.id
						handleViewDocument(document.id)
					}}
					type="button"
				>
					{isPending && buttonRef.current === document.id ? <Spinner /> : <Eye />}
				</button>
			</Tooltip>
		),
	}))

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
			<Table bodyData={formattedDocuments ?? []} headerLabels={HEADER_LABELS_DOCUMENTS} isLoading={isLoading} />
			<Pagination currentPage={page} setPage={setPage} totalPages={documents?.totalPages} />
		</div>
	)
}
