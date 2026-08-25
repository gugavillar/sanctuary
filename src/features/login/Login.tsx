import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { Button, Input } from '#/components/forms'
import { authClient } from '#/lib/auth-client'

import { type LoginSchema, loginResolver } from './login.schema'

export const Login = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<LoginSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
		resolver: loginResolver,
	})

	const onSubmit = async (data: LoginSchema) => {
		const { error } = await authClient.signIn.email({
			email: data.email,
			password: data.password,
		})

		if (error) {
			console.error(error.message)
			return
		}

		navigate({ to: '/dashboard' })
	}

	return (
		<form
			className="mx-auto flex w-120 flex-col items-center justify-center gap-6"
			name="login"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="font-bold text-2xl lg:text-3xl">Acesse sua conta</h1>
			<Input
				label="Email"
				placeholder="email@example.com"
				type="email"
				{...register('email')}
				error={errors.email?.message}
			/>
			<Input
				label="Senha"
				placeholder="********"
				type="password"
				{...register('password')}
				error={errors.password?.message}
			/>
			<Button
				className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
				disabled={!isDirty || !isValid}
				type="submit"
			>
				Entrar
			</Button>
		</form>
	)
}
