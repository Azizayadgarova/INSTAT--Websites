import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteVacanciesApi } from '@/api/siteContent.api'
import { JOBS } from '@/data/jobs.data'
import { useApiResource } from './useApiResource'

/**
 * Vakansiyalar ro'yxatini backenddan yuklaydi (/api/site-vacancies/items/all/).
 *
 * `/site-vacancies/` token talab qiladi (401), lekin `items/all` ochiq (getAllFlat).
 * Backend har maydonni uch tilda qaytaradi:
 *   direction_(uz|ru|en)   - Vakansiya yo'nalishi
 *   position_(uz|ru|en)    - Lavozimi
 *   salary_(uz|ru|en)      - Ish haqi
 *   shift_(uz|ru|en)       - Stavka / bandlik
 *   extra_salary_(uz|ru|en)- Qo'shimcha haq
 *   requirements_(uz|ru|en)- Malakaviy talablar
 *
 * Joriy tilga mos maydon tanlanadi, bo'sh bo'lsa uz -> ru -> en tartibida.
 * Javobda `id` yo'q — indeks asosida barqaror kalit yasaladi.
 *
 * API bo'sh massiv qaytarsa yoki xato bersa, src/data/jobs.data.js dagi statik
 * ro'yxat ko'rsatiladi (bo'lim hech qachon bo'sh qolmaydi).
 */
export const useVacancies = () => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => siteVacanciesApi.getAllFlat(), [])

	const fallbackItems = useMemo(
		() =>
			JOBS.map(job => ({
				id: job.id,
				direction: job.city,
				position: job.title,
				salary: job.price,
				shift: '',
				extraSalary: '',
				requirements: job.desc,
			})),
		[]
	)

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const mapped = (data ?? [])
			.map((item, i) => ({
				id: item.id ?? `vacancy-${i}`,
				direction: pick(item, 'direction'),
				position: pick(item, 'position'),
				salary: pick(item, 'salary'),
				shift: pick(item, 'shift'),
				extraSalary: pick(item, 'extra_salary'),
				requirements: pick(item, 'requirements'),
			}))
			.filter(item => item.position || item.direction)

		return mapped.length > 0 ? mapped : fallbackItems
	}, [data, lang, fallbackItems])

	return { items, loading, error, retry, isFallback: items === fallbackItems }
}

export default useVacancies
