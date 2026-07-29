import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteFaqsApi } from '@/api/siteContent.api'
import { faqData } from '@/data/faq.data'
import { useApiResource } from './useApiResource'
import { useDataText } from './useDataText'

/**
 * FAQ ro'yxatini backenddan yuklaydi (/api/site-faqs/items/all/).
 *
 * Backend `question_uz|ru|en` / `answer_uz|ru|en` maydonlarini qaytaradi —
 * joriy tilga mos maydon tanlanadi, bo'sh bo'lsa uz -> ru -> en tartibida.
 *
 * API bo'sh massiv qaytarsa yoki xato bersa, src/data/faq.data.js dagi
 * statik ma'lumot ko'rsatiladi (bo'lim hech qachon bo'sh qolmaydi).
 *
 * @param {string} [module] - faqat shu modulga tegishli FAQ'lar (backenddagi
 *   `module` maydoni). Berilmasa — barchasi.
 */
export const useFaqs = module => {
	const { i18n } = useTranslation()
	const dt = useDataText('faq')
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => siteFaqsApi.getAllFlat(), [])

	const fallbackItems = useMemo(
		() => faqData.map(item => ({ id: item.id, question: dt(item, 'question'), answer: dt(item, 'answer') })),
		// dt har renderda yangi funksiya — til o'zgarganda qayta hisoblash yetarli
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[lang]
	)

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const mapped = (data ?? [])
			.filter(item => (module ? item.module === module : true))
			.map(item => ({ id: item.id, question: pick(item, 'question'), answer: pick(item, 'answer') }))
			.filter(item => item.question)

		return mapped.length > 0 ? mapped : fallbackItems
	}, [data, lang, module, fallbackItems])

	return { items, loading, error, retry, isFallback: items === fallbackItems }
}

export default useFaqs
