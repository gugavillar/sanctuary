import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label: string
	error?: string
	placeholder?: string
	options?: Array<{
		label: string
		value: string
		disabled?: boolean
	}>
}

export const Select = ({ label, className, error, options, placeholder, ...props }: SelectProps) => {
	return (
		<>
			<label className="sr-only" htmlFor={props.id}>
				{label}
			</label>
			<div className="relative flex w-full flex-col gap-1">
				<ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2" size={24} />
				<select
					className={twMerge(
						'block w-full appearance-none rounded-lg border border-gray-400 bg-transparent px-4 py-2.5 pe-9 shadow shadow-black/30 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm',
						className
					)}
					{...props}
				>
					{placeholder && <option value="">{placeholder}</option>}
					{options?.map((option) => (
						<option key={option.label} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{error && <p className="ps-1 text-red-500 text-xs">{error}</p>}
			</div>
		</>
	)
}
