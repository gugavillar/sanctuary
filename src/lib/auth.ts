import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { prisma } from '#/db'

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [tanstackStartCookies()],
	user: {
		additionalFields: {
			role: { defaultValue: 'USER', input: false, required: true, type: ['ADMIN', 'USER'] },
		},
	},
})
