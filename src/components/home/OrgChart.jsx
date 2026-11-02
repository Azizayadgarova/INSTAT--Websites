import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ORG_COLORS, ORG_STAFF, ORG_STRUCTURE } from '@/data/orgStructure.data'
import Block from './Block'

const UserIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2'>
		<circle cx='12' cy='8' r='4' />
		<path d='M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6' />
	</svg>
)

/**
 * Institut tashkiliy tuzilmasi (prototip: INSTAT/page.html): asosiy ko'rsatkichlar, yo'nalishlar
 * bo'yicha filtrlanadigan diagramma va izohlar. Ma'lumot — @/data/orgStructure.data.
 *
 * `data-no-toc`: bu sahifada yon mundarija chiqmaydi (diagramma keng joy talab qiladi).
 */
export default function OrgChart() {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const c = ORG_STRUCTURE[lang] ?? ORG_STRUCTURE.uz

	const [filter, setFilter] = useState(-1)
	const [hover, setHover] = useState(-1)

	const isDim = i => (filter >= 0 ? filter !== i : hover >= 0 && hover !== i)
	let delay = 0

	return (
		<div data-no-toc style={{ display: 'grid', gap: 72 }}>
			<Block n='01' title={c.s[0]}>
				<div className='og-top'>
					<div className='og-doc'>
						<span className='ic'>№63</span>
						<div>
							<small>{c.doc[0]}</small>
							<p>{c.doc[1]}</p>
						</div>
					</div>
					<div className='og-num'>
						{c.n.map(n => (
							<div key={n[1]}>
								<b>{n[0]}</b>
								<small>{n[1]}</small>
							</div>
						))}
					</div>
				</div>
			</Block>

			<Block n='02' title={c.s[1]}>
				<div className='og-f'>
					<button type='button' className={filter < 0 ? 'on' : ''} style={{ '--c': 'var(--cyan)' }} onClick={() => setFilter(-1)}>
						{c.all}
					</button>
					{c.H.map((h, i) => (
						<button key={h[2]} type='button' className={filter === i ? 'on' : ''} style={{ '--c': ORG_COLORS[i] }} onClick={() => setFilter(i)}>
							<i />
							{h[2]}
						</button>
					))}
				</div>
				<div className='og' style={{ '--c1': ORG_COLORS[0], '--c2': ORG_COLORS[1], '--c3': ORG_COLORS[2], '--c4': ORG_COLORS[3] }}>
					<div className='og-root'>
						<div className='og-dir'>
							<small>01</small>
							{c.dir}
						</div>
						<span className='og-link' />
						<div className='og-ken'>{c.ken}</div>
					</div>
					<div className='og-stem' />
					<div className='og-bus'>
						<i />
					</div>
					<div className='og-cols'>
						{c.H.map((h, i) => (
							<div
								key={h[2]}
								className={`og-col${isDim(i) ? ' dim' : ''}`}
								style={{ '--c': ORG_COLORS[i] }}
								onPointerEnter={() => setHover(i)}
								onPointerLeave={() => setHover(-1)}
							>
								<div className='og-h'>
									<small>{h[0]}</small>
									<b>{h[1]}</b>
								</div>
								<div className='og-list'>
									{c.U[i].map((u, k) => {
										const v = ORG_STAFF[i][k]
										const star = v === '*' || v === '**'
										return (
											<div key={u} className={`og-u${star ? ' x' : ''}${v === 'y' ? ' sub' : ''}`} style={{ '--d': delay++ }}>
												<span>{u}</span>
												{typeof v === 'number' && (
													<span className='s'>
														<UserIcon />
														{v}
													</span>
												)}
												{star && <span className='fl'>{v} {v === '*' ? c.f1 : c.f2}</span>}
											</div>
										)
									})}
								</div>
							</div>
						))}
					</div>
				</div>
			</Block>

			<Block n='03' title={c.s[2]}>
				<div className='og-note'>
					{c.N.map(t => (
						<p key={t}>{t}</p>
					))}
					<span className='fn'>
						<b>*</b> — {c.F[0]}
					</span>
					<span className='fn'>
						<b>**</b> — {c.F[1]}
					</span>
				</div>
			</Block>
		</div>
	)
}
