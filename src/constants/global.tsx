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

export const DOCUMENTS_CATEGORIES = [
	{ label: 'Administrativo', value: 'admin' },
	{ label: 'Financeiro', value: 'finance' },
	{ label: 'Membros', value: 'members' },
	{ label: 'Patrimônio', value: 'patrimony' },
	{ label: 'Eventos', value: 'events' },
	{ label: 'Ministérios', value: 'ministries' },
	{ label: 'Jurídico', value: 'legal' },
	{ label: 'Histórico', value: 'history' },
]

export const DOCUMENTS_TYPES = [
	{ label: 'Ata', value: 'minutes' },
	{ label: 'Contrato', value: 'contract' },
	{ label: 'Estatuto', value: 'statute' },
	{ label: 'Regimento', value: 'regime' },
	{ label: 'Ofício', value: 'office' },
	{ label: 'Carta', value: 'letter' },
	{ label: 'Relatório', value: 'report' },
	{ label: 'Nota fiscal', value: 'invoice' },
	{ label: 'Recibo', value: 'receipt' },
	{ label: 'Comprovante', value: 'proof' },
	{ label: 'Certidão', value: 'certificate' },
	{ label: 'Formulário', value: 'form' },
	{ label: 'Declaração', value: 'declaration' },
	{ label: 'Outros', value: 'other' },
]
