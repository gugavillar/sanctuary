import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { PlusCircleIcon, UserKeyIcon, UserPenIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useDebounceValue } from 'usehooks-ts'

import { Button, Input } from '#/components/forms'
import { Pagination, Spinner, Table, Tooltip } from '#/components/ui'
import { useQuery } from '#/lib/query-client'
import { usersQuery } from '#/services/users/hooks/useGetUsers'
import { useResetPassword } from '#/services/users/hooks/useResetPassword'

import { HEADER_LABELS_USERS } from './Users.utils'

export const Users = () => {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [debouncedValue] = useDebounceValue(search, 500)
	const buttonRef = useRef<null | string>(null)
	const navigate = useNavigate()
	const { data: users, isLoading } = useQuery(usersQuery({ page, search: debouncedValue }))
	const { mutateAsync: resetPassword, isPending } = useResetPassword()

	const handleAddUser = () => {
		navigate({ to: '/usuarios/novo_usuario' })
	}

	const handleEditUser = (userId: string) => {
		navigate({ to: `/usuarios/editar_usuario/${userId}` })
	}

	const handleResetPassword = async (userId: string) => {
		await resetPassword(
			{ userId },
			{
				onError: (error) => {
					if (isAxiosError(error) && error.response?.status === 403) {
						return toast.error('Você não tem permissão para redefinir a senha')
					}
					toast.error('Erro ao redefinir senha')
				},
				onSuccess: () => {
					toast.success('Senha redefinida com sucesso')
				},
			}
		)
	}

	const formattedUsers = users?.users?.map((user) => ({
		...user,
		actions: (
			<div className="flex gap-1.5">
				<Tooltip content="Redefinir senha">
					<button
						className="flex cursor-pointer items-center justify-center px-2 py-1 disabled:opacity-50"
						disabled={isPending}
						onClick={() => {
							buttonRef.current = user.id
							handleResetPassword(user.id)
						}}
						type="button"
					>
						{isPending && buttonRef.current === user.id ? <Spinner /> : <UserKeyIcon />}
					</button>
				</Tooltip>
				<Tooltip content="Editar usuário">
					<button
						className="flex cursor-pointer items-center justify-center px-2 py-1 disabled:opacity-50"
						disabled={isPending}
						onClick={() => {
							buttonRef.current = user.id
							handleEditUser(user.id)
						}}
						type="button"
					>
						{isPending && buttonRef.current === user.id ? <Spinner /> : <UserPenIcon />}
					</button>
				</Tooltip>
			</div>
		),
	}))

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
			<Table bodyData={formattedUsers ?? []} headerLabels={HEADER_LABELS_USERS} isLoading={isLoading} />
			<Pagination currentPage={page} setPage={setPage} totalPages={users?.totalPages} />
		</div>
	)
}
