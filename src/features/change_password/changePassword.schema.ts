import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const changePasswordSchema = z
	.object({
		confirmPassword: z
			.string({ error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { error: 'Campo obrigatório' })
			.refine((value) => value.length >= 8, {
				error: 'Senha deve ter no mínimo 8 caracteres',
			}),
		newPassword: z
			.string({ error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { error: 'Campo obrigatório' })
			.refine((value) => value.length >= 8, {
				error: 'Senha deve ter no mínimo 8 caracteres',
			}),
	})
	.superRefine((data, ctx) => {
		if (data.newPassword !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Senhas diferentes',
				path: ['confirmPassword'],
			})
		}
	})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
export const changePasswordResolver = zodResolver(changePasswordSchema)
