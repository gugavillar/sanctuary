import { useNavigate } from '@tanstack/react-router'
import { PlusCircleIcon } from 'lucide-react'

import { Button, Input } from '#/components/forms'
import { Table } from '#/components/ui'

import { HEADER_LABELS_USERS } from './Users.utils'

export const Users = () => {
	const navigate = useNavigate()

	const handleAddUser = () => {
		navigate({ to: '/usuarios/novo_usuario' })
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-end justify-between gap-6">
				<Input className="max-w-3xl" label="Buscar" placeholder="Encontre um usuário" />
				<Button className="w-sm bg-emerald-600 text-white hover:bg-emerald-500" onClick={handleAddUser}>
					<PlusCircleIcon />
					<span>Adicionar usuário</span>
				</Button>
			</div>
			<Table headerLabels={HEADER_LABELS_USERS} isLoading={false} />
		</div>
	)
}
