import { useNavigate } from '@tanstack/react-router'
import { ChevronLeft, PlusCircle, Trash2 } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Button, FileInput, Input, MaskedInput, Select } from '#/components/forms'

import { type NewDocumentSchema, newDocumentResolver } from './NewDocument.schema'

export const NewDocument = () => {
	const [file, setFile] = useState<File | undefined>(undefined)
	const [urlFile, setUrlFile] = useState<string>('')
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

	console.log(errors)

	return (
		<>
			<div className="flex items-center gap-3">
				<Button className="text-gray-500 shadow-none" onClick={handleBack}>
					<ChevronLeft />
					<span>Voltar</span>
				</Button>
				<h1 className="text-3xl">Novo documento</h1>
			</div>
			<div className="grid h-[80dvh] grid-cols-2 gap-6">
				<form className="flex flex-col gap-6" name="new-document" onSubmit={handleSubmit(onSubmit)}>
					<Input label="Título" placeholder="Título" {...register('title')} error={errors.title?.message} />
					<div className="flex gap-6">
						<Select label="Tipo" options={[]} placeholder="Tipo" {...register('type')} />
						<Select label="Categoria" options={[]} placeholder="Categoria" {...register('category')} />
					</div>
					<div className="flex gap-6">
						<MaskedInput format="##/##/####" label="Data" placeholder="Data" {...register('date')} />
						<Input label="Número/Identificação" placeholder="Número/Identificação" {...register('identification')} />
					</div>
					<Input label="Descrição" placeholder="Descrição" {...register('description')} />
					{fields.map((item, index) => (
						<div className="flex items-center justify-between gap-6" key={item.id}>
							<Input key={item.id} label="Tags" placeholder="Etiqueta" {...register(`tags.${index}.tag`)} />
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
					<FileInput
						control={control}
						fieldName="file"
						handleRemoveFile={handleRemoveFile}
						onChange={handleFileChange}
						watch={watch}
					/>
					<Select label="Permissão" options={[]} placeholder="Permissão" />
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
