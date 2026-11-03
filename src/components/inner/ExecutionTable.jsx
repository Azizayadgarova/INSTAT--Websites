import { useTranslation } from 'react-i18next'

import Block from '@/components/home/Block'
import { COURSE_NAMES, EXECUTION_HOURS, EXECUTION_ROWS, EXECUTION_TEXT } from '@/data/execution.data'

/**
 * "Dasturning bajarilishi": 2026-yil mart–sentabr oylarida malaka oshirgan tinglovchilar jadvali
 * (yillik dastur va haqiqatda). Prototip: INSTAT/page.html (`p14`). Statik — @/data/execution.data.
 */
export default function ExecutionTable() {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage in COURSE_NAMES ? i18n.resolvedLanguage : 'uz'
	const x = EXECUTION_TEXT[lang]
	const names = COURSE_NAMES[lang]
	const hours = EXECUTION_HOURS[lang]
	const plan = EXECUTION_ROWS.reduce((a, r) => a + r[1], 0)
	const actual = EXECUTION_ROWS.reduce((a, r) => a + (r[2] || 0), 0)

	return (
		<Block>
			<p className='xt-cap'>
				{x[0]}
				<b>{x[1]}</b>
			</p>
			<div className='xt-w'>
				<table className='xt'>
					<thead>
						<tr>
							<th rowSpan={2}>{x[2]}</th>
							<th rowSpan={2} className='l'>
								{x[3]}
							</th>
							<th colSpan={2} className='grp'>
								{x[4]}
							</th>
						</tr>
						<tr>
							<th>{x[5]}</th>
							<th>{x[6]}</th>
						</tr>
					</thead>
					<tbody>
						{EXECUTION_ROWS.map((r, i) => (
							<tr key={names[i]}>
								<td className='n'>{i + 1}.</td>
								<td className='c'>
									{names[i]}
									<span>{`(${r[0]} ${hours})`}</span>
								</td>
								<td className='v'>{r[1]}</td>
								<td className={`v a${r[2] == null ? ' e' : ''}`}>{r[2] == null ? '–' : r[2]}</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={2} style={{ textAlign: 'center' }}>
								{x[7]}:
							</td>
							<td className='v'>{plan}</td>
							<td className='v' style={{ color: 'var(--cyan)' }}>
								{actual}
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</Block>
	)
}
