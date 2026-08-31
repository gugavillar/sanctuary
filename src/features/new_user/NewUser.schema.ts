import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const permissionLevelSchema = z.enum(['NONE', 'VIEW', 'VIEW_AND_ADD'])

const newUserSchema = z.object({
	categoryPermissions: z.record(z.string(), permissionLevelSchema),
	email: z
		.string({ error: 'Campo obrigatório' })
		.email({ error: 'Email inválido' })
		.transform((value) => value.trim()),
	name: z
		.string({ error: 'Campo obrigatório' })
		.min(1, { error: 'Campo obrigatório' })
		.refine((value) => Boolean(value.trim()), { error: 'O nome não pode ser vazio' })
		.transform((value) => value.trim()),
	role: z.enum(['ADMIN', 'USER'], { error: 'Campo obrigatório' }),
})

export type NewUserSchema = z.infer<typeof newUserSchema>

export const newUserResolver = zodResolver(newUserSchema)
