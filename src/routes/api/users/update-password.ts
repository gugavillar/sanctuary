import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { FIRST_PASSWORD } from '#/constants'
import { prisma } from '#/db'
import { auth } from '#/lib/auth'

export const Route = createFileRoute('/api/users/update-password')({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const headers = getRequestHeaders()
				const session = await auth.api.getSession({ headers })

				if (!session) {
					return Response.json({ error: 'Forbidden' }, { status: 403 })
				}

				const body = await request.json()

				try {
					const updatePassword = await auth.api.changePassword({
						body: {
							currentPassword: FIRST_PASSWORD,
							newPassword: body.newPassword,
							revokeOtherSessions: true,
						},
						headers,
					})

					await prisma.user.update({
						data: {
							mustChangePassword: false,
						},
						where: {
							id: session.user.id,
						},
					})

					return Response.json({ data: { id: updatePassword.user.id } }, { status: 201 })
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
