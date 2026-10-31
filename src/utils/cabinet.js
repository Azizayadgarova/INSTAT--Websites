import i18n from '@/i18n'
import { API_CABINET_URL } from '@/config/api'

/**
 * Shaxsiy kabinet (my.instat.uz) manzili — saytda tanlangan til `?lang=` orqali
 * uzatiladi, shunda kirish sahifasi ham shu tilda ochiladi (kabinet tomonida
 * parametr qo'llab-quvvatlanishi kerak).
 */
export const cabinetUrl = (lang = i18n.resolvedLanguage) => {
	try {
		const url = new URL(API_CABINET_URL)
		if (lang) url.searchParams.set('lang', lang)
		return url.toString()
	} catch {
		return API_CABINET_URL
	}
}

export const openCabinet = () => window.open(cabinetUrl(), '_blank')
