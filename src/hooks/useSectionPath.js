import { useTranslation } from 'react-i18next'
import { useSiteData } from './useSiteData'
import { pickLang } from '@/utils/siteContent'

/**
 * Sahifa sarlavhalari/tavsiflarini backend'dan oladi (GET /site-data/items/all/).
 *
 * Har bir modul (education, library, article, micro_data, vacancy, main)
 * `<module>_titleN` / `<module>_descriptionN` kalitlariga ega. API javob bermasa
 * yoki qiymat bo'sh bo'lsa — chaqiruvchi bergan fallback (i18n matni) qoladi,
 * shuning uchun sahifa hech qachon bo'sh sarlavha bilan ko'rinmaydi.
 *
 *   const st = useSectionText('education')
 *   <h2>{st('education_title4', t('...'))}</h2>
 */
export const useSectionPath = module => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data } = useSiteData(d => d.byModuleKey[module] ?? {})

	return (key, fallback = '') => {
		const value = data?.[key]?.path
		return value || fallback
	}
}

export default useSectionPath
