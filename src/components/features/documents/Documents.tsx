import { useNavigate } from '@tanstack/react-router'
import { PlusCircleIcon } from 'lucide-react'

import { Button, Input } from '#/components/forms'
import { Table } from '#/components/ui'

import { HEADER_LABELS_DOCUMENTS } from './Documents.utils'

export const Documents = () => {
	const navigate = useNavigate()

	const handleAddDocument = () => {
		navigate({ to: '/documentos/novo_documento' })
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center justify-between gap-6">
				<Input className="max-w-3xl" label="Buscar" placeholder="Encontre um documento" />
				<Button className="w-sm bg-emerald-600 text-white hover:bg-emerald-500" onClick={handleAddDocument}>
					<PlusCircleIcon />
					<span>Adicionar documento</span>
				</Button>
			</div>
			<Table headerLabels={HEADER_LABELS_DOCUMENTS} isLoading={false} />
		</div>
	)
}
