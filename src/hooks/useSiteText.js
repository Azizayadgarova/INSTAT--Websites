import { useTranslation } from 'react-i18next'

import { pickLang } from '@/utils/siteContent'
import { useSiteData } from './useSiteData'

/**
 * Sahifа boʻlim sarlavha/tavsiflarини site-data'дан oʻqish uchun qulay hook.
 *
 *   const st = useSiteText('library')
 *   <h2>{st('library_title3', 'Statik fallback')}</h2>
 *
 * `st(key, fallback)` — joriy tildagi qiymatni qaytaradi; kalit boʻsh/topilmasa
 * `fallback` (statik matn) qaytadi. Shu bilan hech qачон boʻsh qolmaydi.
 *
 * @param {string} module - site-data moduli (education | library | article | micro_data ...)
 */
export const useSiteText = module => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: kv } = useSiteData(d => d.byModuleKey[module] ?? {})
	return (key, fallback = '') => pickLang(kv?.[key], lang) || fallback
}

export default useSiteText
