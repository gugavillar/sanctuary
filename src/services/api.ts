import axios from 'axios'

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_APP_URL}/api`,
})

api.interceptors.request.use(async (config) => {
	if (import.meta.env.SSR) {
		const { getRequestHeaders } = await import('@tanstack/react-start/server')
		const cookie = getRequestHeaders().get('cookie')

		if (cookie) {
			config.headers.set('cookie', cookie)
		}
	}

	return config
})

api.interceptors.response.use(
	(response) => response.data,
	async (error) => Promise.reject(error)
)
