import { createFileRoute } from '@tanstack/react-router'

import { prisma } from '#/db'

export const Route = createFileRoute('/api/documents/categories')({
	server: {
		handlers: {
			GET: async () => {
				try {
					const categories = await prisma.document_Categories.findMany({
						orderBy: {
							category: 'asc',
						},
					})
					return Response.json({ data: categories }, { status: 200 })
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
