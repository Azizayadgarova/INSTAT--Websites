import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteArticleFeaturesApi } from '@/api/siteContent.api'
import { mediaUrl } from '@/utils/siteContent'
import { useApiResource } from './useApiResource'

/**
 * Elektron jurnal hero karuseli kartalarini backenddan yuklaydi
 * (HeroSection) — /api/site-article-features/items/all/.
 *
 * Backend `title_(uz|ru|en)`, `description_(uz|ru|en)`, `image`, `order`
 * qaytaradi. Karta orqa tomonidagi sarlavha/matn (backTitle/backDesc) shu
 * yerdan olinadi; rasm bo'lsa old muqova (src) ustiga qo'yiladi.
 *
 * DIQQAT: hero 3D halqa qat'iy 5 kartaga moslangan (N = CARDS.length),
 * shuning uchun hook DOIMO `presets.length` ta slot qaytaradi — API matni
 * (order bo'yicha) mavjud slotlar ustiga qo'yiladi, qolgani presetdagicha.
 *
 * @param {Array} presets - statik kartalar (slotlar: src manbai + fallback)
 */
export const useArticleFeatures = (presets = []) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => siteArticleFeaturesApi.getAllFlat(), [])

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const sorted = (Array.isArray(data) ? data : []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
		if (sorted.length === 0) return presets

		return presets.map((preset, i) => {
			const item = sorted[i]
			if (!item) return preset
			return {
				...preset,
				src: mediaUrl(item.image) || preset.src,
				backTitle: pick(item, 'title') || preset.backTitle,
				backDesc: pick(item, 'description') || preset.backDesc,
			}
		})
	}, [data, lang, presets])

	return { items, loading, error, retry, isFallback: items === presets }
}

export default useArticleFeatures
