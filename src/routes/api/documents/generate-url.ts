import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createFileRoute } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { prisma } from '#/db'
import { auth } from '#/lib/auth'
import { s3 } from '#/lib/s3'

export const Route = createFileRoute('/api/documents/generate-url')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const session = await auth.api.getSession({ headers: getRequestHeaders() })

				if (!session) {
					return Response.json({ error: 'Unauthorized' }, { status: 401 })
				}

				const params = new URL(request.url).searchParams
				const id = params.get('id')

				if (!id) {
					return Response.json({ error: 'Bad Request' }, { status: 400 })
				}

				try {
					const data = await prisma.document.findUnique({
						where: {
							id,
						},
					})

					if (!data) {
						return Response.json({ error: 'Not Found' }, { status: 404 })
					}

					const command = new GetObjectCommand({
						Bucket: process.env.AWS_BUCKET as string,
						Key: data.filePath as string,
					})

					const url = await getSignedUrl(s3, command, {
						expiresIn: 60,
					})

					return Response.json({ data: { url } }, { status: 201 })
				} catch {
					return Response.json({ error: 'Internal Server Error' }, { status: 500 })
				}
			},
		},
	},
})
