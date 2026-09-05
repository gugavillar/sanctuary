import { FileScan, Gauge, Users2 } from 'lucide-react'

export const FIRST_PASSWORD = '12345678'

export const LIMIT_PER_PAGE = 10

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_TYPE = 'application/pdf'

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
