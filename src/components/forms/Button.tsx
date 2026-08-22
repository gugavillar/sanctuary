import type { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import { Spinner } from '../ui'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode
	isLoading?: boolean
}

export const Button = ({ children, className, isLoading, disabled, ...props }: ButtonProps) => {
	return (
		<button
			className={twMerge(
				'inline-flex cursor-pointer items-center justify-center gap-x-2 rounded-lg px-4 py-3 font-medium text-sm focus:outline-hidden disabled:pointer-events-none disabled:opacity-50',
				className
			)}
			disabled={isLoading || disabled}
			{...props}
		>
			{isLoading ? <Spinner /> : children}
		</button>
	)
}
