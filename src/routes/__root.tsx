import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify'

import type { QueryClient } from '#/lib/query-client'

import appCss from '../styles.css?url'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
	head: () => ({
		links: [
			{
				href: appCss,
				rel: 'stylesheet',
			},
		],
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				content: 'width=device-width, initial-scale=1',
				name: 'viewport',
			},
			{
				title: 'Sanctuary - Gestão de igreja',
			},
		],
	}),
	notFoundComponent: () => <p>Error</p>,
	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<ToastContainer autoClose={5000} closeOnClick pauseOnFocusLoss pauseOnHover position="top-right" />
				<Scripts />
			</body>
		</html>
	)
}
