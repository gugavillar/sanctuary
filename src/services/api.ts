import axios from 'axios'

import { getCookie } from '#/lib/get-cookie'

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_APP_URL}/api`,
})

api.interceptors.request.use(async (config) => {
	if (import.meta.env.SSR) {
		const cookie = await getCookie()
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
