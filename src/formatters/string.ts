import { parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDateToSaveDatabase = (date: string) => {
	if (!date) return ''

	return parse(date, 'dd/MM/yyyy', new Date(), {
		locale: ptBR,
	}).toISOString()
}
