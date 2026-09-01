import { queryOptions } from '#/lib/query-client'

import { getDocuments } from '../usecase/getDocuments'

export const documentsQuery = () =>
	queryOptions({
		queryFn: getDocuments,
		queryKey: ['documents'],
		select: (data) => {
			return data.map((document) => {
				const tags = document.tags.filter((tag) => tag.trim().length > 0)

				return {
					category: document.category.category,
					description: document.description ?? '-',
					id: document.id,
					identification: document.identification ?? '-',
					tags: tags.length ? tags.join(', ') : '-',
					title: document.title,
					type: document.type.type,
				}
			})
		},
	})
