import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { parse } from 'date-fns'

import { prisma } from '#/db'
import { auth } from '#/lib/auth'
import { canAddToCategory } from '#/lib/permissions'

export const Route = createFileRoute('/api/documents/create')({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const session = await auth.api.getSession({ headers: getRequestHeaders() })

				if (!session) {
					return Response.json({ error: 'Unauthorized' }, { status: 401 })
				}

				const body = await request.json()

				try {
					const permissions = await prisma.categoryPermission.findMany({
						select: { categoryId: true, level: true },
						where: { userId: session.user.id },
					})

					if (!canAddToCategory(session.user, permissions, body.categoryId)) {
						return Response.json({ error: 'Forbidden' }, { status: 403 })
					}

					const document = await prisma.document.create({
						data: {
							categoryId: body.categoryId,
							createdById: session.user.id,
							date: body.date ? parse(body.date, 'dd/MM/yyyy', new Date()) : null,
							description: body.description || null,
							identification: body.identification || null,
							tags: body.tags ?? [],
							title: body.title,
							typeId: body.typeId,
						},
					})
					return Response.json({ data: document }, { status: 201 })
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
