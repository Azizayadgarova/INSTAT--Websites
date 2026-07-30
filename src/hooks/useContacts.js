import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { contacts as fallback } from '@/config/contacts'
import { pickLang } from '@/utils/siteContent'
import { useSiteData } from './useSiteData'

/**
 * Telefon raqamini ko'rsatish uchun formatlaydi (bazadagi qiymat o'zgarmaydi).
 * O'zbekiston: 998 + 9 raqam → "+998 90 111 22 33". Boshqa formatlar o'z holicha.
 */
const formatPhone = raw => {
	const digits = String(raw ?? '').replace(/\D/g, '')
	if (digits.startsWith('998') && digits.length === 12) {
		const d = digits.slice(3)
		return `+998 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)}`
	}
	return String(raw ?? '').trim()
}

/** Kontaktlar (module="all") + fallback. */
export const useContacts = () => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: kv, loading } = useSiteData(d => d.byModuleKey.all ?? {})

	return useMemo(() => {
		if (!kv || Object.keys(kv).length === 0) return { ...fallback, loading }
		const val = key => pickLang(kv[key], lang)
		// Backend kaliti "phone_number"; eski "phone" ni ham zaxira sifatida qo'llaymiz.
		const phoneRaw = val('phone_number') || val('phone')
		const phone = formatPhone((phoneRaw.split(/[\r\n]/)[0] || '').trim() || fallback.phone)
		const email = val('email') || fallback.email
		const addr = val('address').replace(/[\r\n]+/g, ' ').trim()
		const fax = (val('fax').split(/[\r\n]/)[0] || '').trim() || fallback.fax
		const transport = val('transport').replace(/[\r\n]+/g, ' ').trim() || fallback.transport
		const link = (key, fb) => {
			const v = val(key)
			return v && v !== 'https://linkedin.com' ? v : fb
		}
		return {
			loading, phone, phoneHref: `tel:${phone.replace(/[^\d+]/g, '')}`,
			email, emailHref: `mailto:${email}`,
			fax, faxHref: fax ? `tel:${fax.replace(/[^\d+]/g, '')}` : '',
			transport,
			address: { line1: addr || fallback.address.line1, line2: '', full: addr || fallback.address.full },
			social: {
				telegram: link('telegram', fallback.social.telegram),
				facebook: link('facebook', fallback.social.facebook),
				instagram: link('instagram', fallback.social.instagram),
				twitter: link('twitter', fallback.social.twitter),
				youtube: link('youtube', fallback.social.youtube),
				linkedin: link('linkedin', fallback.social.linkedin),
			},
		}
	}, [kv, lang, loading])
}
export default useContacts
