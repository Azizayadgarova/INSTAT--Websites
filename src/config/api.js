// Backend manzillari shu yerda markazlashgan. Env berilmasa (yoki bo'sh bo'lsa)
// asosiy prod manbasi — api1.instat.uz ishlatiladi.
const fromEnv = (value, fallback) => String(value || fallback).replace(/\/+$/, '')

export const API_URL = fromEnv(import.meta.env.VITE_API_URL, 'https://api1.instat.uz/api')
/**
 * Yangiliklar (site-posts) va "Axborot resurslari" (site-data `info_resource`)
 * ham asosiy backend'dan (api1.instat.uz) keladi. Alohida manbaga qaytish
 * kerak bo'lsa, tegishli VITE_API_*_URL env'ini bering. API_INFO_RESOURCE_URL
 * API_URL ga teng bo'lsa qo'shimcha so'rov yuborilmaydi (@/api/siteData.api).
 */
export const API_NEWS_URL = fromEnv(import.meta.env.VITE_API_NEWS_URL, API_URL)
export const API_INFO_RESOURCE_URL = fromEnv(import.meta.env.VITE_API_INFO_RESOURCE_URL, API_URL)
export const API_STORAGE_URL = fromEnv(import.meta.env.VITE_API_STORAGE_URL, 'https://api1.instat.uz/media')
export const API_CABINET_URL = fromEnv(import.meta.env.VITE_API_CABINET_URL, 'https://my.instat.uz')

// Backend nisbiy yo'l qaytarganda (masalan avatar: "/media/…") to'liq manzil yasash uchun
export const API_ORIGIN = (() => {
	try {
		return new URL(API_URL).origin
	} catch {
		return ''
	}
})()

/** Storage'dagi fayl nomidan to'liq URL — ikkilangan `/` bo'lmaydi. */
export const storageUrl = file => (file ? `${API_STORAGE_URL}/${String(file).replace(/^\/+/, '')}` : '')
