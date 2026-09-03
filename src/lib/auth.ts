import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { prisma } from '#/db'

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		autoSignIn: false,
		enabled: true,
	},
	plugins: [tanstackStartCookies()],
	user: {
		additionalFields: {
			mustChangePassword: { defaultValue: false, input: false, required: true, type: ['boolean'] },
			role: { defaultValue: 'USER', input: false, required: true, type: ['ADMIN', 'USER'] },
		},
	},
})
