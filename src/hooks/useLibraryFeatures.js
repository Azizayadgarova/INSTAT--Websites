import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteLibraryFeaturesApi } from '@/api/siteContent.api'
import { useApiResource } from './useApiResource'

/**
 * "Platforma qanday ishlaydi" feature kartalarini backenddan yuklaydi
 * (FoydalanishJarayoni komponenti) — /api/site-library-features/items/all/.
 *
 * Backend `title_(uz|ru|en)`, `description_(uz|ru|en)`, `image`, `order`
 * qaytaradi. Ikona (icon) backendda YO'Q — u `presets` dan olinadi.
 *
 * DIQQAT: FoydalanishJarayoni grid'i qat'iy joylashuvda (4 karta + 2 rasm),
 * shuning uchun hook DOIMO `presets.length` ta slot qaytaradi — API matni
 * mavjud slotlar ustiga qo'yiladi (order bo'yicha), qolgani presetdagicha
 * qoladi. Shu bilan backend to'liq to'ldirilmagan bo'lsa ham dizayn buzilmaydi.
 *
 * @param {Array} presets - statik feature kartalar (slotlar + ikona manbai)
 */
export const useLibraryFeatures = (presets = []) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => siteLibraryFeaturesApi.getAllFlat(), [])

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const sorted = (Array.isArray(data) ? data : []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
		if (sorted.length === 0) return presets

		// Qat'iy slotlar: har bir presetga mos API elementini (bo'lsa) qo'shamiz
		return presets.map((preset, i) => {
			const item = sorted[i]
			if (!item) return preset
			return {
				...preset,
				title: pick(item, 'title') || preset.title,
				description: pick(item, 'description') || preset.description,
			}
		})
	}, [data, lang, presets])

	return { items, loading, error, retry, isFallback: items === presets }
}

export default useLibraryFeatures
