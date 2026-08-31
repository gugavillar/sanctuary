import { createServerFn } from '@tanstack/react-start'

import { prisma } from '#/db'

export type UserCategoryPermission = {
	categoryId: string
	level: 'VIEW' | 'VIEW_AND_ADD'
}

export const getUserPermissions = createServerFn({ method: 'GET' })
	.validator((data: { userId: string }) => data)
	.handler(
		({ data }): Promise<Array<UserCategoryPermission>> =>
			prisma.categoryPermission.findMany({
				select: { categoryId: true, level: true },
				where: { userId: data.userId },
			})
	)
