import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'

import { Button, Input, Select } from '#/components/forms'
import { PERMISSION_LEVEL_OPTIONS, ROLE_OPTIONS } from '#/constants'
import { useQuery, useSuspenseQuery } from '#/lib/query-client'
import { documentCategoryQuery } from '#/services/documents/hooks/useGetCategories'
import { userQuery } from '#/services/users/hooks/useGetUser'

import { type EditUserSchema, editUserResolver } from './EditUser.schema'

export const EditUser = () => {
	const navigate = useNavigate()
	const routeApi = getRouteApi('/(admin)/_layout/usuarios/_layout/editar_usuario/$userId')
	const params = routeApi.useParams()
	const { data: categories } = useSuspenseQuery(documentCategoryQuery())
	const { data: user } = useQuery(userQuery(params))
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<EditUserSchema>({
		defaultValues: {
			categoryPermissions: user?.categoryPermissions,
			email: user?.email,
			name: user?.name,
			role: user?.role,
		},
		mode: 'onChange',
		resolver: editUserResolver,
	})
	const role = useWatch({ control, name: 'role' })

	const handleBack = () => {
		navigate({ to: '/usuarios' })
	}

	const onSubmit = async (data: EditUserSchema) => {
		console.log(data)
	}

	return (
		<>
			<div className="flex items-center gap-3">
				<Button className="text-gray-500 shadow-none" onClick={handleBack}>
					<ChevronLeft />
					<span>Voltar</span>
				</Button>
				<h1 className="text-3xl">Editar usuário</h1>
			</div>
			<form className="flex max-w-md flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
				<Input {...register('name')} error={errors.name?.message} label="Nome" placeholder="Nome" />
				<Input {...register('email')} error={errors.email?.message} label="Email" placeholder="email@example.com" />
				<Select
					error={errors.role?.message}
					label="Tipo de usuário"
					options={ROLE_OPTIONS}
					placeholder="Tipo de usuário"
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
