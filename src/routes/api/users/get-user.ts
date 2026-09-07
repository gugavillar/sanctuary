import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { prisma } from '#/db'
import { auth } from '#/lib/auth'

export const Route = createFileRoute('/api/users/get-user')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const userId = new URL(request.url).searchParams.get('userId') || ''

				const session = await auth.api.getSession({ headers: getRequestHeaders() })

				if (!session || session.user.role !== 'ADMIN') {
					return Response.json({ error: 'Unauthorized' }, { status: 401 })
				}

				try {
					const user = await prisma.user.findUnique({
						select: {
							categoryPermissions: {
								include: {
									category: true,
								},
							},
							email: true,
							id: true,
							name: true,
							role: true,
						},
						where: {
							id: userId,
						},
					})
					return Response.json(
						{
							data: user,
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
