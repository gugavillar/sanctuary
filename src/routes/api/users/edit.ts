import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { prisma } from '#/db'
import { auth } from '#/lib/auth'

export const Route = createFileRoute('/api/users/edit')({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const session = await auth.api.getSession({ headers: getRequestHeaders() })

				if (!session || session.user.role !== 'ADMIN') {
					return Response.json({ error: 'Forbidden' }, { status: 403 })
				}

				const body = await request.json()
				const permissions: Array<{ categoryId: string; level: 'VIEW' | 'VIEW_AND_ADD' }> = body.permissions ?? []

				try {
					await prisma.$transaction([
						prisma.user.update({
							data: { name: body.name, role: body.role },
							where: { id: body.id },
						}),
						prisma.categoryPermission.deleteMany({
							where: { userId: body.id },
						}),
						...(permissions.length
							? [
									prisma.categoryPermission.createMany({
										data: permissions.map((permission) => ({
											categoryId: permission.categoryId,
											level: permission.level,
											userId: body.id,
										})),
									}),
								]
							: []),
					])

					return Response.json({ data: { id: body.id } }, { status: 200 })
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
