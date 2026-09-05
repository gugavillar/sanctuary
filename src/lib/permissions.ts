import type { UserCategoryPermission } from './get-user-permissions'

type SessionUser = { role: 'ADMIN' | 'USER' } | null | undefined

export const isAdmin = (user: SessionUser) => user?.role === 'ADMIN'

export const canAddToCategory = (user: SessionUser, permissions: Array<UserCategoryPermission>, categoryId: string) =>
	isAdmin(user) ||
	permissions.some((permission) => permission.categoryId === categoryId && permission.level === 'VIEW_AND_ADD')

export const hasAnyAddPermission = (user: SessionUser, permissions: Array<UserCategoryPermission>) =>
	isAdmin(user) || permissions.some((permission) => permission.level === 'VIEW_AND_ADD')

export const viewableCategoryIds = (user: SessionUser, permissions: Array<UserCategoryPermission>) =>
	isAdmin(user) ? null : permissions.map((permission) => permission.categoryId)
