import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { ChevronLeft } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Input, Select } from '#/components/forms'
import { documentCategoryQuery } from '#/services/documents/hooks/useGetCategories'
import { createUser } from '#/services/users/usecase/createUser'

import { type NewUserSchema, newUserResolver } from './NewUser.schema'

const ROLE_OPTIONS = [
	{ label: 'Usuário', value: 'USER' },
	{ label: 'Administrador', value: 'ADMIN' },
]

const PERMISSION_LEVEL_OPTIONS = [
	{ label: 'Sem acesso', value: 'NONE' },
	{ label: 'Visualizar', value: 'VIEW' },
	{ label: 'Visualizar e adicionar', value: 'VIEW_AND_ADD' },
]

export const NewUser = () => {
	const navigate = useNavigate()
	const { data: categories } = useSuspenseQuery(documentCategoryQuery())
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
		reset,
	} = useForm<NewUserSchema>({
		defaultValues: {
			categoryPermissions: Object.fromEntries(categories.map((category) => [category.value, 'NONE'])),
			email: '',
			name: '',
			role: 'USER',
		},
		mode: 'onChange',
		resolver: newUserResolver,
	})
	const role = useWatch({ control, name: 'role' })

	const handleBack = () => {
		navigate({ to: '/usuarios' })
	}

	const onSubmit = async (data: NewUserSchema) => {
		try {
			await createUser({
				email: data.email,
				name: data.name,
				permissions: Object.entries(data.categoryPermissions)
					.filter(([, level]) => level !== 'NONE')
					.map(([categoryId, level]) => ({ categoryId, level: level as 'VIEW' | 'VIEW_AND_ADD' })),
				role: data.role,
			})
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 409) {
				return toast.error('Email já cadastrado')
			}
			return toast.error('Falha ao criar usuário')
		}

		toast.success('Usuário criado com sucesso')
		reset()
	}

	return (
		<>
			<div className="flex items-center gap-3">
				<Button className="text-gray-500 shadow-none" onClick={handleBack}>
					<ChevronLeft />
					<span>Voltar</span>
				</Button>
				<h1 className="text-3xl">Novo usuário</h1>
			</div>
			<form className="flex max-w-md flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
				<Input {...register('name')} error={errors.name?.message} label="Nome" placeholder="Nome" />
				<Input {...register('email')} error={errors.email?.message} label="Email" placeholder="email@example.com" />
				<Select
					error={errors.role?.message}
					label="Papel"
					options={ROLE_OPTIONS}
					placeholder="Papel"
					{...register('role')}
				/>
				{role === 'USER' &&
					categories.map((category) => (
						<Select
							key={category.value}
							label={`Permissão — ${category.label}`}
							options={PERMISSION_LEVEL_OPTIONS}
							{...register(`categoryPermissions.${category.value}`)}
						/>
					))}
				<Button
					className="w-50 self-end bg-emerald-600 text-white hover:bg-emerald-500"
					disabled={!isDirty || !isValid}
					type="submit"
				>
					Salvar
				</Button>
			</form>
		</>
	)
}
