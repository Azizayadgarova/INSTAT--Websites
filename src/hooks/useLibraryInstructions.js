import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteLibraryInstructionsApi } from '@/api/siteContent.api'
import { mediaUrl } from '@/utils/siteContent'
import { useApiResource } from './useApiResource'

/**
 * "Oflayn kutubxona" bosqichlarini backenddan yuklaydi (Kutubxona komponenti)
 * — /api/site-library-instructions/items/all/.
 *
 * Backend `title_(uz|ru|en)`, `description_(uz|ru|en)`, `image`, `order`
 * qaytaradi. `order` bo'yicha saralanadi, joriy tilga mos maydon tanlanadi.
 * Raqam (id "01", "02" ...) tartib bo'yicha hosil qilinadi.
 *
 * API bo'sh/xato bo'lsa — `presets` (statik ro'yxat) ko'rsatiladi.
 *
 * @param {Array} presets - statik bosqichlar (fallback + rasm manbai)
 */
export const useLibraryInstructions = (presets = []) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => siteLibraryInstructionsApi.getAllFlat(), [])

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const mapped = (Array.isArray(data) ? data : [])
			.slice()
			.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
			.map((item, i) => {
				const preset = presets[i] ?? presets[presets.length - 1] ?? {}
				return {
					id: String(i + 1).padStart(2, '0'),
					title: pick(item, 'title'),
					desc: pick(item, 'description'),
					img: mediaUrl(item.image) || preset.img,
				}
			})
			.filter(step => step.title)

		return mapped.length > 0 ? mapped : presets
	}, [data, lang, presets])

	return { items, loading, error, retry, isFallback: items === presets }
}

export default useLibraryInstructions
