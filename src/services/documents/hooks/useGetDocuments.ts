import { queryOptions } from '@tanstack/react-query'

import { getDocuments } from '../usecase/getDocuments'

export const documentsQuery = () =>
	queryOptions({
		queryFn: getDocuments,
		queryKey: ['documents'],
		select: (data) =>
			data.map((document) => ({
				category: document.category.category,
				description: document.description ?? '-',
				id: document.id,
				identification: document.identification ?? '-',
				tags: document.tags.length ? document.tags.join(', ') : '-',
				title: document.title,
				type: document.type.type,
			})),
	})
