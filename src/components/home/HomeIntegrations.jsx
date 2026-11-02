import { Fragment, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useInView, usePrefersReducedMotion } from './hooks'

import coreLogo from '@/assets/home/core-logo.png'
import click from '@/assets/home/click.png'
import payme from '@/assets/home/payme.png'
import oneid from '@/assets/home/oneid.png'
import myid from '@/assets/home/myid.png'

// `a` — yoy bo'ylab joylashuv (0..1)
const IG = [
	{ n: 'Click', a: 0.2, img: click },
	{ n: 'Payme', a: 0.4, img: payme },
	{ n: 'OneID', a: 0.6, img: oneid },
	{ n: 'MyID', a: 0.8, img: myid },
]

/** Integratsiyalashgan platformalar: yoy bo'ylab joylashgan tugunlar va markazdan "impuls" yuguradi. */
export default function HomeIntegrations() {
	const { t } = useTranslation()
	const rm = usePrefersReducedMotion()
	const [secRef, inView] = useInView({ threshold: 0.25 })
	const stageRef = useRef(null)
	const arcRef = useRef(null)
	const arc2Ref = useRef(null)
	const linkRefs = useRef([])
	const pulseRefs = useRef([])
	const nodeRefs = useRef([])

	const descr = t('home.ig_d', { returnObjects: true })
	const desc = Array.isArray(descr) ? descr : []
	const [l1, l2 = ''] = t('home.ig_t').split('|')
	let wi = 0

	useEffect(() => {
		const arc = arcRef.current
		if (!arc || typeof arc.getTotalLength !== 'function') return
		const total = arc.getTotalLength()
		const s = { visible: false, rot: 0, rotC: 0, k: 0 }

		const layout = () => {
			IG.forEach((g, j) => {
				const node = nodeRefs.current[j]
				if (!node) return
				const at = Math.min(0.98, Math.max(0.02, g.a + s.rotC))
				const p = arc.getPointAtLength(total * at)
				node.style.left = `${(p.x / 980) * 100}%`
				node.style.top = `${(p.y / 520) * 100}%`
				const d = `M 490 160 Q ${(490 + p.x) / 2} ${Math.max(p.y, 160) + 60} ${p.x} ${p.y}`
				linkRefs.current[j]?.setAttribute('d', d)
				pulseRefs.current[j]?.setAttribute('d', d)
			})
		}
		layout()

		const io = new IntersectionObserver(([e]) => (s.visible = e.isIntersecting), { threshold: 0.25 })
		io.observe(stageRef.current)

		let raf
		const loop = () => {
			if (s.visible && !rm) {
				const r = stageRef.current.getBoundingClientRect()
				s.rot = ((window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight) * 0.06
				s.rotC += (s.rot - s.rotC) * 0.08
				layout()
			}
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)

		const pulse = () => {
			if (!s.visible || rm) return
			const j = s.k++ % IG.length
			const p = pulseRefs.current[j]
			if (!p) return
			const L = p.getTotalLength()
			p.style.transition = 'none'
			p.style.strokeDasharray = `40 ${L}`
			p.style.strokeDashoffset = 40
			p.style.opacity = 1
			requestAnimationFrame(() =>
				requestAnimationFrame(() => {
					p.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.45,0,.3,1),opacity .3s 1s'
					p.style.strokeDashoffset = -L
					p.style.opacity = 0
				}),
			)
			setTimeout(() => {
				const n = nodeRefs.current[j]
				n?.classList.add('hit')
				setTimeout(() => n?.classList.remove('hit'), 700)
			}, 1000)
		}
		const timer = setInterval(pulse, 1400)

		window.addEventListener('resize', layout)
		return () => {
			cancelAnimationFrame(raf)
			clearInterval(timer)
			io.disconnect()
			window.removeEventListener('resize', layout)
		}
	}, [rm])

	// Yoylar chizilib kirishi (bir marta, bo'lim ko'ringanda)
	useEffect(() => {
		if (!inView || rm) return
		;[arcRef.current, arc2Ref.current].forEach((a, k) => {
			if (!a || typeof a.getTotalLength !== 'function') return
			const L = a.getTotalLength()
			a.style.strokeDasharray = L
			a.style.strokeDashoffset = L
			a.style.transition = `stroke-dashoffset 1.6s cubic-bezier(.22,.8,.24,1) ${k * 0.25}s`
			requestAnimationFrame(() => requestAnimationFrame(() => (a.style.strokeDashoffset = 0)))
		})
	}, [inView, rm])

	return (
		<section id='integr' aria-labelledby='igTitle' ref={secRef} className={inView ? 'in' : ''}>
			<div className='ig-h'>
				<h2 id='igTitle'>
					{l1.split(' ').map(w => (
						<Fragment key={w + wi}>
							<span className='w' style={{ '--i': wi++ }}>{w}</span>{' '}
						</Fragment>
					))}
					<span>
						<span className='w' style={{ '--i': wi++ }}>{l2}</span>
					</span>
				</h2>
				<p>{t('home.ig_sub')}</p>
			</div>
			<div className='ig-stage' id='igStage' ref={stageRef}>
				<svg viewBox='0 0 980 520' aria-hidden='true'>
					<defs>
						<linearGradient id='igArcG' x1='0' x2='1'>
							<stop offset='0' stopColor='rgba(159,208,255,.15)' />
							<stop offset='.5' stopColor='rgba(159,208,255,.8)' />
							<stop offset='1' stopColor='rgba(159,208,255,.15)' />
						</linearGradient>
					</defs>
					<path className='ig-arc' ref={arcRef} d='M 120 40 A 370 370 0 0 0 860 40' />
					<path className='ig-arc2' ref={arc2Ref} d='M 340 160 A 150 150 0 0 0 640 160' />
					<g>
						{IG.map((g, j) => (
							<Fragment key={g.n}>
								<path className='ig-link' ref={el => (linkRefs.current[j] = el)} />
								<path className='ig-pulse' ref={el => (pulseRefs.current[j] = el)} />
							</Fragment>
						))}
					</g>
				</svg>
				<div className='ig-core'>
					<img src={coreLogo} alt='INSTAT' style={{ width: '58%' }} />
				</div>
				<div>
					{IG.map((g, j) => (
						<div key={g.n} className='ig-node' style={{ '--i': j }} ref={el => (nodeRefs.current[j] = el)}>
							<div className='ref' />
							<div className='b'>
								<img src={g.img} alt={g.n} />
							</div>
							<div className='tip'>
								<b>{g.n}</b>
								<span>{desc[j]}</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='ig-list'>
				{IG.map((g, j) => (
					<div key={g.n}>
						<b>{g.n}</b>
						<span>{desc[j]}</span>
					</div>
				))}
			</div>
		</section>
	)
}
