import { prisma } from "#/db"

const CATEGORIES = [
	'Secretaria',
	'Tesouraria',
]

const TYPES = [
	'Ata',
	'Contrato',
	'Estatuto',
	'Regimento',
	'Ofício',
	'Carta',
	'Relatório',
	'Nota fiscal',
	'Recibo',
	'Comprovante',
	'Certidão',
	'Formulário',
	'Declaração',
	'Outros',
]

async function main() {
  try {
    await prisma.document_Categories.createMany({
      data: CATEGORIES.map((name) => ({ category: name })),
      skipDuplicates: true,
    })
    await prisma.document_Types.createMany({
      data: TYPES.map((name) => ({ type: name })),
      skipDuplicates: true,
    })
	} catch (error) {
		console.error('Erro no seed:', error)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()
