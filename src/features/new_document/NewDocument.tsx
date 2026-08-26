import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { ChevronLeft, PlusCircle, Trash2 } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { Button, FileInput, Input, MaskedInput, Select } from '#/components/forms'
import { documentCategoryQuery } from '#/services/documents/hooks/useGetCategories'
import { documentTypeQuery } from '#/services/documents/hooks/useGetTypes'

import { type NewDocumentSchema, newDocumentResolver } from './NewDocument.schema'

export const NewDocument = () => {
	const [file, setFile] = useState<File | undefined>(undefined)
	const [urlFile, setUrlFile] = useState<string>('')

	const { data: documentTypes } = useSuspenseQuery(documentTypeQuery())
	const { data: documentCategories } = useSuspenseQuery(documentCategoryQuery())
	const {
		control,
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<NewDocumentSchema>({
		defaultValues: {
			category: '',
			date: '',
			description: '',
			file: undefined,
			identification: '',
			permission: '',
			tags: [
				{
					tag: '',
				},
			],
			title: '',
			type: '',
		},
		mode: 'onChange',
		resolver: newDocumentResolver,
	})
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'tags',
	})
	const navigate = useNavigate()

	const handleBack = () => {
		navigate({ to: '/documentos' })
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		setFile(file)
		setUrlFile(`${URL.createObjectURL(file)}#toolbar=0&navpanes=0&scrollbar=0`)
		setValue('file', file)
	}

	const handleRemoveFile = () => {
		setValue('file', undefined)
		setFile(undefined)
		setUrlFile('')
	}

	const onSubmit = (data: NewDocumentSchema) => {
		console.log(data)
	}

	return (
		<>
			<div className="flex items-center gap-3">
				<Button className="text-gray-500 shadow-none" onClick={handleBack}>
					<ChevronLeft />
					<span>Voltar</span>
				</Button>
				<h1 className="text-3xl">Novo documento</h1>
			</div>
			<div className="grid grid-cols-2 gap-6">
				<form className="flex flex-col gap-6" name="new-document" onSubmit={handleSubmit(onSubmit)}>
					<Input label="Título" placeholder="Título" {...register('title')} error={errors.title?.message} />
					<div className="flex gap-6">
						<Select
							label="Tipo"
							options={documentTypes}
							placeholder="Tipo"
							{...register('type')}
							error={errors.type?.message}
						/>
						<Select
							label="Categoria"
							options={documentCategories}
							placeholder="Categoria"
							{...register('category')}
							error={errors.category?.message}
						/>
					</div>
					<div className="flex gap-6">
						<MaskedInput
							format="##/##/####"
							label="Data"
							placeholder="Data"
							{...register('date')}
							error={errors.date?.message}
						/>
						<Input
							label="Número/Identificação"
							placeholder="Número/Identificação"
							{...register('identification')}
							error={errors.identification?.message}
						/>
					</div>
					<Input
						label="Descrição"
						placeholder="Descrição"
						{...register('description')}
						error={errors.description?.message}
					/>
					{fields.map((item, index) => (
						<div
							className={twMerge(
								'flex justify-between gap-6',
								errors.tags?.[index]?.tag?.message ? 'items-center' : 'items-end'
							)}
							key={item.id}
						>
							<Input
								key={item.id}
								label={`Etiqueta ${index + 1}`}
								placeholder="Etiqueta"
								{...register(`tags.${index}.tag`)}
								error={errors.tags?.[index]?.tag?.message}
							/>
							{index !== 0 ? (
								<Button className="bg-rose-600 text-white hover:bg-rose-500" onClick={() => remove(index)}>
									<Trash2 />
								</Button>
							) : (
								<Button
									className="bg-emerald-600 text-white hover:bg-emerald-500"
									onClick={() => append({ tag: '' })}
									type="button"
								>
									<PlusCircle />
								</Button>
							)}
						</div>
					))}
					{errors.tags?.root?.message && <p className="text-red-500 text-xs">{errors.tags?.root?.message}</p>}
					<FileInput
						control={control}
						error={errors.file?.message as string}
						fieldName="file"
						handleRemoveFile={handleRemoveFile}
						onChange={handleFileChange}
						watch={watch}
					/>
					<Select error={errors.permission?.message} label="Permissão" options={[]} placeholder="Permissão" />
					<Button
						className="w-50 self-end bg-emerald-600 text-white hover:bg-emerald-500"
						disabled={!isDirty || !isValid}
						type="submit"
					>
						Salvar
					</Button>
				</form>
				{file && <iframe height="100%" src={urlFile} title="Documento anexado" width="100%" />}
			</div>
		</>
	)
}
