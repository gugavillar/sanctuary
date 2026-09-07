import { formatDocumentDate } from '#/formatters'
import { queryOptions } from '#/lib/query-client'

import { getDashboard } from '../usecase/getDashboard'

export const dashboardQuery = () =>
	queryOptions({
		queryFn: () => getDashboard(),
		queryKey: ['dashboard'],
		select: (data) => ({
			...data,
			documentsByMonth: data.documentsByMonth ?? [],
			recentDocuments:
				data.recentDocuments.map((item) => ({
					category: item.category.category,
					id: item.id,
					time: formatDocumentDate(item.createdAt),
					title: item.title,
				})) ?? [],
		}),
	})
