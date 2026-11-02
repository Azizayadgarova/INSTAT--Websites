import { useTranslation } from 'react-i18next'

import { GENERAL_INFO } from '@/data/generalInfo.data'
import instituteImg from '@/assets/home/institute.webp'
import Block from './Block'
import { useCountUp, usePrefersReducedMotion } from './hooks'

const svg = children => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'>
		{children}
	</svg>
)

/** "Asosiy vazifalar" kartalarining ikonkalari (prototip: page.html `TI`). */
const TASK_ICONS = [
	svg(
		<>
			<path d='M3 7l9-4 9 4-9 4-9-4z' />
			<path d='M7 9v5c0 1.7 2.2 3 5 3s5-1.3 5-3V9' />
		</>,
	),
	svg(<path d='M4 20V10M10 20V4M16 20v-7M22 20H2' />),
	svg(
		<>
			<circle cx='11' cy='11' r='6' />
			<path d='m20 20-4.5-4.5' />
		</>,
	),
	svg(
		<>
			<circle cx='12' cy='12' r='9' />
			<path d='M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18' />
		</>,
	),
]

const Fact = ({ to, sign, label, run, reduced }) => {
	const v = useCountUp(Number(to), run, reduced)
	return (
		<div>
			<b>
				<em style={{ fontStyle: 'normal' }}>{v}</em>
				<span>{sign}</span>
			</b>
			<small>{label}</small>
		</div>
	)
}

/**
 * "Umumiy ma'lumotlar" sahifasi (prototip: INSTAT/page.html, p00): institut haqida, raqamlarda,
 * asosiy vazifalar, rivojlanish bosqichlari va rekvizitlar. Matnlar statik — @/data/generalInfo.data.
 */
export default function GeneralInfo() {
	const { i18n } = useTranslation()
	const reduced = usePrefersReducedMotion()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const c = GENERAL_INFO[lang] ?? GENERAL_INFO.uz
	const [about, facts, tasks, steps, req] = c.s

	return (
		<div style={{ display: 'grid', gap: 72 }}>
			<Block n='01' title={about[0]}>
				{about[1].map(p => (
					<p key={p}>{p}</p>
				))}
				{/*<figure className='pg-fig'>*/}
				{/*	<img src={instituteImg} alt={c.fig[0]} loading='lazy' decoding='async' />*/}
				{/*	<i className='cr a' />*/}
				{/*	<i className='cr b' />*/}
				{/*	<figcaption>*/}
				{/*		<b>{c.fig[0]}</b>*/}
				{/*		<span>{c.fig[1]}</span>*/}
				{/*	</figcaption>*/}
				{/*</figure>*/}
				{/*<div className='quote'>{about[2]}</div>*/}
			</Block>

			<Block n='02' title={facts[0]} threshold={0.15}>
				{inView => (
					<div className='facts'>
						{facts[1].map(f => (
							<Fact key={f[2]} to={f[0]} sign={f[1]} label={f[2]} run={inView} reduced={reduced} />
						))}
					</div>
				)}
			</Block>

			<Block n='03' title={tasks[0]}>
				<div className='tasks'>
					{tasks[1].map((t, i) => (
						<div className='task' key={t[0]}>
							<div className='n'>
								{`0${i + 1}`}
								{TASK_ICONS[i]}
							</div>
							<h3>{t[0]}</h3>
							<p>{t[1]}</p>
						</div>
					))}
				</div>
			</Block>

			<Block n='04' title={steps[0]}>
				<div className='tl'>
					<i className='ln' />
					{steps[1].map((t, i) => (
						<div className='tl-i' key={t[0]}>
							<b>{`0${i + 1}`}</b>
							<h3>{t[0]}</h3>
							<p>{t[1]}</p>
						</div>
					))}
				</div>
			</Block>

			<Block n='05' title={req[0]}>
				<dl className='req'>
					{req[1].map(r => (
						<div key={r[0]}>
							<dt>{r[0]}</dt>
							<dd>{r[1]}</dd>
						</div>
					))}
				</dl>
			</Block>
		</div>
	)
}
