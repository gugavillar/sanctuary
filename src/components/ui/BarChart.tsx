import type { ApexOptions } from 'apexcharts'
import type { ComponentProps } from 'react'
import ReactApexChart, { type Props } from 'react-apexcharts'
import { twMerge } from 'tailwind-merge'

const OPTIONS_CHART_BAR: ApexOptions = {
	chart: {
		toolbar: {
			show: false,
		},
		zoom: {
			enabled: false,
		},
	},
	colors: ['#14b8a6', '#0ea5e9'],
	dataLabels: {
		enabled: true,
		offsetY: -20,
		style: {
			colors: ['#304758'],
			fontSize: '14px',
		},
		textAnchor: 'middle',
	},
	grid: {
		borderColor: '#e5e7eb',
		strokeDashArray: 0,
	},
	legend: {
		show: true,
	},
	plotOptions: {
		bar: {
			borderRadius: 4,
			borderRadiusApplication: 'end',
			columnWidth: '18px',
			dataLabels: {
				position: 'top',
			},
			horizontal: false,
		},
	},
	states: {
		hover: {
			filter: {
				type: 'darken',
			},
		},
	},
	stroke: {
		colors: ['transparent'],
		show: true,
		width: 2,
	},
	tooltip: {
		enabled: false,
	},
	xaxis: {
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
		crosshairs: {
			show: false,
		},
		labels: {
			show: true,
			trim: true,
		},
		type: 'category',
	},
	yaxis: {
		forceNiceScale: true,
	},
}

type BarChartProps = ComponentProps<'div'> & {
	series: Props['series']
	categories?: Array<string>
}

export const BarChart = ({ className, categories, series }: BarChartProps) => {
	if (!series) return null
	return (
		<ReactApexChart
			className={twMerge('h-full w-full cursor-pointer', className)}
			data-testid="bar-chart"
			height="100%"
			options={{
				...OPTIONS_CHART_BAR,
				xaxis: {
					...OPTIONS_CHART_BAR.xaxis,
					categories,
				},
			}}
			series={series}
			type="bar"
			width="100%"
		/>
	)
}
