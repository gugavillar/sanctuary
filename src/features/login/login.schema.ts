import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const loginSchema = z.object({
	email: z
		.email({
			error: 'Email inválido',
		})
		.min(1, { error: 'Campo obrigatório' }),
	password: z
		.string({ error: 'Campo obrigatório' })
		.refine((value) => !!value?.length, { error: 'Campo obrigatório' })
		.refine((value) => value.length >= 8, {
			error: 'Password deve ter no mínimo 8 caracteres',
		}),
})

export type LoginSchema = z.infer<typeof loginSchema>
export const loginResolver = zodResolver(loginSchema)
