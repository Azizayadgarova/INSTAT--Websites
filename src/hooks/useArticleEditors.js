import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteArticleEditorsApi } from '@/api/siteContent.api'
import { mediaUrl } from '@/utils/siteContent'
import { useApiResource } from './useApiResource'

/**
 * "Tahririyat a'zolari" ro'yxatini backenddan yuklaydi (TahririyatAzolari)
 * — /api/site-article-editors/items/all/.
 *
 * Backend `name_(uz|ru|en)`, `direction_(uz|ru|en)`, `image`, `experience`
 * qaytaradi. Rasm bo'lmasa (image=null) ism bosh harflaridan avatar
 * generatsiya qilinadi (ui-avatars.com).
 *
 * API bo'sh/xato bo'lsa — `presets` (statik ro'yxat) ko'rsatiladi.
 *
 * @param {Array} presets - statik a'zolar (fallback)
 */
export const useArticleEditors = (presets = []) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => siteArticleEditorsApi.getAllFlat(), [])

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const mapped = (Array.isArray(data) ? data : [])
			.map((e, i) => {
				const name = pick(e, 'name') || "Noma'lum"
				return {
					id: e.id ?? `editor-${i}`,
					name,
					role: pick(e, 'direction'),
					exp: e.experience ? `${e.experience}+ yil tajriba` : '',
					photo:
						mediaUrl(e.image) ||
						`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1F2533&color=fff&size=400&bold=true`,
				}
			})
			.filter(item => item.name && item.name !== "Noma'lum")

		return mapped.length > 0 ? mapped : presets
	}, [data, lang, presets])

	return { items, loading, error, retry, isFallback: items === presets }
}

export default useArticleEditors
