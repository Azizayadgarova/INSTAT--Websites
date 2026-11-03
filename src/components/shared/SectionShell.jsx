import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useOutlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import PageFrame from '@/components/home/PageFrame'
import { usePrefersReducedMotion } from '@/components/home/hooks'
import { PAGE_LEADS } from '@/data/pageLeads.data'
import { useMenu } from '@/hooks/useMenu'
import Seo from './Seo'
import { ShellHeroContext } from './shellHero'

/** Sarlavhaning oxirgi so'zi alohida rangda ("Umumiy <span>ma'lumotlar</span>"). */
const Title = ({ text }) => {
	const words = (text ?? '').split(' ')
	if (words.length < 2) return text
	return (
		<>
			{words.slice(0, -1).join(' ')} <span>{words[words.length - 1]}</span>
		</>
	)
}

/** Hero o'ng tomonidagi yonib turuvchi nuqtalar (canvas). */
function HeroDots() {
	const ref = useRef(null)
	const rm = usePrefersReducedMotion()
	useEffect(() => {
		const cv = ref.current
		const x = cv?.getContext('2d')
		if (!cv || !x) return
		let w
		let h
		let pts = []
		let raf
		const init = () => {
			const d = Math.min(window.devicePixelRatio || 1, 2)
			w = cv.clientWidth
			h = cv.clientHeight
			if (!w) return
			cv.width = w * d
			cv.height = h * d
			x.setTransform(d, 0, 0, d, 0, 0)
			pts = []
			const g = 18
			for (let i = g / 2; i < w; i += g) {
				for (let j = g / 2; j < h; j += g) {
					const dx = (i - w * 0.6) / w
					const dy = (j - h * 0.45) / h
					if (dx * dx * 1.4 + dy * dy * 2 < 0.16) pts.push([i, j, Math.random() * 6.28])
				}
			}
		}
		const draw = t => {
			x.clearRect(0, 0, w, h)
			pts.forEach(p => {
				const a = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t / 900 + p[2]))
				x.fillStyle = `rgba(0,230,252,${a})`
				x.fillRect(p[0] - 1, p[1] - 1, 2, 2)
			})
			if (!rm) raf = requestAnimationFrame(draw)
		}
		init()
		window.addEventListener('resize', init)
		raf = requestAnimationFrame(draw)
		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', init)
		}
	}, [rm])
	return <canvas className='dots' ref={ref} aria-hidden='true' />
}

/**
 * Menyu bo'limlari (Institut haqida, O'quv faoliyati, Ilm-fan, Matbuot, Axborot resurslari)
 * uchun umumiy ichki sahifa qobig'i — prototip: INSTAT/page.html.
 *
 * Hero (yo'l, sarlavha) + chapda bo'lim havolalari + o'rtada kontent (<Outlet />) +
 * o'ngda sahifa ichidagi bo'limlar mundarijasi (kontentdagi <h2> lardan avtomatik) +
 * oldingi/keyingi sahifa havolalari.
 *
 * `sectionKey`: menuConfig kaliti (about | oquvFaoliyati | science | media | axborot).
 * `links`: [{ path, name, href? }] — `href` berilsa qator tashqi saytga yangi oynada ochiladi
 *   (@/hooks/useExternalMenuLink).
 * `showOutlet={false}` — bola marshrut o'rniga `children` ko'rsatiladi (tashqi resursga
 *   yo'naltirilayotgan sahifada kerak bo'ladi).
 */
const SectionShell = ({ sectionKey, title, description, lead, links = [], showOutlet = true, children }) => {
	const outlet = useOutlet()
	const { pathname } = useLocation()
	const { t, i18n } = useTranslation()
	const menu = useMenu()
	const sectionKeys = Object.keys(menu)
	const sectionIdx = Math.max(0, sectionKeys.indexOf(sectionKey))

	const active = links.find(l => !l.href && (pathname === l.path || pathname.startsWith(`${l.path}/`))) ?? null
	const pageTitle = active?.name ?? title

	// Sahifa hero'ni almashtirishi mumkin (yangilik: sana + sarlavha) — useShellHero
	const [hero, setHero] = useState(null)
	const lang = i18n.resolvedLanguage ?? 'uz'
	const pageLead = hero ? undefined : (lead ?? PAGE_LEADS[active?.path.split('/').pop()]?.[lang])

	const internal = links.filter(l => !l.href)
	const at = internal.indexOf(active)
	const prev = at > 0 ? internal[at - 1] : null
	const next = at >= 0 && at < internal.length - 1 ? internal[at + 1] : null

	// Kontentdagi <h2> lardan mundarija (sahifa ichidagi bo'limlar)
	const articleRef = useRef(null)
	const barRef = useRef(null)
	const [toc, setToc] = useState([])
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		const el = articleRef.current
		if (!el) return
		let raf
		const scan = () => {
			const hs = [...el.querySelectorAll('h2')].filter(h => h.textContent.trim() && !h.closest('[data-no-toc]'))
			hs.forEach((h, i) => {
				if (!h.id) h.id = `pg-s${i}`
				h.style.scrollMarginTop = '110px'
			})
			const list = hs.map(h => ({ id: h.id, text: h.textContent.trim() }))
			setToc(prevList => (JSON.stringify(prevList) === JSON.stringify(list) ? prevList : list))
		}
		const schedule = () => {
			cancelAnimationFrame(raf)
			raf = requestAnimationFrame(scan)
		}
		scan()
		const mo = new MutationObserver(schedule)
		mo.observe(el, { childList: true, subtree: true })
		return () => {
			cancelAnimationFrame(raf)
			mo.disconnect()
		}
	}, [pathname])

	useEffect(() => {
		const onScroll = () => {
			const el = articleRef.current
			if (!el) return
			let cur = 0
			toc.forEach((s, i) => {
				const node = document.getElementById(s.id)
				if (node && node.getBoundingClientRect().top < window.innerHeight * 0.35) cur = i
			})
			setCurrent(cur)
			const r = el.getBoundingClientRect()
			const p = Math.min(1, Math.max(0, (window.innerHeight * 0.35 - r.top) / Math.max(1, r.height - window.innerHeight * 0.35)))
			if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [toc])

	// Juda uzun ro'yxat (kartochka sarlavhalari) mundarija bo'lmaydi
	const showToc = toc.length > 1 && toc.length <= 8
	const other = sectionKeys.filter(k => k !== sectionKey && menu[k].links.length)

	return (
		<PageFrame>
			<Seo title={pageTitle} description={description} />
			<main id='hero' className='pg-main'>
				<section className='pg-hero'>
					<div className='grid' aria-hidden='true' />
					<HeroDots />
					<div className='pg-w'>
						<div className='crumb st' style={{ '--i': 0 }}>
							<Link to='/'>{t('home.p_home')}</Link>
							<i>/</i>
							<span>{title}</span>
							{active && (
								<>
									<i>/</i>
									<b>{active.name}</b>
								</>
							)}
						</div>
						<div className='pg-k st' style={{ '--i': 1 }}>
							{hero ? [hero.kicker, title].filter(Boolean).join(' · ') : `0${sectionIdx + 1} · ${title}`}
						</div>
						<h1 className='st' style={hero ? { '--i': 2, fontSize: 'clamp(26px,3.2vw,42px)', maxWidth: '28ch' } : { '--i': 2 }}>
							{hero ? hero.title : <Title text={pageTitle} />}
						</h1>
						{pageLead && (
							<p className='pg-lead st' style={{ '--i': 3 }}>
								{pageLead}
							</p>
						)}
					</div>
				</section>

				<div className={`pg-body${showToc ? '' : ' full'}`}>
					<aside className='side'>
						<h4>{title}</h4>
						<nav aria-label={title}>
							{links.map(link =>
								/* `href` — tashqi portal (admin panelda sozlanadi): o'z sahifasi yo'q, yangi oynada ochiladi */
								link.href ? (
									<a key={link.path} href={link.href} target='_blank' rel='noopener noreferrer'>
										{link.name} ↗
									</a>
								) : (
									<NavLink key={link.path} to={link.path} className={({ isActive }) => (isActive ? 'on' : '')}>
										{link.name}
									</NavLink>
								),
							)}
						</nav>
						{other.length > 0 && (
							<div className='other'>
								<h4>{t('home.p_oth')}</h4>
								{other.map(k => (
									<Link key={k} to={`${menu[k].base}/${menu[k].links[0].path}`}>
										{menu[k].title} →
									</Link>
								))}
							</div>
						)}
					</aside>

					<article className='ct-b' ref={articleRef}>
						<ShellHeroContext.Provider value={setHero}>{(showOutlet ? outlet : null) ?? children}</ShellHeroContext.Provider>
						{(prev || next) && (
							<div className='pg-next'>
								{prev ? (
									<Link to={prev.path}>
										<small>← {t('home.p_prev')}</small>
										<span>{prev.name}</span>
									</Link>
								) : (
									<span />
								)}
								{next && (
									<Link className='r' to={next.path}>
										<small>{t('home.p_next')} →</small>
										<span>{next.name}</span>
									</Link>
								)}
							</div>
						)}
					</article>

					{showToc && (
						<aside className='toc'>
							<h4>{t('home.p_toc')}</h4>
							<nav>
								{toc.map((s, i) => (
									<a
										key={s.id}
										href={`#${s.id}`}
										className={i === current ? 'on' : ''}
										onClick={e => {
											e.preventDefault()
											document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
										}}
									>
										<i>{String(i + 1).padStart(2, '0')}</i>
										{s.text}
									</a>
								))}
							</nav>
							<div className='bar'>
								<i ref={barRef} />
							</div>
						</aside>
					)}
				</div>
			</main>
		</PageFrame>
	)
}

export default SectionShell
