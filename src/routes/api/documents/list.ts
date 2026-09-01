import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { prisma } from '#/db'
import { auth } from '#/lib/auth'
import { viewableCategoryIds } from '#/lib/permissions'

export const Route = createFileRoute('/api/documents/list')({
	server: {
		handlers: {
			GET: async () => {
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

					const documents = await prisma.document.findMany({
						include: { category: true, type: true },
						orderBy: { createdAt: 'desc' },
						where: allowedCategoryIds ? { categoryId: { in: allowedCategoryIds } } : undefined,
					})
					return Response.json({ data: documents }, { status: 200 })
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
