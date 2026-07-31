import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteFaqsApi } from '@/api/siteContent.api'
import { faqData } from '@/data/faq.data'
import { toFaq } from '@/utils/siteContent'
import { useDataText } from './useDataText'
import { useSiteList } from './useSiteList'

/**
 * FAQ ro'yxati — /api/site-faqs/items/all/ (public, token talab qilmaydi).
 *
 * Endpoint BARCHA sahifalarning FAQ'ini bitta massivda qaytaradi va har bir
 * element `module` maydoni bilan belgilanadi. Backendda hozir mavjud modullar:
 *   education | library | articles | micro_data
 * `vacancies` hali yo'q — u qo'shilgach avtomatik ko'rinadi.
 *
 * So'rov useSiteList keshi orqali bir marta yuboriladi, sahifadagi bir necha
 * FAQ bo'limi ham shu keshdan foydalanadi.
 *
 * Modul bo'yicha filtrlagandan keyin ro'yxat bo'sh qolsa (backend hali
 * to'ldirmagan yoki so'rov xato bergan) — src/data/faq.data.js dagi statik
 * ma'lumot ko'rsatiladi, ya'ni bo'lim hech qachon bo'sh chiqmaydi.
 *
 * @param {string} [module] - faqat shu modulga tegishli FAQ'lar. Berilmasa — barchasi.
 * @returns {{ items: Array<{id, question, answer}>, loading, error, retry, isFallback }}
 */
export const useFaqs = module => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const dt = useDataText('faq')
	const { items: all, loading, error, retry } = useSiteList('site-faqs', siteFaqsApi, toFaq)

	// Statik fallback i18n orqali tarjima qilinadi (dt), API matni esa
	// allaqachon joriy tilda keladi — natijada ikkalasi bir xil shaklda.
	const fallback = useMemo(
		() => faqData.map(item => ({ id: item.id, question: dt(item, 'question'), answer: dt(item, 'answer') })),
		// `dt` har renderda yangi funksiya — deps'ga qo'shilsa memo hech qachon
		// ishlamaydi. Til o'zgarganda qayta hisoblash yetarli.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[lang],
	)

	const items = useMemo(() => {
		const filtered = (module ? all.filter(item => item.module === module) : all).filter(item => item.question)
		return filtered.length > 0 ? filtered : fallback
	}, [all, module, fallback])

	return { items, loading, error, retry, isFallback: items === fallback }
}

export default useFaqs
