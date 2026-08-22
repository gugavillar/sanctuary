import { FileScan, Gauge } from 'lucide-react'

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
]
