import { ChevronLeft } from 'lucide-react'

import { Button } from '#/components/forms'

export const NewDocumentSkeleton = () => {
	return (
		<>
			<div className="flex items-center gap-3">
				<Button className="text-gray-500 shadow-none">
					<ChevronLeft />
					<span>Voltar</span>
				</Button>
				<h1 className="text-3xl">Novo documento</h1>
			</div>
			<div className="mt-8 grid h-[80dvh] grid-cols-2 gap-6">
				<ul className="flex animate-pulse flex-col gap-6">
					<li className="h-12 w-full rounded-lg bg-gray-400" />
					<li className="h-12 w-full rounded-lg bg-gray-400" />
					<li className="h-12 w-full rounded-lg bg-gray-400" />
					<li className="h-12 w-full rounded-lg bg-gray-400" />
					<li className="h-12 w-full rounded-lg bg-gray-400" />
					<li className="h-32 w-full rounded-lg bg-gray-400" />
					<li className="h-12 w-full rounded-lg bg-gray-400" />
				</ul>
			</div>
		</>
	)
}
