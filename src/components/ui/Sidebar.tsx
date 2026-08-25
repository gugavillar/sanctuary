import { Link, useNavigate } from '@tanstack/react-router'
import { FileBox } from 'lucide-react'

import { MENU_ITEMS } from '#/constants'
import { authClient } from '#/lib/auth-client'

import { Button } from '../forms'

const SidebarItem = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => {
	return (
		<Link
			activeProps={{ className: 'font-semibold bg-gray-300' }}
			className="flex gap-2.5 rounded-lg border border-gray-400 p-2.5 shadow hover:bg-gray-300"
			to={to}
		>
			{icon}
			{label}
		</Link>
	)
}

export const Sidebar = () => {
	const navigate = useNavigate()
	const handleLogout = async () => {
		await authClient.signOut()
		navigate({ to: '/' })
	}

	return (
		<div className="flex flex-col border-r border-r-gray-400 bg-gray-200 p-6">
			<div className="flex items-center gap-2.5 pb-6">
				<FileBox size={32} />
				<h1 className="font-semibold text-2xl">Sanctuary</h1>
			</div>
			<div className="mt-6">
				<div className="flex flex-col gap-2.5">
					{MENU_ITEMS.map((item) => (
						<SidebarItem key={item.label} {...item} />
					))}
				</div>
			</div>
			<div className="mt-auto pt-6">
				<Button className="w-full bg-emerald-600 p-2.5 text-white hover:bg-emerald-500" onClick={handleLogout}>
					Sair
				</Button>
			</div>
		</div>
	)
}
