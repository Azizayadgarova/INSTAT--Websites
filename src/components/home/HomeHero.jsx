import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useSectionText from '@/hooks/useSectionText'
import { useSectionStats } from '@/hooks/useSectionStats'
import { openCabinet } from '@/utils/cabinet'
import { parseStatValue } from '@/utils/siteContent'
import UzMap from './UzMap'
import { useCountUp, usePrefersReducedMotion } from './hooks'

// Raqam (value) va izoh (label) backend'ning `main` modulidan keladi; javob bo'lmasa shu qiymatlar qoladi.
const STATS_FALLBACK = t => [
	{ key: 'main_users_number', value: '10 000+', label: t('home.k1') },
	{ key: 'main_partners_number', value: '50+', label: t('home.k2') },
	{ key: 'main_experts_number', value: '100+', label: t('home.k3') },
	{ key: 'main_activity_number', value: '5+', label: t('home.k4') },
]

const fmt = new Intl.NumberFormat('ru-RU')

const Kpi = ({ number, suffix, label, run, rm }) => {
	const v = useCountUp(number, run, rm)
	return (
		<div>
			<b>{number == null ? suffix : `${fmt.format(v)}${suffix}`}</b>
			<span>{label}</span>
		</div>
	)
}

const DIRS = [
	{ to: '/platform/onlayn-talim', key: 'd1' },
	{ to: '/platform/mikro-malumotlar', key: 'd2' },
	{ to: '/platform/raqamli-kutubxona', key: 'd3' },
	{ to: '/platform/elektron-jurnal', key: 'd4' },
]

export default function HomeHero({ ready }) {
	const { t } = useTranslation()
	const rm = usePrefersReducedMotion()
	const st = useSectionText('main')
	const stats = useSectionStats('main', STATS_FALLBACK(t)).map(s => ({ ...s, ...parseStatValue(s.value) }))

	return (
		<section id='hero'>
			<div className='grid-bg' aria-hidden='true' />
			<div className='h-in'>
				<div className='h-txt'>
					<span className='pill rv'>
						<i />
						<span>{t('home.eyebrow')}</span>
					</span>
					<h1 className='rv' style={{ '--d': '.08s' }}>
						<span>{st('main_title1', t('home.h1a'))}</span>
						<span className='c'>{st('main_title2', t('home.h1b'))}</span>
					</h1>
					<p className='rv' style={{ '--d': '.16s' }}>
						{st('main_description1', t('home.sub'))}
					</p>
					<div className='cta rv' style={{ '--d': '.24s' }}>
						<button className='btn btn-p' type='button' onClick={openCabinet}>
							<span>{t('home.cta1')}</span>
							<span aria-hidden='true'>→</span>
						</button>
						<Link className='btn btn-g' to='/about/umumiy-malumot'>
							{t('home.cta2')}
						</Link>
					</div>
					<div className='dirs rv' style={{ '--d': '.32s' }}>
						{DIRS.map(({ to, key }, i) => (
							<Link key={key} to={to}>
								<span>0{i + 1}</span>
								<b style={{ fontWeight: 500 }}>{t(`home.${key}`)}</b>
								<i>→</i>
							</Link>
						))}
					</div>
				</div>

				<div className='panel rv' style={{ '--d': '.2s' }}>
					<svg className='gb-s' aria-hidden='true'>
						<rect x='.75' y='.75' width='calc(100% - 1.5px)' height='calc(100% - 1.5px)' rx='28' pathLength='100' />
					</svg>
					<div className='p-head'>
						<span>
							<b>{t('home.uz')}</b> · <span>{t('home.regions')}</span>
						</span>
						<span className='live'>
							<i />
							<span>{t('home.live')}</span>
						</span>
					</div>
					<UzMap />
					<div className='p-kpi'>
						{stats.slice(0, 4).map(s => (
							<Kpi key={s.key} number={s.number} suffix={s.suffix} label={s.label} run={ready} rm={rm} />
						))}
					</div>
				</div>
			</div>
			<div className='cue' aria-hidden='true'>
				<span>{t('home.scroll')}</span>
				<i />
			</div>
		</section>
	)
}
