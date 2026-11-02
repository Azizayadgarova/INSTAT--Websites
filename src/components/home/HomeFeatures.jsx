import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { siteMainFeaturesApi } from '@/api/siteContent.api'
import { useSiteList } from '@/hooks/useSiteList'
import { toFeature } from '@/utils/siteContent'
import { usePrefersReducedMotion } from './hooks'

import imgCourse from '@/assets/home/platform-course.webp'
import imgLibrary from '@/assets/home/platform-library.webp'
import imgJournal from '@/assets/home/platform-journal.webp'
import imgLab from '@/assets/home/platform-lab.webp'

// Platforma kartochkalari: havola va rasm frontendda, matn (sarlavha/tavsif/rasm) backenddan
// (site-main-features). Backend bo'sh bo'lsa — i18n dagi `home.fz` matnlari.
const PLATFORMS = [
	{ to: '/platform/onlayn-talim', img: imgCourse },
	{ to: '/platform/raqamli-kutubxona', img: imgLibrary },
	{ to: '/platform/elektron-jurnal', img: imgJournal },
	{ to: '/platform/mikro-malumotlar', img: imgLab },
	{ to: '/platform/bosh-ish-orinlari', img: null },
]

// Har bir kartochkaning "kosmik" joylashuvi (x, y — siljish; ry — Y bo'ylab burilish; r — og'ish)
const GEO = [
	{ x: -50, y: 18, ry: 13, r: -2 },
	{ x: 52, y: -8, ry: -14, r: 2.4 },
	{ x: -24, y: -60, ry: 9, r: 1.5 },
	{ x: 30, y: 40, ry: -10, r: -2 },
]

const GAP = 640
const BASE = -230
const EXIT = 560
const pad2 = n => String(n).padStart(2, '0')

export default function HomeFeatures() {
	const { t } = useTranslation()
	const rm = usePrefersReducedMotion()
	const { items: apiItems } = useSiteList('site-main-features', siteMainFeaturesApi, toFeature)

	const fz = t('home.fz', { returnObjects: true })
	const fallback = Array.isArray(fz) ? fz : []
	const cards = apiItems.length
		? apiItems.map((item, i) => {
				const p = PLATFORMS[i % PLATFORMS.length]
				return {
					id: item.id,
					to: p.to,
					title: item.title,
					text: item.description,
					img: item.image || p.img,
					tag: t(`components.modernEducation.card${(i % PLATFORMS.length) + 1}_tags`, ''),
					geo: GEO[i % GEO.length],
				}
			})
		: fallback.map((f, i) => ({ id: i, to: PLATFORMS[i].to, title: f[1], text: f[2], img: PLATFORMS[i].img, tag: f[3], geo: GEO[i % GEO.length] }))

	// Animatsiya sikli har renderda qayta ishga tushmasligi uchun eng so'nggi kartochkalar ref'da turadi
	const cardsRef = useRef(cards)
	useEffect(() => {
		cardsRef.current = cards
	})

	const N = cards.length
	const travel = GAP * (N - 1) + EXIT * 0.9

	const secRef = useRef(null)
	const warpRef = useRef(null)
	const cardRefs = useRef([])
	const progRefs = useRef([])
	const st = useRef({ cam: 0, camT: 0, lastCam: 0, vel: 0, dots: [], W: 0, H: 0, ctx: null, visible: false, best: 0 })
	const [best, setBest] = useState(0)

	useEffect(() => {
		const sec = secRef.current
		const canvas = warpRef.current
		if (!sec || !canvas) return
		const s = st.current

		const initDots = () => {
			const d = Math.min(window.devicePixelRatio || 1, 2)
			s.W = canvas.clientWidth
			s.H = canvas.clientHeight
			canvas.width = s.W * d
			canvas.height = s.H * d
			s.ctx = canvas.getContext('2d')
			s.ctx.setTransform(d, 0, 0, d, 0, 0)
			s.dots = Array.from({ length: window.innerWidth < 760 ? 70 : 140 }, () => ({ a: Math.random() * 6.283, d: Math.random(), s: 0.3 + Math.random() * 0.7 }))
		}

		const progress = () => {
			const r = sec.getBoundingClientRect()
			const tot = r.height - window.innerHeight
			return tot > 0 ? Math.min(1, Math.max(0, -r.top / tot)) : 0
		}

		const drawWarp = () => {
			const { ctx, W, H } = s
			if (!ctx) return
			const v = s.cam - s.lastCam
			s.lastCam = s.cam
			s.vel += (Math.min(40, Math.abs(v)) - s.vel) * 0.12
			ctx.clearRect(0, 0, W, H)
			const cx = W / 2
			const cy = H * 0.54
			const R = Math.hypot(W, H) * 0.6
			for (const p of s.dots) {
				p.d += (0.0016 + s.vel * 0.0009) * p.s
				if (p.d > 1) {
					p.d = 0.04 + Math.random() * 0.1
					p.a = Math.random() * 6.283
				}
				const r1 = R * p.d * p.d
				const len = 10 + s.vel * 5 * p.s + p.d * 40
				const r0 = Math.max(0, r1 - len)
				const co = Math.cos(p.a)
				const si = Math.sin(p.a)
				const al = Math.min(1, p.d * 1.6) * (0.35 + Math.min(0.5, s.vel * 0.03))
				ctx.strokeStyle = `rgba(${p.s > 0.85 ? '0,230,252' : '140,190,245'},${al.toFixed(3)})`
				ctx.lineWidth = 0.6 + p.d * 1.4
				ctx.beginPath()
				ctx.moveTo(cx + co * r0, cy + si * r0)
				ctx.lineTo(cx + co * r1, cy + si * r1)
				ctx.stroke()
			}
		}

		const frame = snap => {
			s.camT = progress() * travel
			s.cam = snap ? s.camT : s.cam + (s.camT - s.cam) * 0.11
			if (Math.abs(s.camT - s.cam) < 0.05) s.cam = s.camT
			const mob = window.innerWidth < 760
			const sc = mob ? 0.7 : 1
			let bestI = 0
			let bd = 1e9
			cardRefs.current.slice(0, N).forEach((el, i) => {
				if (!el) return
				const c = (cardsRef.current[i] ?? cardsRef.current[0]).geo
				let z = BASE - i * GAP + s.cam
				const last = i === N - 1
				if (last && z > BASE) z = BASE + (z - BASE) * 0.15 // oxirgi kartochka oldinda "joylashadi"
				let o = 1
				if (z > -60) o = Math.max(0, 1 - (z + 60) / 340)
				if (z < -GAP * 2.4) o = Math.max(0, 1 - (-z - GAP * 2.4) / GAP)
				const dim = Math.min(0.78, Math.max(0, (-z + BASE) / (GAP * 2.2)))
				el.style.opacity = o.toFixed(3)
				el.style.visibility = o < 0.01 ? 'hidden' : 'visible'
				el.style.setProperty('--dim', dim.toFixed(3))
				const tilt = Math.max(0, Math.min(1, -z / GAP + 0.4))
				el.style.transform = `translate(-50%,-50%) translate3d(${c.x * sc}px,${c.y * sc}px,${z.toFixed(1)}px) rotateY(${(c.ry * tilt).toFixed(2)}deg) rotate(${(c.r * tilt).toFixed(2)}deg)`
				el.style.pointerEvents = z > -GAP * 0.5 && z < 120 ? 'auto' : 'none'
				const d = Math.abs(z - BASE)
				if (d < bd && o > 0.3) {
					bd = d
					bestI = i
				}
			})
			cardRefs.current.slice(0, N).forEach((el, i) => el?.classList.toggle('on', i === bestI))
			if (bestI !== s.best) {
				s.best = bestI
				setBest(bestI)
			}
			progRefs.current.forEach((b, i) => {
				if (!b) return
				const p = Math.min(1, Math.max(0, (s.cam - (i - 1) * GAP) / GAP))
				b.style.transform = `scaleX(${i === 0 ? Math.min(1, s.cam / GAP + 0.25) : p})`
			})
			drawWarp()
		}

		initDots()
		frame(true)
		const io = new IntersectionObserver(([e]) => (s.visible = e.isIntersecting), { rootMargin: '200px' })
		io.observe(sec)
		window.addEventListener('resize', initDots)

		let raf
		const loop = () => {
			if (s.visible && !rm) frame(false)
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)
		return () => {
			cancelAnimationFrame(raf)
			io.disconnect()
			window.removeEventListener('resize', initDots)
		}
	}, [N, travel, rm])

	return (
		<section id='features' aria-labelledby='fzTitle' ref={secRef} style={rm ? undefined : { height: `${Math.max(N, 2) * 100}vh` }}>
			<div className='fz-stage' id='fzStage'>
				<canvas id='fzWarp' ref={warpRef} aria-hidden='true' />
				<div className='fz-head'>
					<div className='l'>
						<span className='lab'>{t('home.f_label')}</span>
						<h2 id='fzTitle'>{t('home.f_title')}</h2>
						<p>{t('home.f_sub')}</p>
					</div>
					<span className='cnt'>
						<b>{pad2(best + 1)}</b> / {pad2(N)}
					</span>
				</div>
				<div className='fz-view'>
					<div className='fz-track' id='fzTrack'>
						{cards.map((c, i) => (
							<article key={c.id} className='fz-card' ref={el => (cardRefs.current[i] = el)} style={{ zIndex: 10 - i }}>
								<div className='in'>
									<div className='art'>
										<span className='no' aria-hidden='true'>
											{pad2(i + 1)}
											{c.tag ? ` · ${c.tag}` : ''}
										</span>
										{c.img && <img src={c.img} alt={c.title} loading='lazy' decoding='async' />}
									</div>
									<div className='tx'>
										<h3>{c.title}</h3>
										<p>{c.text}</p>
										<Link className='btn btn-p' to={c.to} style={{ width: 'fit-content' }}>
											{t('home.f_go')} <span aria-hidden='true'>→</span>
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
				<div className='fz-foot'>
					<div className='fz-prog' id='fzProg'>
						{cards.map((c, i) => (
							<i key={c.id}>
								<b ref={el => (progRefs.current[i] = el)} />
							</i>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
