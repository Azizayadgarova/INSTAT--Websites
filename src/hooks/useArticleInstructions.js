import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteArticleInstructionsApi } from '@/api/siteContent.api'
import { useApiResource } from './useApiResource'

/**
 * "Maqola nashri talablari" bosqichlarini backenddan yuklaydi
 * (MaqolaTalablari komponenti) — /api/site-article-instructions/items/all/.
 *
 * Backend `title_(uz|ru|en)`, `description_(uz|ru|en)`, `image`, `order`
 * qaytaradi. Joriy tilga mos maydon tanlanadi.
 *
 * DIQQAT: timeline qat'iy joylashuvda (raqam + chap/o'ng navbatlashuv),
 * shuning uchun hook DOIMO `presets.length` ta slot qaytaradi — API matni
 * (order bo'yicha) mavjud slotlar ustiga qo'yiladi, `num`/`flip` presetdagicha
 * qoladi. Bu bilan backend to'liq to'ldirilmagan bo'lsa ham dizayn buzilmaydi.
 *
 * Natija ITEMS bilan bir xil shaklda ({ id, num, title, desc, flip }) —
 * MaqolaTalablari komponenti hech qanday boshqa o'zgarishsiz ishlaydi.
 *
 * @param {Array} presets - statik talablar (slotlar: num/flip manbai + fallback)
 */
export const useArticleInstructions = (presets = []) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => siteArticleInstructionsApi.getAllFlat(), [])

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const sorted = (Array.isArray(data) ? data : []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
		if (sorted.length === 0) return presets

		// Qat'iy slotlar: API matnini mos presetga qo'shamiz (num/flip saqlanadi)
		return presets.map((preset, i) => {
			const item = sorted[i]
			if (!item) return preset
			return {
				...preset,
				title: pick(item, 'title') || preset.title,
				desc: pick(item, 'description') || preset.desc,
			}
		})
	}, [data, lang, presets])

	return { items, loading, error, retry, isFallback: items === presets }
}

export default useArticleInstructions
