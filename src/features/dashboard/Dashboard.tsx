import type { ReactNode } from 'react'

import { BarChart, Table } from '#/components/ui'
import { useQuery } from '#/lib/query-client'
import { dashboardQuery } from '#/services/dashboard/hooks/useGetDashboard'

import { generateGraphData, generateGraphLabels, HEADER_LABELS, MAPPED_CARDS } from './Dashboard.utils'

const DashboardCard = ({ count, icon, title }: { icon: ReactNode; title: string; count: number }) => {
	return (
		<div className="grow rounded-xl border bg-gray-100 p-6 shadow-2xl">
			<h3 className="inline-flex items-center gap-2 font-bold text-xl">
				{icon} {count}
			</h3>
			<p>{title}</p>
		</div>
	)
}

export const Dashboard = () => {
	const { data: dashboard, isLoading } = useQuery(dashboardQuery())
	const { documentsByMonth, recentDocuments, ...rest } = dashboard ?? {}
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-6">
				<h2 className="text-2xl">Visão geral dos documentos</h2>
				<div className="flex gap-6">
					{Object.entries(MAPPED_CARDS).map(([key, value]) => (
						<DashboardCard
							count={rest?.[key as keyof typeof dashboard] ?? 0}
							icon={value.icon}
							key={key}
							title={value.title}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-6 rounded-xl border bg-gray-100 p-6 shadow-2xl">
				<h2 className="text-2xl">Adicionados recentemente</h2>
				<Table bodyData={recentDocuments} headerLabels={HEADER_LABELS} isLoading={isLoading} />
			</div>
			<div className="flex h-96 flex-col p-6">
				<h2 className="text-2xl">Adicionados por mês</h2>
				<BarChart
					categories={generateGraphLabels(documentsByMonth ?? [])}
					series={[{ data: generateGraphData(documentsByMonth ?? []) }]}
				/>
			</div>
		</div>
	)
}
