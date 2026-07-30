import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '@/components/shared/Seo'
import PagBtn from '@/components/ElektronJurnal/PagBtn'
import { postgraduate } from '@/data/postgraduate'

const COLS = [
	'№',
	'F.I.SH.',
	'Ixtisosligi (shifr va nomi)',
	'Dissertatsiya mavzusi',
	'Ilmiy rahbar / ilmiy maslahatchi',
	'Bosqich',
]

const PAGE_SIZE = 6

/** Barcha bo'lim/guruhlardagi qatorlarni bitta ro'yxatga yig'adi. */
const flatten = sections => {
	const out = []
	sections.forEach(s =>
		s.groups.forEach(g =>
			g.rows.forEach(r => out.push({ ...r, stage: s.stage, type: g.type })),
		),
	)
	return out
}

/** Ko'rsatiladigan sahifa raqamlari: 1 2 3 … 16 ko'rinishida. */
const getPages = (page, total) => {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
	if (page <= 5) return [1, 2, 3, 4, 5, '...', total]
	if (page >= total - 4)
		return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
	return [1, '...', page - 1, page, page + 1, '...', total]
}

const StageTag = ({ stage, type }) => (
	<span className='pg-stage'>
		<span className='pg-stage__kurs'>{stage}</span>
		<span className='pg-stage__type'>{type}</span>
	</span>
)

const Page = () => {
	const { t } = useTranslation()
	const { institute, sections } = postgraduate

	const rows = useMemo(() => flatten(sections), [sections])
	const total = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
	const [page, setPage] = useState(1)
	const current = Math.min(page, total)
	const pageRows = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

	return (
		<div style={{ paddingTop: '59px' }}>
			<section>
				<Seo title='Oliy ta’lim' />

				<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
					<span className='pg-badge'>{t('menu.science.title')}</span>
				</div>

				<h1 className='gradient-heading' style={{ marginBottom: '24px' }}>
					Oliy ta’lim
				</h1>

				<div className='pg-institute'>
					{institute.map(line => (
						<p key={line}>{line}</p>
					))}
					<p className='pg-institute__sub'>
						Tayanch doktorantlar va doktorantlar (DSc) to‘g‘risida ma’lumot
					</p>
				</div>

				{/* Desktop — jadval */}
				<div className='pg-table-wrap'>
					<table className='pg-table'>
						<thead>
							<tr>
								{COLS.map(c => (
									<th key={c}>{c}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{pageRows.map(r => (
								<tr key={`${r.stage}-${r.type}-${r.no}`}>
									<td className='pg-td-no'>{r.no}</td>
									<td className='pg-td-name'>{r.name}</td>
									<td className='pg-td-spec'>{r.spec}</td>
									<td className='pg-td-topic'>{r.topic}</td>
									<td className='pg-td-advisor'>{r.advisor}</td>
									<td>
										<StageTag stage={r.stage} type={r.type} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Mobil — kartochkalar */}
				<div className='pg-cards'>
					{pageRows.map(r => (
						<div key={`${r.stage}-${r.type}-${r.no}`} className='pg-card'>
							<div className='pg-card__head'>
								<span className='pg-card__no'>{r.no}</span>
								<span className='pg-card__name'>{r.name}</span>
							</div>
							<dl className='pg-card__body'>
								<div>
									<dt>Ixtisosligi</dt>
									<dd>{r.spec}</dd>
								</div>
								<div>
									<dt>Dissertatsiya mavzusi</dt>
									<dd>{r.topic}</dd>
								</div>
								<div>
									<dt>Ilmiy rahbar / maslahatchi</dt>
									<dd>{r.advisor}</dd>
								</div>
								<div>
									<dt>Bosqich</dt>
									<dd>
										<StageTag stage={r.stage} type={r.type} />
									</dd>
								</div>
							</dl>
						</div>
					))}
				</div>

				{/* Pagination */}
				{total > 1 && (
					<div className='pg-pagination'>
						<PagBtn nav onClick={() => setPage(p => Math.max(1, p - 1))}>
							‹
						</PagBtn>
						{getPages(current, total).map((p, i) =>
							p === '...' ? (
								<span key={`d${i}`} className='pg-pagination__dots'>
									…
								</span>
							) : (
								<PagBtn key={p} active={p === current} onClick={() => setPage(p)}>
									{p}
								</PagBtn>
							),
						)}
						<PagBtn nav onClick={() => setPage(p => Math.min(total, p + 1))}>
							›
						</PagBtn>
					</div>
				)}
			</section>
		</div>
	)
}

export default Page
