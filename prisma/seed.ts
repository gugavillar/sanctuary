import { FIRST_PASSWORD } from "#/constants"
import { prisma } from "#/db"
import { auth } from "#/lib/auth"

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
    const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@admin.com.br' } })

    if (!existingAdmin) {
      const { user, token } = await auth.api.signUpEmail({
        body: { email: 'admin@admin.com.br', name: 'Administrador', password: FIRST_PASSWORD },
      })

      if (!token) throw new Error('Sign up failed')

      await prisma.user.update({
        data: { mustChangePassword: true, role: 'ADMIN' },
        where: { id: user.id },
      })
    }
	} catch (error) {
		console.error('Erro no seed:', error)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()
