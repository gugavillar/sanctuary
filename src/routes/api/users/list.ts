import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { LIMIT_PER_PAGE } from '#/constants'
import { prisma } from '#/db'
import { auth } from '#/lib/auth'

export const Route = createFileRoute('/api/users/list')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const search = new URL(request.url).searchParams.get('search')
				const page = parseInt(new URL(request.url).searchParams.get('page') ?? '1', 10)
				const skip = (page - 1) * LIMIT_PER_PAGE

				const session = await auth.api.getSession({ headers: getRequestHeaders() })

				if (!session || session.user.role !== 'ADMIN') {
					return Response.json({ error: 'Unauthorized' }, { status: 401 })
				}

				try {
					const [users, total] = await Promise.all([
						prisma.user.findMany({
							orderBy: {
								name: 'asc',
							},
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
							skip,
							take: LIMIT_PER_PAGE,
							...(search && {
								where: {
									OR: [
										{ name: { contains: search, mode: 'insensitive' } },
										{ email: { contains: search, mode: 'insensitive' } },
									],
								},
							}),
						}),
						prisma.user.count({
							...(search && {
								where: {
									OR: [
										{ name: { contains: search, mode: 'insensitive' } },
										{ email: { contains: search, mode: 'insensitive' } },
									],
								},
							}),
						}),
					])
					return Response.json(
						{
							data: {
								currentPage: page,
								perPage: LIMIT_PER_PAGE,
								totalCount: total,
								totalPages: Math.ceil(total / LIMIT_PER_PAGE),
								users: users,
							},
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
