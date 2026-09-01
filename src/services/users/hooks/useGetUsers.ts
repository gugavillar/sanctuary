import { queryOptions } from '@tanstack/react-query'

import { type GetUsersParams, type GetUsersReturn, getUsers } from '../usecase/getUsers'

const generatePermissions = (user: GetUsersReturn) => {
	return user.categoryPermissions
		.map((permission) => `${permission.category.category} - ${permission.level === 'VIEW' ? 'Visualizar' : 'Total'}`)
		.join(', ')
}

export const usersQuery = ({ search }: GetUsersParams) =>
	queryOptions({
		queryFn: () => getUsers({ search }),
		queryKey: ['users', search],
		select: (data) =>
			data.map((user) => ({
				...user,
				permission: user.role === 'ADMIN' ? 'Todas' : generatePermissions(user),
				role: user.role === 'ADMIN' ? 'Administrador' : 'Usuário',
			})),
	})
