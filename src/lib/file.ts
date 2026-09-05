import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { randomUUID } from 'node:crypto'

import { ACCEPTED_TYPE } from '#/constants'
import { prisma } from '#/db'

import { s3 } from './s3'

type SendFileParams = {
	title: string
	file: File
	categoryId: string
	id: string
}

export const sendFile = async ({ title, file, categoryId, id }: SendFileParams) => {
	try {
		const sanitizedTitle = title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')

		const key = `${categoryId}/${sanitizedTitle}-${randomUUID()}`

		const command = new PutObjectCommand({
			Bucket: process.env.AWS_BUCKET as string,
			ContentType: ACCEPTED_TYPE,
			Key: key,
		})

		const url = await getSignedUrl(s3, command, {
			expiresIn: 60,
		})

		await fetch(url, {
			body: file,
			headers: {
				'Content-Type': ACCEPTED_TYPE,
			},
			method: 'PUT',
		})

		return await prisma.document.update({
			data: {
				filePath: key,
			},
			where: {
				id,
			},
		})
	} catch (error) {
		console.error(error)
		throw new Error('Ocorreu um erro ao enviar o arquivo')
	}
}
