import type { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string
	error?: string
}

export const Input = ({ label, className, error, ...props }: InputProps) => {
	return (
		<div className="flex w-full flex-col gap-1">
			<label className="text-sm" htmlFor={props.id}>
				{label}
			</label>
			<div className="flex w-full flex-col gap-1">
				<input
					className={twMerge(
						'block w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2.5 shadow shadow-black/30 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm',
						className
					)}
					{...props}
				/>
				{error && <p className="ps-1 text-red-500 text-xs">{error}</p>}
			</div>
		</div>
	)
}
