import { type ComponentProps, memo } from 'react'
import { twMerge } from 'tailwind-merge'

export type TableHeaderProps = ComponentProps<'thead'> & {
	headerLabels: Array<{
		label: string
		accessor: string
		className?: string
	}>
}

export const TableHeader = memo(({ headerLabels, className, ...props }: TableHeaderProps) => {
	return (
		<thead className={twMerge('bg-slate-800', className)} {...props}>
			<tr>
				{headerLabels?.map(({ label, className }) => (
					<th
						className={twMerge(
							'text-nowrap bg-slate-800 px-6 py-3 text-start font-medium text-gray-100 text-xs uppercase md:first:sticky md:first:left-0',
							className
						)}
						key={crypto.randomUUID()}
						scope="col"
					>
						{label}
					</th>
				))}
			</tr>
		</thead>
	)
})

TableHeader.displayName = 'TableHeader'
