import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { formatPostDate, htmlToExcerpt } from '@/components/news/NewsParts'
import { useNewsPosts } from '@/hooks/useNewsPosts'
import { useInView } from './hooks'

const LIMIT = 6

/**
 * Institut yangiliklari (sitePostsApi) — gorizontal slayder.
 * Backendda yangilik bo'lmasa bo'lim umuman ko'rsatilmaydi (soxta kontent yo'q).
 */
export default function HomeNews() {
	const { posts } = useNewsPosts()
	// Kuzatuvchi (useInView) element mavjud bo'lgandagina ishga tushishi uchun bo'lim alohida komponent
	return posts.length ? <NewsSection posts={posts} /> : null
}

function NewsSection({ posts }) {
	const { t } = useTranslation()
	const items = posts.slice(0, LIMIT)
	const [secRef, inView] = useInView({ threshold: 0.15 })
	const railRef = useRef(null)
	const barRef = useRef(null)
	const drag = useRef({ active: null, moved: false })
	const [l1, l2 = ''] = t('home.nw_t').split('|')

	const progress = () => {
		const rail = railRef.current
		const bar = barRef.current
		if (!rail || !bar) return
		const W = rail.scrollWidth
		const C = rail.clientWidth
		if (!W) return
		const max = W - C
		bar.style.width = `${(C / W) * 100}%`
		bar.style.transform = `translateX(${max ? (rail.scrollLeft / max) * (W / C - 1) * 100 : 0}%)`
	}

	useEffect(() => {
		progress()
		const rail = railRef.current
		if (!rail) return
		const onMove = e => {
			const d = drag.current
			if (!d.active) return
			const dx = e.clientX - d.active.x
			if (Math.abs(dx) > 4) d.moved = true
			rail.scrollLeft = d.active.s - dx
		}
		const onUp = () => {
			if (drag.current.active) {
				drag.current.active = null
				rail.style.scrollSnapType = ''
			}
		}
		window.addEventListener('pointermove', onMove)
		window.addEventListener('pointerup', onUp)
		window.addEventListener('resize', progress)
		return () => {
			window.removeEventListener('pointermove', onMove)
			window.removeEventListener('pointerup', onUp)
			window.removeEventListener('resize', progress)
		}
	}, [items.length])

	const step = () => {
		const c = railRef.current?.querySelector('.nw-c')
		return c ? c.offsetWidth + 20 : 300
	}

	return (
		<section id='news' aria-labelledby='nwTitle' ref={secRef} className={inView ? 'in' : ''}>
			<div className='nw-in'>
				<div className='nw-hd'>
					<div>
						<div className='lab'>{t('home.nw_lab')}</div>
						<h2 id='nwTitle'>
							{l1} <span>{l2}</span>
						</h2>
					</div>
					<Link className='nw-all' to='/media-servises/yangiliklar'>
						<span>{t('home.nw_all')}</span>
						<span aria-hidden='true'>→</span>
					</Link>
				</div>
				<div
					className='nw-rail'
					id='nwRail'
					ref={railRef}
					onScroll={progress}
					onPointerDown={e => {
						if (e.pointerType !== 'mouse') return
						drag.current = { active: { x: e.clientX, s: railRef.current.scrollLeft }, moved: false }
						railRef.current.style.scrollSnapType = 'none'
					}}
					onClickCapture={e => {
						if (drag.current.moved) {
							e.preventDefault()
							drag.current.moved = false
						}
					}}
				>
					{items.map((post, i) => (
						<Link key={post.id} className='nw-c' style={{ '--i': i }} draggable={false} to={`/media-servises/yangiliklar/${post.id}`}>
							<div className='ph'>{post.thumbnail && <img src={post.thumbnail} alt='' loading='lazy' draggable={false} />}</div>
							<div className='bd'>
								<span className='dt'>{formatPostDate(post.createdAt)}</span>
								<h3>{post.title}</h3>
								<p>{htmlToExcerpt(post.body, 120)}</p>
								<span className='more'>{t('home.nw_more')} →</span>
							</div>
						</Link>
					))}
				</div>
				<div className='nw-ctl'>
					<button className='nw-arr' type='button' aria-label='Previous' onClick={() => railRef.current.scrollBy({ left: -step(), behavior: 'smooth' })}>←</button>
					<div className='nw-prog'>
						<i ref={barRef} />
					</div>
					<button className='nw-arr' type='button' aria-label='Next' onClick={() => railRef.current.scrollBy({ left: step(), behavior: 'smooth' })}>→</button>
				</div>
			</div>
		</section>
	)
}
