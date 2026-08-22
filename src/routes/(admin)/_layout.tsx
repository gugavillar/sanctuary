import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Sidebar } from '#/components/ui'

export const Route = createFileRoute('/(admin)/_layout')({
	component: AdminLayout,
})

function AdminLayout() {
	return (
		<div className="grid h-dvh grid-cols-[14rem_1fr]">
			<Sidebar />
			<div className="flex flex-col overflow-y-auto p-6">
				<Outlet />
			</div>
		</div>
	)
}
