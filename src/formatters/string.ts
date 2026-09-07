import { format, isToday, isYesterday, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDateToSaveDatabase = (date: string) => {
	if (!date) return ''

	return parse(date, 'dd/MM/yyyy', new Date(), {
		locale: ptBR,
	}).toISOString()
}

export const formatDocumentDate = (date: string) => {
	if (isToday(date)) {
		return 'Hoje'
	}

	if (isYesterday(date)) {
		return 'Ontem'
	}

	return format(date, "dd 'de' MMMM", {
		locale: ptBR,
	})
}
