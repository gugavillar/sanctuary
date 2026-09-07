import { File, FilePlus, Folder, Users2 } from 'lucide-react'

// biome-ignore assist/source/useSortedKeys: order dashboard cards
export const MAPPED_CARDS = {
	documents: { icon: <File />, title: 'Documentos' },
	categories: { icon: <Folder />, title: 'Categorias' },
	thisMonth: { icon: <FilePlus />, title: 'Este mês' },
	users: { icon: <Users2 />, title: 'Usuários' },
}

export const generateGraphLabels = (data: { month: string }[]) => {
	return data.map((item) => item.month)
}

export const generateGraphData = (data: { month: string; count: number }[]) => {
	return data.map((item) => item.count)
}

export const HEADER_LABELS = [
	{
		accessor: 'title',
		label: 'Título',
	},
	{
		accessor: 'category',
		label: 'Categoria',
	},
	{
		accessor: 'time',
		label: 'Data',
	},
]
