// Backend manzillari shu yerda markazlashgan. Env berilmasa (yoki bo'sh bo'lsa)
// asosiy prod manbasi — api1.instat.uz ishlatiladi.
const fromEnv = (value, fallback) => String(value || fallback).replace(/\/+$/, '')

export const API_URL = fromEnv(import.meta.env.VITE_API_URL, 'https://api1.instat.uz/api')
/**
 * Yangiliklar (site-posts) uchun alohida manba: api1.instat.uz da bu jadval
 * bo'sh, kontent test.avacoder.uz da yuritiladi. Yangiliklar asosiy backend'ga
 * ko'chirilganda shu qatorni API_URL ga tenglashtirish yetarli.
 */
export const API_NEWS_URL = fromEnv(import.meta.env.VITE_API_NEWS_URL, 'https://test.avacoder.uz/api')
/**
 * "Axborot resurslari" tashqi havolalari — site-data'ning `info_resource`
 * moduli. api1.instat.uz da bu kalitlar bo'sh, qiymatlar test.avacoder.uz da
 * to'ldirilgan, shuning uchun SHU MODUL alohida manbadan o'qiladi (qolgan
 * kontent API_URL dan keladi — @/api/siteData.api).
 *
 * Kalitlar asosiy backend'ga ko'chirilganda shu qatorni API_URL ga
 * tenglashtirish yetarli: teng bo'lsa qo'shimcha so'rov umuman yuborilmaydi.
 */
export const API_INFO_RESOURCE_URL = fromEnv(
	import.meta.env.VITE_API_INFO_RESOURCE_URL,
	'https://test.avacoder.uz/api',
)
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
