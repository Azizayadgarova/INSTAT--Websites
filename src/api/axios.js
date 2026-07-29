import axios from 'axios'

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? '/api',
	timeout: 15000,
	headers: { 'Content-Type': 'application/json' },
})

// Ba'zi endpoint'lar (site-managers, site-vacancies, site-posts, site-events,
// site-faqs, site-corruption-*) autentifikatsiya talab qiladi (401 qaytaradi).
// Token bo'lsa avtomatik biriktiramiz; hozircha loginsiz bu endpoint'lar 401 beradi.
const TOKEN_KEY = 'instat_auth_token'
export const setAuthToken = token => {
	if (token) localStorage.setItem(TOKEN_KEY, token)
	else localStorage.removeItem(TOKEN_KEY)
}
export const getAuthToken = () => localStorage.getItem(TOKEN_KEY)

api.interceptors.request.use(config => {
	const token = getAuthToken()
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

// Markazlashgan xatolik ishlovi — komponentlarda try/catch takrorlanmasin
api.interceptors.response.use(
	response => response,
	error => {
		const status = error?.response?.status
		const message =
			error?.response?.data?.message ??
			(status ? `So‘rov xatosi (${status})` : 'Tarmoq bilan bog‘lanib bo‘lmadi')
		return Promise.reject(Object.assign(new Error(message), { status, original: error }))
	},
)

export default api
