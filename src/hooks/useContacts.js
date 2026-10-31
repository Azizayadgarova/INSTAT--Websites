import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { contacts as fallback } from '@/config/contacts'
import { pickLang } from '@/utils/siteContent'
import { useSiteData } from './useSiteData'

/** Kontaktlar (module="all") + fallback. */
export const useContacts = () => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: kv, loading } = useSiteData(d => d.byModuleKey.all ?? {})

	return useMemo(() => {
		if (!kv || Object.keys(kv).length === 0) return { ...fallback, loading }
		const val = key => pickLang(kv[key], lang)
		const phone = (val('phone').split(/[\r\n]/)[0] || '').trim() || fallback.phone
		const email = val('email') || fallback.email
		const addr = val('address').replace(/[\r\n]+/g, ' ').trim()
		const fax = (val('fax').split(/[\r\n]/)[0] || '').trim() || fallback.fax
		const transport = val('transport').replace(/[\r\n]+/g, ' ').trim() || fallback.transport
		// Ijtimoiy tarmoq: API'da qiymat bo'lmasa bo'sh qator (o'rinbosar havola qo'yilmaydi) —
		// bo'sh tarmoq @/hooks/useSocialLinks da ro'yxatdan tushib qoladi
		const link = key => val(key).trim()
		return {
			loading, phone, phoneHref: `tel:${phone.replace(/[^\d+]/g, '')}`,
			email, emailHref: `mailto:${email}`,
			fax, faxHref: fax ? `tel:${fax.replace(/[^\d+]/g, '')}` : '',
			transport,
			address: { line1: addr || fallback.address.line1, line2: '', full: addr || fallback.address.full },
			social: {
				telegram: link('telegram'),
				facebook: link('facebook'),
				instagram: link('instagram'),
				twitter: link('twitter'),
				youtube: link('youtube'),
				linkedin: link('linkedin'),
			},
		}
	}, [kv, lang, loading])
}
export default useContacts
