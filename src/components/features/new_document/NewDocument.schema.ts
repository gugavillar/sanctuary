import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPE = 'application/pdf'

const newDocumentSchema = z.object({
	category: z.string({ error: 'Campo obrigatório' }),
	date: z.string({ error: 'Campo obrigatório' }),
	description: z.string({ error: 'Campo obrigatório' }).optional(),
	file: z
		.any()
		.refine((file) => file !== null, {
			error: 'Arquivo é obrigatório',
		})
		.refine((file) => file instanceof File, {
			error: 'Arquivo inválido',
		})
		.refine((file) => file?.size <= MAX_FILE_SIZE, {
			error: 'O arquivo deve ter no máximo 1MB',
		})
		.refine((file) => file?.type === ACCEPTED_TYPE, {
			error: 'O arquivo deve ser um PNG',
		}),
	identification: z.string({ error: 'Campo obrigatório' }),
	permission: z.string({ error: 'Campo obrigatório' }),
	tags: z
		.array(
			z.object({
				tag: z.string({ error: 'Campo obrigatório' }),
			})
		)
		.min(1, { error: 'Necessário uma tag' }),
	title: z.string({ error: 'Campo obrigatório' }),
	type: z.string({ error: 'Campo obrigatório' }),
})

export type NewDocumentSchema = z.infer<typeof newDocumentSchema>

export const newDocumentResolver = zodResolver(newDocumentSchema)
