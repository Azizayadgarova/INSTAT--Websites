import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { siteVacanciesApi } from '@/api/siteContent.api'
import { JOBS } from '@/data/jobs.data'
import { toVacancy } from '@/utils/siteContent'
import { useDataText } from './useDataText'
import { useSiteList } from './useSiteList'

/**
 * Bo'sh ish o'rinlari — /api/site-vacancies/items/all/ (public).
 *
 * Backend maydonlari kartochka maydonlariga quyidagicha moslanadi:
 *   position     -> title  (lavozim, kartochka sarlavhasi)
 *   direction    -> place  (bo'lim nomi — kartochkada joylashuv qatorida)
 *   requirements -> desc   (talablar)
 *   salary       -> pay    (ish haqi; matn bo'lishi mumkin, masalan
 *                           "Ish haqi shtat jadvali bo'yicha")
 *   shift, extraSalary — hozircha kartochkada ko'rsatilmaydi, lekin
 *                        qaytariladi (kerak bo'lganda ishlatish uchun).
 *
 * `payIsAmount` — `salary` faqat raqam/valyutadan iborat bo'lsa `true`;
 * shundagina kartochkada "/oy" qo'shimchasi ko'rsatiladi (matnli ish haqi
 * bilan "Ish haqi shtat jadvali bo'yicha /oy" degan g'alizlik chiqmaydi).
 *
 * API bo'sh qaytarsa yoki xato bersa — src/data/jobs.data.js statik ro'yxati.
 */
const isAmount = text => /\d/.test(text) && !/[a-zA-ZЀ-ӿ]{4,}/.test(text)

export const useVacancies = () => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const dt = useDataText('jobs')
	const { items: api, loading, error, retry } = useSiteList('site-vacancies', siteVacanciesApi, toVacancy)

	const fallback = useMemo(
		() =>
			JOBS.map(job => ({
				id: job.id,
				title: dt(job, 'title'),
				place: dt(job, 'city'),
				desc: dt(job, 'desc'),
				pay: job.price,
				payIsAmount: true,
				shift: '',
				extraSalary: '',
			})),
		// `dt` har renderda yangi funksiya — til o'zgarganda qayta hisoblanadi.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[lang],
	)

	const items = useMemo(() => {
		const mapped = api
			.map(v => ({
				id: v.id,
				title: v.position,
				place: v.direction,
				desc: v.requirements,
				pay: v.salary,
				payIsAmount: isAmount(v.salary),
				shift: v.shift,
				extraSalary: v.extraSalary,
			}))
			.filter(item => item.title)

		return mapped.length > 0 ? mapped : fallback
	}, [api, fallback])

	return { items, loading, error, retry, isFallback: items === fallback }
}

export default useVacancies
