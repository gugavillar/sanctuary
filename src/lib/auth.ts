import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { admin } from 'better-auth/plugins'
import { defaultRoles } from 'better-auth/plugins/admin/access'
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
	plugins: [
		admin({
			adminRoles: 'ADMIN',
			defaultRole: 'USER',
			roles: {
				ADMIN: defaultRoles.admin,
				USER: defaultRoles.user,
			},
		}),
		tanstackStartCookies(),
	],
	user: {
		additionalFields: {
			mustChangePassword: { defaultValue: false, input: false, required: true, type: ['boolean'] },
			role: { defaultValue: 'USER', input: false, required: true, type: ['ADMIN', 'USER'] },
		},
	},
})
