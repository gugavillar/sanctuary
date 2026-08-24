import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const loginSchema = z.object({
	email: z
		.email({
			message: 'Email inválido',
		})
		.min(1, 'Campo obrigatório'),
	password: z
		.string({ error: 'Campo obrigatório' })
		.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
		.refine((value) => value.length >= 6, {
			message: 'Password deve ter no mínimo 6 caracteres',
		}),
})

export type LoginSchema = z.infer<typeof loginSchema>
export const loginResolver = zodResolver(loginSchema)
