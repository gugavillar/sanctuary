import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { prisma } from '#/db'
import { formatDateToSaveDatabase } from '#/formatters'
import { auth } from '#/lib/auth'
import { sendFile } from '#/lib/file'
import { canAddToCategory } from '#/lib/permissions'
import type { CreateDocumentParams } from '#/services/documents/usecase/createDocument'

export const Route = createFileRoute('/api/documents/create')({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const session = await auth.api.getSession({ headers: getRequestHeaders() })

				if (!session) {
					return Response.json({ error: 'Unauthorized' }, { status: 401 })
				}

				const formData = await request.formData()
				const rawData = Object.fromEntries(formData.entries()) as unknown as CreateDocumentParams
				const tags = formData.getAll('tags') as Array<string>

				try {
					const permissions = await prisma.categoryPermission.findMany({
						select: { categoryId: true, level: true },
						where: { userId: session.user.id },
					})

					if (!canAddToCategory(session.user, permissions, rawData.categoryId)) {
						return Response.json({ error: 'Forbidden' }, { status: 403 })
					}

					const document = await prisma.document.create({
						data: {
							categoryId: rawData.categoryId,
							createdById: session.user.id,
							date: rawData.date ? formatDateToSaveDatabase(rawData.date) : null,
							description: rawData.description || null,
							identification: rawData.identification || null,
							tags,
							title: rawData.title,
							typeId: rawData.typeId,
						},
					})
					await sendFile({
						categoryId: rawData.categoryId,
						file: rawData.file,
						id: document.id,
						title: rawData.title,
					})
					return Response.json({ data: document }, { status: 201 })
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
