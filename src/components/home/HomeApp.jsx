import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useInView, usePrefersReducedMotion } from './hooks'

import appBack from '@/assets/home/app-back.webp'
import appFront from '@/assets/home/app-front.webp'

const FEATURE_ICONS = [
	<svg key='v' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><rect x='3' y='4' width='18' height='13' rx='2' /><path d='m10 8.5 4 2.5-4 2.5z' fill='currentColor' /></svg>,
	<svg key='s' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><path d='M4 20V10M10 20V4M16 20v-7M22 20H2' /></svg>,
	<svg key='n' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><path d='M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0' /></svg>,
]

const NOTE_STYLE = [
	['▶', 'rgba(0,230,252,.15)', '#00E6FC'],
	['✓', 'rgba(74,222,128,.15)', '#4ade80'],
	['★', 'rgba(105,170,251,.18)', '#69AAFB'],
]

// Bildirishnomalar: [id, ko'rinish chegarasi, joylashuv]
const NOTE_POS = [
	[0.45, { left: '-12%', top: '4%' }],
	[0.6, { right: '-2%', top: '48%' }],
	[0.75, { left: '-6%', bottom: '8%' }],
]

/** Mobil ilova bloki: ikkita telefon scroll bilan "ochiladi". */
export default function HomeApp() {
	const { t } = useTranslation()
	const rm = usePrefersReducedMotion()
	const [secRef, inView] = useInView({ threshold: 0.1 })
	const frontRef = useRef(null)
	const backRef = useRef(null)
	const noteRefs = useRef([])

	const [l1, l2 = ''] = t('home.ap_t').split('|')
	const features = t('home.ap_f', { returnObjects: true })
	const notes = t('home.ap_n', { returnObjects: true })

	useEffect(() => {
		const sec = secRef.current
		if (!sec) return
		const s = { visible: false, k: 0 }

		const update = snap => {
			const r = sec.getBoundingClientRect()
			const H = window.innerHeight
			const raw = rm ? 1 : Math.min(1, Math.max(0, (H - r.top) / (H * 0.9)))
			s.k = snap ? raw : s.k + (raw - s.k) * 0.1
			const k = s.k
			const mob = window.innerWidth < 560
			const sp = mob ? 80 : 170
			frontRef.current.style.transform = `translate(-50%,-50%) translate3d(${(-sp * 0.35 * k + 40 * (1 - k)).toFixed(1)}px,${(60 * (1 - k)).toFixed(1)}px,0) rotateY(${(-14 * k).toFixed(2)}deg) rotateZ(${(-4 * k).toFixed(2)}deg)`
			backRef.current.style.transform = `translate(-50%,-50%) translate3d(${(sp * 0.75 * k).toFixed(1)}px,${(-30 * k + 80 * (1 - k)).toFixed(1)}px,-120px) rotateY(${(18 * k).toFixed(2)}deg) rotateZ(${(8 * k).toFixed(2)}deg)`
			backRef.current.style.opacity = Math.min(1, k * 1.4).toFixed(3)
			noteRefs.current.forEach((el, i) => el?.classList.toggle('on', k > NOTE_POS[i][0]))
		}

		update(true)
		const io = new IntersectionObserver(([e]) => (s.visible = e.isIntersecting), { threshold: 0.1 })
		io.observe(sec)
		let raf
		const loop = () => {
			if (s.visible) update(false)
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)
		return () => {
			cancelAnimationFrame(raf)
			io.disconnect()
		}
	}, [rm, secRef])

	return (
		<section id='app' aria-labelledby='apTitle' ref={secRef} className={inView ? 'in' : ''}>
			<div className='ap-box'>
				<div className='ap-tx'>
					<span className='lab'>{t('home.ap_lab')}</span>
					<h2 id='apTitle'>
						{l1} <span>{l2}</span>
					</h2>
					<p>{t('home.ap_sub')}</p>
					<ul className='ap-f'>
						{(Array.isArray(features) ? features : []).map((f, i) => (
							<li key={f}>
								<i>{FEATURE_ICONS[i]}</i>
								{f}
							</li>
						))}
					</ul>
					<div className='ap-st'>
						<a href='#app' onClick={e => e.preventDefault()}>
							<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7'><rect x='6' y='2.5' width='12' height='19' rx='3' /><path d='M10.5 18.5h3' /></svg>
							<span>
								<small>{t('home.ap_get')}</small>
								<b>App Store</b>
							</span>
						</a>
						<a href='#app' onClick={e => e.preventDefault()}>
							<svg viewBox='0 0 24 24' fill='currentColor'><path d='M5 3.6v16.8a.8.8 0 0 0 1.2.7l14.4-8.4a.8.8 0 0 0 0-1.4L6.2 2.9A.8.8 0 0 0 5 3.6Z' /></svg>
							<span>
								<small>{t('home.ap_get2')}</small>
								<b>Google Play</b>
							</span>
						</a>
					</div>
				</div>
				<div className='ap-vis' id='apVis' aria-hidden='true'>
					<div className='ap-ph back' ref={backRef}>
						<div className='ap-scr'>
							<img className='ap-shot' src={appBack} alt='' />
						</div>
					</div>
					<div className='ap-ph front' ref={frontRef}>
						<div className='ap-scr'>
							<img className='ap-shot' src={appFront} alt='' />
							<div className='isl' />
						</div>
					</div>
					{NOTE_POS.map(([, pos], i) => (
						<div key={i} className='ap-nt' ref={el => (noteRefs.current[i] = el)} style={pos}>
							<i style={{ background: NOTE_STYLE[i][1], color: NOTE_STYLE[i][2] }}>{NOTE_STYLE[i][0]}</i>
							<div>
								<b>{notes?.[i]?.[0]}</b>
								<span>{notes?.[i]?.[1]}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
