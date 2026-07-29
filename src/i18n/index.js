import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import ru from './ru.json'
import uz from './uz.json'

export const LANGUAGES = [
	{ code: 'uz', label: 'O‘z' },
	{ code: 'ru', label: 'Рус' },
	{ code: 'en', label: 'Eng' },
]

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			uz: { translation: uz },
			ru: { translation: ru },
			en: { translation: en },
		},
		fallbackLng: 'uz',
		supportedLngs: LANGUAGES.map(l => l.code),
		interpolation: { escapeValue: false },
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupLocalStorage: 'instat_lang',
		},
	})

// <html lang="..."> ni til bilan sinxron ushlab turamiz (SEO + skrinriderlar uchun)
const syncHtmlLang = lng => document.documentElement.setAttribute('lang', lng)
syncHtmlLang(i18n.resolvedLanguage ?? 'uz')
i18n.on('languageChanged', syncHtmlLang)

export default i18n
