import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { addMonths, format, parse, startOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { prisma } from '#/db'
import { auth } from '#/lib/auth'
import { viewableCategoryIds } from '#/lib/permissions'

import { Prisma } from '../../../../prisma/generated/prisma/client'

export const Route = createFileRoute('/api/dashboard/list')({
	server: {
		handlers: {
			GET: async () => {
				const today = new Date()
				const session = await auth.api.getSession({ headers: getRequestHeaders() })

				if (!session) {
					return Response.json({ error: 'Unauthorized' }, { status: 401 })
				}

				try {
					const permissions = await prisma.categoryPermission.findMany({
						select: { categoryId: true, level: true },
						where: { userId: session.user.id },
					})
					const allowedCategoryIds = viewableCategoryIds(session.user, permissions)

					const [users, thisMonth, categories, documents, documentsByMonth, recentDocuments] = await Promise.all([
						prisma.user.count(),
						prisma.document.count({
							where: {
								...(allowedCategoryIds ? { categoryId: { in: allowedCategoryIds } } : undefined),
								createdAt: {
									gte: startOfMonth(today),
									lt: addMonths(startOfMonth(today), 1),
								},
							},
						}),
						prisma.document_Categories.count(),
						prisma.document.count({
							where: {
								...(allowedCategoryIds ? { categoryId: { in: allowedCategoryIds } } : undefined),
							},
						}),
						prisma.$queryRaw<{ month: string; count: number }[]>`
							SELECT
								TO_CHAR(
									DATE_TRUNC(
										'month',
										"createdAt" AT TIME ZONE 'America/Sao_Paulo'
									),
									'YYYY-MM'
								) AS month,
								COUNT(*) AS count
							FROM "document"
							WHERE "createdAt" >= (
								DATE_TRUNC(
									'month',
									CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo'
								) - INTERVAL '11 months'
							) AT TIME ZONE 'America/Sao_Paulo'
							${
								allowedCategoryIds ? Prisma.sql`AND "categoryId" IN (${Prisma.join(allowedCategoryIds)})` : Prisma.empty
							}
							GROUP BY DATE_TRUNC(
								'month',
								"createdAt" AT TIME ZONE 'America/Sao_Paulo'
							)
							ORDER BY month ASC
						`,
						await prisma.document.findMany({
							orderBy: {
								createdAt: 'desc',
							},
							select: {
								category: true,
								createdAt: true,
								id: true,
								title: true,
							},
							take: 5,
							where: {
								...(allowedCategoryIds ? { categoryId: { in: allowedCategoryIds } } : undefined),
							},
						}),
					])

					const formattedDocumentsByMonth = documentsByMonth.map((item) => ({
						count: Number(item.count),
						month: format(parse(item.month, 'yyyy-MM', new Date()), 'MMM', { locale: ptBR }),
					}))

					return Response.json(
						{
							data: {
								categories,
								documents,
								documentsByMonth: formattedDocumentsByMonth,
								recentDocuments,
								thisMonth,
								users,
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
