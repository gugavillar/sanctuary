import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { LIMIT_PER_PAGE } from '#/constants'
import { prisma } from '#/db'
import { auth } from '#/lib/auth'
import { viewableCategoryIds } from '#/lib/permissions'

export const Route = createFileRoute('/api/documents/list')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const search = new URL(request.url).searchParams.get('search')
				const page = parseInt(new URL(request.url).searchParams.get('page') ?? '1', 10)
				const skip = (page - 1) * LIMIT_PER_PAGE
				const session = await auth.api.getSession({ headers: getRequestHeaders() })

				if (!session) {
					return Response.json({ error: 'Unauthorized' }, { status: 401 })
				}

				try {
					const permissions = await prisma.categoryPermission.findMany({
						select: { categoryId: true, level: true },
						where: { userId: session.user.id },
					})
					const allowedCategoryIds = viewableCategoryIds(session.user, permissions)

					const [documents, total] = await Promise.all([
						prisma.document.findMany({
							include: { category: true, type: true },
							orderBy: { createdAt: 'desc' },
							skip,
							take: LIMIT_PER_PAGE,
							where: {
								...(allowedCategoryIds ? { categoryId: { in: allowedCategoryIds } } : undefined),
								...(search
									? {
											OR: [
												{ title: { contains: search, mode: 'insensitive' } },
												{ identification: { contains: search, mode: 'insensitive' } },
											],
										}
									: undefined),
							},
						}),
						prisma.document.count({
							where: {
								...(allowedCategoryIds ? { categoryId: { in: allowedCategoryIds } } : undefined),
								...(search
									? {
											OR: [
												{ title: { contains: search, mode: 'insensitive' } },
												{ identification: { contains: search, mode: 'insensitive' } },
											],
										}
									: undefined),
							},
						}),
					])
					return Response.json(
						{
							data: {
								currentPage: page,
								documents: documents,
								perPage: LIMIT_PER_PAGE,
								totalCount: total,
								totalPages: Math.ceil(total / LIMIT_PER_PAGE),
							},
						},
						{ status: 200 }
					)
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
