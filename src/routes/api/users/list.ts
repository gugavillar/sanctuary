import { createFileRoute } from '@tanstack/react-router'

import { prisma } from '#/db'

export const Route = createFileRoute('/api/users/list')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const search = new URL(request.url).searchParams.get('search')
				try {
					const users = await prisma.user.findMany({
						orderBy: {
							name: 'asc',
						},
						select: {
							email: true,
							id: true,
							name: true,
							role: true,
						},
						...(search && {
							where: {
								OR: [
									{ name: { contains: search, mode: 'insensitive' } },
									{ email: { contains: search, mode: 'insensitive' } },
								],
							},
						}),
					})
					return Response.json({ data: users }, { status: 200 })
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
