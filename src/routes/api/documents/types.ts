import { createFileRoute } from '@tanstack/react-router'

import { prisma } from '#/db'

export const Route = createFileRoute('/api/documents/types')({
	server: {
		handlers: {
			GET: async () => {
				try {
					const types = await prisma.document_Types.findMany({
						orderBy: {
							type: 'asc',
						},
					})
					return Response.json({ data: types }, { status: 200 })
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
