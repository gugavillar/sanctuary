import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { APIError } from 'better-auth/api'

import { FIRST_PASSWORD } from '#/constants'
import { prisma } from '#/db'
import { auth } from '#/lib/auth'

export const Route = createFileRoute('/api/users/create')({
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
					const signUpResult = await auth.api.signUpEmail({
						body: { email: body.email, name: body.name, password: FIRST_PASSWORD },
						headers,
					})

					const permissions: Array<{ categoryId: string; level: 'VIEW' | 'VIEW_AND_ADD' }> = body.permissions ?? []

					await prisma.$transaction([
						prisma.user.update({
							data: { mustChangePassword: true, role: body.role },
							where: { id: signUpResult.user.id },
						}),
						...(permissions.length
							? [
									prisma.categoryPermission.createMany({
										data: permissions.map((permission) => ({
											categoryId: permission.categoryId,
											level: permission.level,
											userId: signUpResult.user.id,
										})),
									}),
								]
							: []),
					])

					return Response.json({ data: { id: signUpResult.user.id } }, { status: 201 })
				} catch (error) {
					if (error instanceof APIError && error.body?.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL') {
						return Response.json({ error: 'EMAIL_ALREADY_EXISTS' }, { status: 409 })
					}
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
