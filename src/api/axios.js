import axios from 'axios'
import { API_INFO_RESOURCE_URL, API_NEWS_URL, API_URL } from '@/config/api'

// Ba'zi endpoint'lar (site-managers, site-vacancies, site-posts, site-events,
// site-faqs, site-corruption-*) autentifikatsiya talab qiladi (401 qaytaradi).
// Token bo'lsa avtomatik biriktiramiz; hozircha loginsiz bu endpoint'lar 401 beradi.
const TOKEN_KEY = 'instat_auth_token'
export const setAuthToken = token => {
	if (token) localStorage.setItem(TOKEN_KEY, token)
	else localStorage.removeItem(TOKEN_KEY)
}
export const getAuthToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * Bir xil sozlama va interceptor'larga ega axios nusxasi. Asosiy backend bitta
 * (API_URL), lekin ayrim bo'limlar boshqa manzildagi serverdan olinadi — shuning
 * uchun nusxa yasash bitta joyda markazlashgan.
 */
export const createApi = baseURL => {
	const instance = axios.create({
		baseURL,
		timeout: 15000,
		headers: { 'Content-Type': 'application/json' },
	})

	instance.interceptors.request.use(config => {
		const token = getAuthToken()
		if (token) config.headers.Authorization = `Bearer ${token}`
		return config
	})

	// Markazlashgan xatolik ishlovi — komponentlarda try/catch takrorlanmasin
	instance.interceptors.response.use(
		response => response,
		error => {
			const status = error?.response?.status
			const message =
				error?.response?.data?.message ??
				(status ? `So‘rov xatosi (${status})` : 'Tarmoq bilan bog‘lanib bo‘lmadi')
			return Promise.reject(Object.assign(new Error(message), { status, original: error }))
		},
	)

	return instance
}

const api = createApi(API_URL)

/**
 * Yangiliklar (site-posts) alohida serverda turadi — @/config/api dagi
 * API_NEWS_URL ga qarang. Boshqa hamma narsa `api` orqali ketaveradi.
 */
export const newsApi = createApi(API_NEWS_URL)

/**
 * "Axborot resurslari" havolalari (site-data module="info_resource") ham
 * alohida manbadan — @/config/api dagi API_INFO_RESOURCE_URL ga qarang.
 */
export const infoResourceApi = createApi(API_INFO_RESOURCE_URL)

export default api
