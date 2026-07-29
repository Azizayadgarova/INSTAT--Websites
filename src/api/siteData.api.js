import api from './axios'

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

export const getSiteData = async () => {
	if (cache) return cache
	if (inflight) return inflight
	inflight = api
		.get('/site-data/items/all/')
		.then(({ data }) => {
			cache = index(Array.isArray(data) ? data : [])
			return cache
		})
		.finally(() => {
			inflight = null
		})
	return inflight
}

export const resetSiteDataCache = () => {
	cache = null
	inflight = null
}
