import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router'

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
				<Scripts />
			</body>
		</html>
	)
}
