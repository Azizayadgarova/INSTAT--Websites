import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { mediaUrl } from '@/utils/siteContent'
import { useApiResource } from './useApiResource'

/**
 * "site-*-instructions" endpoint'lari uchun umumiy hook. Barchasi bir xil
 * shaklda: title_(uz|ru|en), description_(uz|ru|en), image, order.
 *
 * Bu komponentlar (bosqichli jarayon / timeline) qat'iy joylashuvda bo'lgani
 * uchun hook DOIMO `presets.length` ta slot qaytaradi — API matni (order
 * bo'yicha) mavjud slotlar ustiga qo'yiladi, ikonalar/geometriya presetdagicha
 * qoladi. Shu bilan backend to'liq to'ldirilmagan bo'lsa ham dizayn buzilmaydi.
 *
 * @param {object} apiClient - createResourceApi natijasi (getAllFlat bilan)
 * @param {Array}  presets   - statik bosqichlar (slotlar + fallback)
 * @param {object} [opts]
 * @param {string} [opts.descKey='desc'] - presetdagi tavsif maydoni nomi
 *   (masalan STEPS `desc`, boshqasi `description` ishlatadi)
 * @param {boolean} [opts.withImage=false] - API rasmini `img` sifatida qo'shish
 */
export const useSiteInstructions = (apiClient, presets = [], opts = {}) => {
	const { descKey = 'desc', withImage = false } = opts
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => apiClient.getAllFlat(), [])

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const sorted = (Array.isArray(data) ? data : []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
		if (sorted.length === 0) return presets

		return presets.map((preset, i) => {
			const item = sorted[i]
			if (!item) return preset
			const next = {
				...preset,
				title: pick(item, 'title') || preset.title,
				[descKey]: pick(item, 'description') || preset[descKey],
			}
			if (withImage && mediaUrl(item.image)) next.img = mediaUrl(item.image)
			return next
		})
	}, [data, lang, presets, descKey, withImage])

	return { items, loading, error, retry, isFallback: items === presets }
}

export default useSiteInstructions
