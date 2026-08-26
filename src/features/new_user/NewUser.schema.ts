import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const newUserSchema = z.object({
	email: z
		.string({ error: 'Campo obrigatório' })
		.email({ error: 'Email inválido' })
		.transform((value) => value.trim()),
	name: z
		.string({ error: 'Campo obrigatório' })
		.min(1, { error: 'Campo obrigatório' })
		.refine((value) => Boolean(value.trim()), { error: 'O nome não pode ser vazio' })
		.transform((value) => value.trim()),
})

export type NewUserSchema = z.infer<typeof newUserSchema>

export const newUserResolver = zodResolver(newUserSchema)
