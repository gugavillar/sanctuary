import { queryOptions } from '#/lib/query-client'

import { type GetUserParams, getUser } from '../usecase/getUser'

export const userQuery = ({ userId }: GetUserParams) =>
	queryOptions({
		enabled: !!userId,
		queryFn: () => getUser({ userId }),
		queryKey: ['user', userId],
		select: (data) => ({
			...data,
			categoryPermissions: Object.fromEntries(
				data.categoryPermissions.map((permission) => [permission.categoryId, permission.level])
			),
		}),
	})
