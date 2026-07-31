import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { byOrder } from '@/utils/siteContent'
import { useApiResource } from './useApiResource'

/**
 * site-* endpoint'laridan ro'yxat yuklaydigan hook.
 *
 *   const { items } = useSiteList('site-education-mentors', siteEducationMentorsApi, toPerson, FALLBACK)
 *
 * MUHIM: backend bo'sh massiv qaytarsa (prod'da ko'p bo'lim hali to'ldirilmagan)
 * yoki so'rov xato bersa — `fallback` qaytariladi. Shu sababli sahifa hech
 * qachon bo'sh qolmaydi, kontent kiritilishi bilan avtomatik almashadi.
 *
 * @param {string} key      kesh kaliti (endpoint nomi bilan bir xil bo'lsin)
 * @param {object} client   createResourceApi() natijasi
 * @param {Function} mapper (item, lang, index) => normalizatsiya qilingan obyekt.
 *   `index` — ba'zi endpoint'lar (site-vacancies) `id` qaytarmaydi, kalit uchun.
 *   MUHIM: barqaror havola bo'lsin (modul darajasidagi funksiya) — memo deps'da.
 * @param {Array} fallback  API bo'sh bo'lganda ishlatiladigan statik kontent.
 *   MUHIM: barqaror havola bo'lsin (modul darajasidagi const). Chaqiruv joyida
 *   `[]` yozilsa har renderda yangi massiv chiqadi va memo/effekt deps buziladi —
 *   shuning uchun bo'sh fallback uchun argumentni umuman bermang.
 */
const EMPTY = []
const cache = new Map()

const cachedFlat = (key, client) => {
	if (!cache.has(key)) {
		cache.set(
			key,
			client.getAllFlat().catch(err => {
				cache.delete(key) // xato keshlanmasin — retry qayta urinsin
				throw err
			}),
		)
	}
	return cache.get(key)
}

export const resetSiteListCache = () => cache.clear()

export const useSiteList = (key, client, mapper, fallback = EMPTY) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => cachedFlat(key, client), [key])

	const fromApi = Array.isArray(data) && data.length > 0

	const items = useMemo(() => {
		if (!fromApi) return fallback
		const mapped = data.map((item, i) => mapper(item, lang, i))
		// FEATURE oilasidagi endpoint'lar `order` beradi — shunga qarab saralaymiz
		return mapped.every(m => typeof m.order === 'number') ? mapped.sort(byOrder) : mapped
	}, [data, fromApi, lang, mapper, fallback])

	return { items, loading, error, retry, isFallback: !fromApi }
}

export default useSiteList
