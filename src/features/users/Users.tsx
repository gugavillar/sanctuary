import { useNavigate } from '@tanstack/react-router'
import { PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { Button, Input } from '#/components/forms'
import { Table } from '#/components/ui'
import { useQuery } from '#/lib/query-client'
import { usersQuery } from '#/services/users/hooks/useGetUsers'

import { HEADER_LABELS_USERS } from './Users.utils'

export const Users = () => {
	const [search, setSearch] = useState('')
	const [debouncedValue] = useDebounceValue(search, 500)
	const navigate = useNavigate()
	const { data: users, isLoading } = useQuery(usersQuery({ search: debouncedValue }))

	const handleAddUser = () => {
		navigate({ to: '/usuarios/novo_usuario' })
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-end justify-between gap-6">
				<Input
					className="max-w-3xl"
					label="Buscar"
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Encontre um usuário"
					value={search}
				/>
				<Button className="w-sm bg-emerald-600 text-white hover:bg-emerald-500" onClick={handleAddUser}>
					<PlusCircleIcon />
					<span>Adicionar usuário</span>
				</Button>
			</div>
			<Table bodyData={users ?? []} headerLabels={HEADER_LABELS_USERS} isLoading={isLoading} />
		</div>
	)
}
