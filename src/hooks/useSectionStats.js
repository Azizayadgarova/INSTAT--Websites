import { useTranslation } from 'react-i18next'
import { useSiteData } from './useSiteData'
import { pickLang } from '@/utils/siteContent'

/**
 * Statistika qatorlari (`<module>_*_number` va shunga o'xshash kalitlar):
 * raqam `value`dan, ostidagi izoh esa backend'ning `label` maydonidan keladi.
 *
 * fallback elementlari `{ key, value, label, ... }` shaklida — qolgan maydonlar
 * (description, icon va h.k.) o'zgarishsiz qaytadi. API'da kalit topilmasa yoki
 * qiymat bo'sh bo'lsa statik qiymat qoladi.
 *
 *   const stats = useSectionStats('library', STATS_FALLBACK)
 */
export const useSectionStats = (module, fallback = []) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data } = useSiteData(d => d.byModuleKey[module] ?? {})

	return fallback.map(item => {
		const src = data?.[item.key]
		if (!src) return item
		const value = pickLang(src, lang).replace(/\s+/g, ' ').trim()
		const label = (src[`label_${lang}`] ?? src.label ?? '').toString().trim()
		return { ...item, value: value || item.value, label: label || item.label }
	})
}

export default useSectionStats
