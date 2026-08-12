import api, { infoResourceApi } from './axios'
import { API_INFO_RESOURCE_URL, API_URL } from '@/config/api'

/**
 * Sayt kontenti: GET /site-data/items/all/
 * Kesh + request dedup + module/key indekslash.
 */
let cache = null
let inflight = null

const index = items => {
	const byModule = {}
	const byModuleKey = {}
	for (const item of items) {
		;(byModule[item.module] ??= []).push(item)
		;(byModuleKey[item.module] ??= {})[item.key] = item
	}
	return { items, byModule, byModuleKey }
}

const fetchItems = instance =>
	instance.get('/site-data/items/all/').then(({ data }) => (Array.isArray(data) ? data : []))

/**
 * "Axborot resurslari" havolalari asosiy backend'da bo'sh, shuning uchun
 * `info_resource` moduli alohida manbadan olinadi (@/config/api).
 * Ikkinchi so'rov shart bo'lmasa yoki yiqilsa — asosiy javob o'zgarishsiz
 * qoladi, ya'ni sayt hech qachon bu so'rovga bog'lanib qolmaydi.
 */
const INFO_RESOURCE = 'info_resource'
const useSeparateInfoResource = API_INFO_RESOURCE_URL !== API_URL

const replaceModule = (items, extra, module) => {
	const replacement = extra.filter(i => i.module === module)
	if (!replacement.length) return items
	return [...items.filter(i => i.module !== module), ...replacement]
}

/**
 * Har qanday xatoni (tarmoq, 404, hatto instance yo'qligini) `null` ga
 * aylantiradi — Promise.resolve() sinxron throw'ni ham ushlaydi. Ikkilamchi
 * manba saytni yiqitmasligi kerak.
 */
const fetchInfoResource = () =>
	useSeparateInfoResource
		? Promise.resolve()
				.then(() => fetchItems(infoResourceApi))
				.catch(() => null)
		: Promise.resolve(null)

export const getSiteData = async () => {
	if (cache) return cache
	if (inflight) return inflight
	inflight = Promise.all([fetchItems(api), fetchInfoResource()])
		.then(([items, infoItems]) => {
			cache = index(infoItems ? replaceModule(items, infoItems, INFO_RESOURCE) : items)
			return cache
		})
		.finally(() => {
			inflight = null
		})
	return inflight
}

/** Bitta modulning barcha yozuvlari (topilmasa — bo'sh ro'yxat). */
export const getModule = async module => (await getSiteData()).byModule[module] ?? []

/** module + key bo'yicha bitta yozuv (topilmasa — null). */
export const getItem = async (module, key) =>
	(await getSiteData()).byModuleKey[module]?.[key] ?? null

export const resetSiteDataCache = () => {
	cache = null
	inflight = null
}
