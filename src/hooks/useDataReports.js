import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { dataReportsApi } from '@/api/resources.api'
import { pickField } from '@/utils/siteContent'
import { useApiResource } from './useApiResource'

/**
 * "Nufuzli nashrlar" (NufuzliNashrlar) ro'yxatini backenddan yuklaydi —
 * /api/data-reports/. Javob {data, meta} shaklida (createResourceApi.getAll).
 *
 * Backend maydonlari: name(_uz|ru|en), description(_uz|ru|en),
 * category{name(_uz|ru|en)}, type, thumbnail, created_at,
 * options[{date_from, date_to, file_extension, ...}].
 *
 * DataCard kutgan shaklga o'giriladi: { id, title, category, location,
 * years, published }. `location` uchun backendда alohida maydon yo'q —
 * uning o'rniga hisobot turi (type) ishlatiladi; `years` options ichidagi
 * sana oralig'idan, `published` esa created_at yilidan hosil qilinadi.
 *
 * API bo'sh/xato bo'lsa — `presets` (publications.data) ko'rsatiladi.
 *
 * @param {Array} presets - statik ro'yxat (fallback)
 */
const yearOf = v => {
	if (!v) return ''
	const d = new Date(v)
	return Number.isNaN(d.getTime()) ? '' : d.getFullYear()
}

export const useDataReports = (presets = []) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data, loading, error, retry } = useApiResource(() => dataReportsApi.getAll({ per_page: 100 }), [])

	const items = useMemo(() => {
		const mapped = (data?.items ?? [])
			.map((r, i) => {
				const opt = Array.isArray(r.options) ? r.options[0] : null
				const yFrom = opt ? yearOf(opt.date_from) : ''
				const yTo = opt ? yearOf(opt.date_to) : ''
				const years = yFrom && yTo ? `${yFrom} — ${yTo}` : String(yFrom || yTo || '')
				const typeText = typeof r.type === 'string' ? r.type : (r.type?.name || r.type?.name_uz || '')
				const pubYear = yearOf(r.created_at)
				return {
					id: r.id ?? `data-report-${i}`,
					title: pickField(r, 'name', lang),
					category: r.category ? pickField(r.category, 'name', lang) : '',
					location: typeText,
					years,
					published: pubYear ? `${pubYear}` : '',
				}
			})
			.filter(x => x.title)

		return mapped.length > 0 ? mapped : presets
	}, [data, lang, presets])

	return { items, loading, error, retry, isFallback: items === presets }
}

export default useDataReports
