import { zodResolver } from '@hookform/resolvers/zod'
import { isValid, parse } from 'date-fns'
import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPE = 'application/pdf'

const transformDate = (date: string) => {
	return parse(date, 'dd/MM/yyyy', new Date())
}

const newDocumentSchema = z.object({
	category: z.string({ error: 'Campo obrigatório' }).min(1, { error: 'Campo obrigatório' }),
	date: z
		.string({ error: 'Campo obrigatório' })
		.optional()
		.refine((value) => value === undefined || value === '' || value.trim().length > 0, {
			error: 'O campo pode ser vazio ou não pode conter apenas espaços em branco',
		})
		.refine((value) => (value ? /^\d{2}\/\d{2}\/\d{4}/g.test(value) && isValid(transformDate(value)) : true), {
			error: 'A data não é valida',
		}),
	description: z
		.string({ error: 'Campo obrigatório' })
		.optional()
		.refine((value) => value === undefined || value === '' || value.trim().length > 0, {
			error: 'O campo pode ser vazio ou não pode conter apenas espaços em branco',
		}),
	file: z
		.any()
		.refine((file) => file instanceof File, {
			error: 'Arquivo inválido',
		})
		.refine((file) => file?.size <= MAX_FILE_SIZE, {
			error: 'O arquivo deve ter no máximo 5MB',
		})
		.refine((file) => file?.type === ACCEPTED_TYPE, {
			error: 'O arquivo deve ser um PDF',
		}),
	identification: z
		.string({ error: 'Campo obrigatório' })
		.optional()
		.refine((value) => value === undefined || value === '' || value.trim().length > 0, {
			error: 'O campo pode ser vazio ou não pode conter apenas espaços em branco',
		}),
	tags: z
		.array(
			z.object({
				tag: z
					.string({ error: 'Campo obrigatório' })
					.refine((value) => value === undefined || value === '' || value.trim().length > 0, {
						error: 'O campo pode ser vazio ou não pode conter apenas espaços em branco',
					}),
			})
		)
		.optional()
		.refine(
			(value) => {
				if (!value?.length) return true
				const tags = value.map((item) => item.tag.trim().toLowerCase())
				return new Set(tags).size === value.length
			},
			{
				error: 'As tags devem ser únicas',
			}
		),
	title: z
		.string({ error: 'Campo obrigatório' })
		.min(6, { error: 'O título deve ter no mínimo 6 caracteres' })
		.refine((value) => Boolean(value.trim()), { error: 'O título não pode ser vazio' })
		.transform((value) => value.trim()),
	type: z.string({ error: 'Campo obrigatório' }).min(1, { error: 'Campo obrigatório' }),
})

export type NewDocumentSchema = z.infer<typeof newDocumentSchema>

export const newDocumentResolver = zodResolver(newDocumentSchema)
