import { useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button, Input } from '#/components/forms'
import { FIRST_PASSWORD } from '#/constants'
import { authClient } from '#/lib/auth-client'

import { type NewUserSchema, newUserResolver } from './NewUser.schema'

export const NewUser = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<NewUserSchema>({
		defaultValues: {
			email: '',
			name: '',
		},
		mode: 'onChange',
		resolver: newUserResolver,
	})

	const handleBack = () => {
		navigate({ to: '/usuarios' })
	}

	const onSubmit = async (data: NewUserSchema) => {
		await authClient.signUp.email({
			email: data.email,
			name: data.name,
			password: FIRST_PASSWORD,
		})
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
