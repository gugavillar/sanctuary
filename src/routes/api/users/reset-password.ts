import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { APIError } from 'better-auth/api'

import { FIRST_PASSWORD } from '#/constants'
import { prisma } from '#/db'
import { auth } from '#/lib/auth'

export const Route = createFileRoute('/api/users/reset-password')({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const headers = getRequestHeaders()
				const session = await auth.api.getSession({ headers })

				if (!session || session.user.role !== 'ADMIN') {
					return Response.json({ error: 'Forbidden' }, { status: 403 })
				}

				const body = await request.json()

				try {
					const response = await auth.api.setUserPassword({
						body: {
							newPassword: FIRST_PASSWORD,
							userId: body.userId,
						},
						headers,
					})

					await prisma.user.update({
						data: {
							mustChangePassword: true,
						},
						where: {
							id: body.userId,
						},
					})

					return Response.json({ data: { status: response.status } }, { status: 200 })
				} catch (error) {
					console.log(error)
					if (error instanceof APIError && error.body?.code === 'YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD') {
						return Response.json({ error: 'NOT_ALLOWED' }, { status: 403 })
					}
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
