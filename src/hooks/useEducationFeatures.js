import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteEducationFeaturesApi } from '@/api/siteContent.api'
import { mediaUrl } from '@/utils/siteContent'
import { useApiResource } from './useApiResource'

/**
 * "Zamonaviy ta'lim" bo'limidagi kartalarni backenddan yuklaydi
 * (/api/site-education-features/items/all/).
 *
 * Backend `title_(uz|ru|en)`, `description_(uz|ru|en)`, `image`, `order`
 * qaytaradi — joriy tilga mos maydon tanlanadi, bo'sh bo'lsa uz -> ru -> en.
 * `order` bo'yicha saralanadi.
 *
 * Animatsiya parametrlari (startX/startY/exitX, plainText, stayOnExit)
 * backendda YO'Q — ular `presets` massividan indeks bo'yicha olinadi
 * (chaqiruvchi tomon uzatadi). Shu bilan API faqat matn/rasmni boshqaradi,
 * kartaning kirib-chiqish animatsiyasi esa oldingidek qoladi.
 *
 * API bo'sh massiv qaytarsa yoki xato bersa — `presets` (statik kartalar)
 * ko'rsatiladi (bo'lim hech qachon bo'sh qolmaydi).
 *
 * @param {Array} presets - statik kartalar (fallback + animatsiya manbai)
 */
export const useEducationFeatures = (presets = []) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => siteEducationFeaturesApi.getAllFlat(), [])

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const mapped = (Array.isArray(data) ? data : [])
			.slice()
			.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
			.map((item, i) => {
				const preset = presets[i] ?? presets[presets.length - 1] ?? {}
				return {
					...preset,
					id: item.id ?? `edu-feature-${i}`,
					title: pick(item, 'title'),
					// site-education-features kartalar plainText — highlight matnga qo'shilgan
					highlight: '',
					description: pick(item, 'description'),
					img: mediaUrl(item.image) || preset.img,
				}
			})
			.filter(card => card.title || card.description)

		return mapped.length > 0 ? mapped : presets
	}, [data, lang, presets])

	return { items, loading, error, retry, isFallback: items === presets }
}

export default useEducationFeatures
