import { FileScan, Gauge, Users2 } from 'lucide-react'

export const FIRST_PASSWORD = '12345678'

export const MENU_ITEMS = [
	{
		icon: <Gauge />,
		label: 'Dashboard',
		to: '/dashboard',
	},
	{
		icon: <FileScan />,
		label: 'Documentos',
		to: '/documentos',
	},
	{
		adminOnly: true,
		icon: <Users2 />,
		label: 'Usuários',
		to: '/usuarios',
	},
]
