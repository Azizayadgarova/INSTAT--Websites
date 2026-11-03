import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Block from '@/components/home/Block'
import { COOP, COOP_COUNTRIES, FLAGS } from '@/data/cooperation.data'

/** Tashkilot nomidan bosh harflar ("Ural federal universiteti" -> "UF") */
const initials = t =>
	t
		.replace(/[«“"(—]/g, '')
		.split(/\s+/)
		.filter(w => /^[A-ZА-ЯЁ]/.test(w))
		.slice(0, 2)
		.map(w => w[0])
		.join('') || t[0]

// Bayroq SVG'lari statik data fayldan (ishonchli manba)
const Flag = ({ code }) => <span className='flg' dangerouslySetInnerHTML={{ __html: FLAGS[code] }} />

/**
 * "Xalqaro hamkorlik": hamkorlik yo'nalishlari sxemasi, statistika, bayroqlar va davlatlar bo'yicha
 * tashkilotlar (MDH / xorijiy filtri bilan). Prototip: INSTAT/page.html (`p32`). Statik — @/data/cooperation.data.
 */
export default function Cooperation() {
	const { i18n } = useTranslation()
	const c = COOP[i18n.resolvedLanguage] ?? COOP.uz
	const [filter, setFilter] = useState('-1')

	const orgs = c.C.reduce((a, x) => a + x[1].length, 0)
	const cis = COOP_COUNTRIES.filter(x => x[1]).length

	return (
		<>
			<Block n='01' title={c.s[0]}>
				<div className='ic-dir'>
					<div className='ic-root'>
						<div>
							<b>{c.rt[0]}</b>
							<span>{c.rt[1]}</span>
						</div>
					</div>
					<span className='ic-ln' />
					<div className='ic-br'>
						{c.B.map(b => (
							<div className='ic-b' key={b[1]}>
								<small>{b[0]}</small>
								<h3>{b[1]}</h3>
								<div className='ch'>
									{b[2].map(x => (
										<span key={x}>{x}</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='ic-st'>
					<div>
						<b>{c.C.length}</b>
						<small>{c.st[0][0]}</small>
					</div>
					<div>
						<b>{orgs}</b>
						<small>{c.st[1][0]}</small>
					</div>
					<div>
						<b>{cis}</b>
						<small>{c.st[2][0]}</small>
					</div>
				</div>
				<div className='ic-fl'>
					{COOP_COUNTRIES.map(k => (
						<Flag key={k[0]} code={k[0]} />
					))}
				</div>
			</Block>

			<Block n='02' title={c.s[1]}>
				<div className='pd-seg' style={{ marginBottom: 18, width: 'fit-content' }}>
					{[
						['-1', c.all],
						['1', c.g[1]],
						['0', c.g[0]],
					].map(([v, label]) => (
						<button type='button' key={v} className={filter === v ? 'on' : ''} onClick={() => setFilter(v)}>
							{label}
						</button>
					))}
				</div>
				<div className='ic-cs'>
					{c.C.map((x, i) => (
						<article className={`ic-c${filter !== '-1' && String(COOP_COUNTRIES[i][1]) !== filter ? ' dim' : ''}`} key={x[0]}>
							<div className='ic-ch'>
								<Flag code={COOP_COUNTRIES[i][0]} />
								<div>
									<h3>{x[0]}</h3>
									<small>{c.g[COOP_COUNTRIES[i][1]]}</small>
								</div>
								<em>{`${x[1].length} ${c.pt}`}</em>
							</div>
							<div className='ic-pl'>
								{x[1].map(p => (
									<div className='ic-p' key={p}>
										<i>{initials(p)}</i>
										{p}
									</div>
								))}
							</div>
						</article>
					))}
				</div>
			</Block>
		</>
	)
}
