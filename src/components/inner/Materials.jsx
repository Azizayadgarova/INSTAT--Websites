import { useTranslation } from 'react-i18next'

import { siteEducationMaterialsApi } from '@/api/siteContent.api'
import Block from '@/components/home/Block'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import { SkeletonText } from '@/components/shared/Skeleton'
import { MATERIALS_TEXT } from '@/data/materialsPage.data'
import { useSiteList } from '@/hooks/useSiteList'
import { toEducationMaterial } from '@/utils/siteContent'
import { IconDownload, MATERIAL_COLORS, MATERIAL_ICONS } from './icons'

/** Backend'dagi fayl maydonlari — prototipdagi 6 ta material tartibida (rang va ikonka shu tartib bo'yicha). */
const FILE_ORDER = [
	'education_plan_file',
	'education_program_file',
	'working_education_plan_file',
	'working_education_program_file',
	'lecture_file',
	'tests_file',
]

/**
 * Kurs nomi: `1. "Statistika ... kursi " (576 soat)` -> sarlavha `«Statistika ... kursi»` va soat (576).
 * Soat bo'lmasa `hours` null — o'ng blok chiqmaydi.
 */
const parseCourse = raw => {
	let title = (raw ?? '').replace(/^\s*\d+\s*[.)]\s*/, '').trim()
	let hours = null
	const m = /\((\d+)\s*[^\d)]*\)\s*$/.exec(title)
	if (m) {
		hours = Number(m[1])
		title = title.slice(0, m.index).trim()
	}
	title = title.replace(/^["“«]\s*(.*?)\s*["”»]$/, '«$1»')
	return { title, hours }
}

/**
 * "O'quv-uslubiy materiallar": har bir kurs kartasida uning materiallari (o'quv reja, dastur, ma'ruzalar,
 * testlar) yuklab olish plitkalari bilan. Prototip: INSTAT/page.html (`p13`). Fayllar backend'dan
 * (site-education-materials), matnlar @/data/materialsPage.data.
 */
export default function Materials() {
	const { t, i18n } = useTranslation()
	const c = MATERIALS_TEXT[i18n.resolvedLanguage] ?? MATERIALS_TEXT.uz
	const { items, loading, error, retry } = useSiteList('site-education-materials', siteEducationMaterialsApi, toEducationMaterial)

	return (
		<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={items.length === 0} skeleton={<SkeletonText lines={5} />}>
			<Block n='01' title={c.s[0]}>
				{items.map((k, i) => {
					const { title, hours } = parseCourse(k.title)
					return (
						<article className='crs' key={k.id}>
							<div className='crs-h'>
								<span className='no'>{String(i + 1).padStart(2, '0')}</span>
								<div>
									<small>{c.c}</small>
									<h3>{title}</h3>
								</div>
								{hours != null && (
									<div className='crs-hr'>
										<b>
											{hours}
											<span>{c.h}</span>
										</b>
										<i />
									</div>
								)}
							</div>
							<div className='mts'>
								{k.files.map((f, j) => {
									const idx = FILE_ORDER.indexOf(f.key) >= 0 ? FILE_ORDER.indexOf(f.key) : j
									return (
										<a className='mt' href={f.url} target='_blank' rel='noopener noreferrer' style={{ '--c': MATERIAL_COLORS[idx % 6] }} key={f.key}>
											<span className='ic'>{MATERIAL_ICONS[idx % 6]}</span>
											<span>
												<b>{t(`eduMaterials.${f.key}`)}</b>
												<small>{`PDF · ${c.fmt}`}</small>
											</span>
											<span className='dl'>
												<IconDownload />
											</span>
										</a>
									)
								})}
							</div>
							<div className='crs-f'>
								<span>{c.n.replace(/^\d+/, String(k.files.length))}</span>
							</div>
						</article>
					)
				})}
			</Block>
		</AsyncBoundary>
	)
}
