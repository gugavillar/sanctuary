import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Input } from '#/components/forms'
import { authClient } from '#/lib/auth-client'
import { useQueryClient } from '#/lib/query-client'
import { useUpdatePassword } from '#/services/users/hooks/useUpdatePassword'

import { type ChangePasswordSchema, changePasswordResolver } from './changePassword.schema'

export const ChangePassword = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { mutateAsync: updatePassword } = useUpdatePassword()
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm<ChangePasswordSchema>({
		defaultValues: {
			confirmPassword: '',
			newPassword: '',
		},
		mode: 'onChange',
		resolver: changePasswordResolver,
	})

	const onSubmit = async (data: ChangePasswordSchema) => {
		await updatePassword(
			{
				newPassword: data.newPassword,
			},
			{
				onError: () => {
					toast.error('Falha ao alterar a senha')
				},
				onSuccess: async () => {
					toast.success('Senha alterada com sucesso!')
					await authClient.signOut()
					queryClient.clear()
					navigate({ to: '/' })
				},
			}
		)
	}

	return (
		<form
			className="mx-auto flex w-120 flex-col items-center justify-center gap-6"
			name="login"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="font-bold text-2xl lg:text-3xl">Altere a sua senha</h1>
			<Input
				label="Nova senha"
				placeholder="********"
				type="password"
				{...register('newPassword')}
				error={errors.newPassword?.message}
			/>
			<Input
				label="Confirmação de senha"
				placeholder="********"
				type="password"
				{...register('confirmPassword')}
				error={errors.confirmPassword?.message}
			/>
			<Button
				className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
				disabled={!isDirty || !isValid}
				isLoading={isSubmitting}
				type="submit"
			>
				Alterar
			</Button>
		</form>
	)
}
