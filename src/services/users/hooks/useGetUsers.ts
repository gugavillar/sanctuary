import { queryOptions } from '@tanstack/react-query'

import { type GetUsersParams, getUsers } from '../usecase/getUsers'

export const usersQuery = ({ search }: GetUsersParams) =>
	queryOptions({
		queryFn: () => getUsers({ search }),
		queryKey: ['users', search],
		select: (data) =>
			data.map((user) => ({
				...user,
				role: user.role === 'ADMIN' ? 'Administrador' : 'Usuário',
			})),
	})
