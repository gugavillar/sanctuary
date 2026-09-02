import { queryOptions } from '#/lib/query-client'

import { type GetUsersParams, type GetUsersReturn, getUsers } from '../usecase/getUsers'

const generatePermissions = (user: GetUsersReturn['users'][number]) => {
	return user.categoryPermissions
		.map((permission) => `${permission.category.category} - ${permission.level === 'VIEW' ? 'Visualizar' : 'Total'}`)
		.join(', ')
}

export const usersQuery = ({ search, page }: GetUsersParams) =>
	queryOptions({
		queryFn: () => getUsers({ page, search }),
		queryKey: ['users', search, page],
		select: (data) => ({
			...data,
			users: data.users?.map((user) => ({
				...user,
				permission: user.role === 'ADMIN' ? 'Todas' : generatePermissions(user),
				role: user.role === 'ADMIN' ? 'Administrador' : 'Usuário',
			})),
		}),
	})
