import { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useSectionPath from '@/hooks/useSectionPath'
import useSectionText from '@/hooks/useSectionText'
import { usePrefersReducedMotion } from './hooks'

import coursePhoto from '@/assets/home/course-photo.webp'

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const seg = (p, a, b) => clamp((p - a) / (b - a), 0, 1)
const eio = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const eo = t => 1 - Math.pow(1 - t, 3)

/** Sarlavhani ikki qatorga bo'ladi: "A|B" bo'lsa shu bo'yicha, aks holda oxirgi ikki so'z ikkinchi qatorga. */
const splitTitle = text => {
	if (text.includes('|')) return text.split('|')
	const words = text.split(/\s+/)
	return words.length > 3 ? [words.slice(0, -2).join(' '), words.slice(-2).join(' ')] : [text, '']
}

/** Gorizontal banner scroll bilan kichrayib, telefon ichiga "kirib" ketadi. */
export default function HomeCourses() {
	const { t } = useTranslation()
	const rm = usePrefersReducedMotion()
	const st = useSectionText('main')
	const stImg = useSectionPath('main')

	const secRef = useRef(null)
	const stageRef = useRef(null)
	const devRef = useRef(null)
	const screenRef = useRef(null)
	const frameRef = useRef(null)
	const labRef = useRef(null)
	const ctaRef = useRef(null)
	const pRef = useRef(null)
	const topRef = useRef(null)
	const capRef = useRef(null)

	const title = st('main_title4', t('home.c_h'))
	const [line1, line2] = splitTitle(title)
	const desc = st('main_description4', t('home.c_sub'))
	const photo = stImg('main_title4', coursePhoto)

	let wi = 0
	const words = text => text.split(' ').filter(Boolean).map(w => (
		<Fragment key={`${wi}-${w}`}>
			<span className='wd' style={{ '--i': wi++ }}>{w}</span>{' '}
		</Fragment>
	))

	let ci = 0
	const capWords = t('home.c_capT').split(' ').map(w => {
		const hl = w.includes('*')
		const text = w.replaceAll('*', '')
		return (
			<Fragment key={`${ci}-${w}`}>
				<span className='w' style={{ '--i': ci++ }}>{hl ? <em>{text}</em> : text}</span>{' '}
			</Fragment>
		)
	})

	useEffect(() => {
		const sec = secRef.current
		const dev = devRef.current
		const stage = stageRef.current
		if (!sec || !dev || !stage) return
		const state = { cur: 0, inView: false }

		const update = snap => {
			const r = sec.getBoundingClientRect()
			const tot = r.height - window.innerHeight
			const raw = rm || tot <= 0 ? 0 : clamp(-r.top / tot, 0, 1)
			state.cur = snap ? raw : state.cur + (raw - state.cur) * 0.14
			if (Math.abs(raw - state.cur) < 0.0004) state.cur = raw
			const cur = state.cur

			const W = window.innerWidth
			const H = window.innerHeight
			const mob = W < 760
			const dw = dev.offsetWidth
			const dh = mob ? (dw * 163.4) / 78 : (dw * 78) / 163.4
			const IN = mob ? 6 : 11
			const FR = mob ? 34 : 55
			const OFF = mob ? 18 : 34
			stage.style.setProperty('--off', `${OFF}px`)
			const S = Math.max(W / (dw - 2 * IN), (H + 2 * OFF) / (dh - 2 * IN)) * 1.01

			const out = eio(seg(cur, 0.1, 0.6))
			const z = 1 - out // 1 = to'liq banner, 0 = telefon ichida
			dev.style.transform = `scale(${(1 + (S - 1) * z).toFixed(4)})`
			frameRef.current.style.opacity = seg(cur, 0.38, 0.62).toFixed(3)

			const sc = screenRef.current
			sc.style.setProperty('--in', `${IN}px`)
			sc.style.setProperty('--rad', `${(FR * (1 - z)).toFixed(1)}px`)
			sc.style.setProperty('--iz', (1 + 0.08 * out).toFixed(4))
			sc.style.setProperty('--ov', z.toFixed(3))

			// Banner matnlari birinchi bo'lib chiqib ketadi
			const f = seg(cur, 0.04, 0.24)
			labRef.current.style.opacity = (1 - f).toFixed(3)
			labRef.current.style.transform = `translateY(${(-30 * f).toFixed(1)}px)`
			ctaRef.current.style.opacity = (1 - f).toFixed(3)
			ctaRef.current.style.transform = `translateY(${(30 * f).toFixed(1)}px)`
			ctaRef.current.style.pointerEvents = f > 0.5 ? 'none' : 'auto'
			const fp = seg(cur, 0.08, 0.3)
			pRef.current.style.opacity = (0.9 * (1 - fp)).toFixed(3)
			pRef.current.style.transform = `translateY(${(-24 * fp).toFixed(1)}px)`

			stage.style.setProperty('--dh', `${dh}px`)
			const tp = eo(seg(cur, 0.56, 0.72))
			topRef.current.style.opacity = tp.toFixed(3)
			topRef.current.style.transform = `translateY(${(14 * (1 - tp)).toFixed(1)}px)`
			capRef.current.classList.toggle('on', cur > 0.62)
		}

		update(true)
		const io = new IntersectionObserver(
			([e]) => {
				state.inView = e.isIntersecting
				if (e.isIntersecting) sec.classList.add('in')
			},
			{ threshold: 0.05 },
		)
		io.observe(sec)
		const onResize = () => update(true)
		window.addEventListener('resize', onResize)

		let raf
		const loop = () => {
			if (state.inView) update(false)
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)
		return () => {
			cancelAnimationFrame(raf)
			io.disconnect()
			window.removeEventListener('resize', onResize)
		}
	}, [rm])

	const toFeatures = e => {
		e.preventDefault()
		document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<section id='courses' aria-labelledby='phTitle' ref={secRef}>
			<div className='ph-stage' id='phStage' ref={stageRef}>
				<div className='ph-top' id='phTop' ref={topRef} aria-hidden='true'>
					<span>{t('home.c_mob')}</span>
				</div>
				<div className='ph-dev' id='phDev' ref={devRef}>
					<div className='ph-screen' id='phScreen' ref={screenRef}>
						<img src={photo} alt='' decoding='async' />
						<div className='sh' />
						<div className='sh2' />
						<div className='ph-tx'>
							<h2 id='phTitle'>
								{words(line1)}
								{line2 && <span className='sm'>{words(line2)}</span>}
							</h2>
							<p id='phP' ref={pRef}>{desc}</p>
						</div>
					</div>
					<div className='ph-frame' id='phFrame' ref={frameRef} aria-hidden='true' />
				</div>
				<div className='ph-lab' id='phLab' ref={labRef}>
					<span>{t('home.c_label')}</span>
				</div>
				<div className='ph-cta' id='phCta' ref={ctaRef}>
					<Link className='btn btn-p' to='/platform/onlayn-talim'>
						<span>{t('home.c_cta')}</span>
						<span aria-hidden='true'>→</span>
					</Link>
					<a className='btn btn-g' href='#features' onClick={toFeatures}>
						{t('home.c_cta2')}
					</a>
					<span className='scroll' aria-hidden='true'>
						<i />
					</span>
				</div>
				<div className='ph-cap' id='phCap' ref={capRef}>
					<b id='phCapT'>{capWords}</b>
					<span className='s w' style={{ '--i': 8 }}>{t('home.c_cap2')}</span>
				</div>
			</div>
		</section>
	)
}
