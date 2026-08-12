import { useTranslation } from 'react-i18next'
import { useSiteData } from './useSiteData'
import { pickLang } from '@/utils/siteContent'

/**
 * "Axborot resurslari" ichki bo'limlari sayt ichidagi sahifa emas, tashqi
 * portallarga (stat.uz, data.egov.uz ...) qaraydi. Havolalar admin panelda
 * `info_resource` modulining kalitlarida turadi: `value` — URL.
 *
 * Kalitlar menuConfig.axborot.paths bilan shu jadval orqali bog'langan (backend
 * kalit nomlari path'lardan farq qiladi, tartibga tayanish esa mo'rt).
 */
const INFO_RESOURCE_KEY_BY_PATH = {
	'axborot-tizimi': 'siat_stat',
	'rivojlanish-maqsadlari': 'rsdg_stat',
	'gender-statistika': 'gender_stat',
	'royhatga-olish': 'aholi_stat',
	'qishloq-xojaligi': 'agro_stat',
	'ochiq-malumotlar': 'data_egov',
	'statistika-agentligi': 'lib_stat',
}

/**
 * Menyu bo'limi + path bo'yicha tashqi havolani qaytaradi. Havola yo'q yoki
 * admin panelda hali to'ldirilmagan bo'lsa — null, ya'ni chaqiruvchi odatdagi
 * ichki route'ga qaytadi.
 *
 *   const externalHref = useExternalMenuLink()
 *   externalHref('axborot', 'axborot-tizimi') // 'https://stat.uz' | null
 */
export const useExternalMenuLink = () => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data } = useSiteData(d => d.byModuleKey.info_resource ?? {})

	return (section, path) => {
		if (section !== 'axborot') return null
		const url = pickLang(data?.[INFO_RESOURCE_KEY_BY_PATH[path]], lang)
		return /^https?:\/\//i.test(url) ? url : null
	}
}

export default useExternalMenuLink
