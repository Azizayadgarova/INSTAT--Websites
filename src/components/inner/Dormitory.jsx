import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Block from '@/components/home/Block'
import { DORM_PHOTOS, DORMITORY } from '@/data/dormitory.data'
import { HIGHLIGHT_ICONS, IconClose, IconMail, IconNext, IconPhone, IconPrev, IconZoom, RULE_KINDS } from './icons'
import { pageImg } from './pageImg'

const PHOTOS = DORM_PHOTOS.map(pageImg)

/** To'liq ekranli galereya: strelkalar, klaviatura (Esc / ← →), swipe va pastdagi miniatyuralar. */
function Lightbox({ index, onClose, onGo }) {
	const open = index != null
	const sx = useRef(0)

	useEffect(() => {
		if (!open) return
		const onKey = e => {
			if (e.key === 'Escape') onClose()
			if (e.key === 'ArrowRight') onGo(index + 1)
			if (e.key === 'ArrowLeft') onGo(index - 1)
		}
		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKey)
		return () => {
			document.body.style.overflow = prev
			window.removeEventListener('keydown', onKey)
		}
	}, [open, index, onClose, onGo])

	return (
		<div
			className={`lb${open ? ' on' : ''}`}
			role='dialog'
			aria-modal='true'
			aria-hidden={!open}
			onClick={e => e.target === e.currentTarget && onClose()}
			onTouchStart={e => (sx.current = e.touches[0].clientX)}
			onTouchEnd={e => {
				const d = e.changedTouches[0].clientX - sx.current
				if (Math.abs(d) > 40) onGo(index + (d < 0 ? 1 : -1))
			}}
		>
			<div className='lb-h'>
				<span>{open ? `${index + 1} / ${PHOTOS.length}` : ''}</span>
				<button type='button' onClick={onClose} aria-label='Close'>
					<IconClose />
				</button>
			</div>
			<div className='lb-s' onClick={e => e.target === e.currentTarget && onClose()}>
				<button type='button' className='lb-n' onClick={() => onGo(index - 1)} aria-label='Prev'>
					<IconPrev />
				</button>
				{open && <img src={PHOTOS[index]} alt='' />}
				<button type='button' className='lb-n' onClick={() => onGo(index + 1)} aria-label='Next'>
					<IconNext />
				</button>
			</div>
			<div className='lb-t'>
				{PHOTOS.map((u, k) => (
					<button type='button' key={u} className={k === index ? 'on' : ''} onClick={() => onGo(k)}>
						<img src={u} alt='' />
					</button>
				))}
			</div>
		</div>
	)
}

/**
 * "Mehmonxona turidagi yotoqxona": galereya (lightbox), ajratilgan ko'rsatkichlar, haqida matni,
 * qoidalar kartalari va aloqa chaqirig'i. Prototip: INSTAT/page.html (`p05`). Statik — @/data/dormitory.data.
 */
export default function Dormitory() {
	const { i18n } = useTranslation()
	const c = DORMITORY[i18n.resolvedLanguage] ?? DORMITORY.uz
	const [lb, setLb] = useState(null)
	const go = useCallback(i => setLb((i + PHOTOS.length) % PHOTOS.length), [])
	const close = useCallback(() => setLb(null), [])

	return (
		<>
			<Block n='01' title={c.s[0]}>
				<div className='gal'>
					{PHOTOS.map((u, i) => (
						<button type='button' key={u} onClick={() => setLb(i)}>
							<img src={u} alt='' loading='lazy' />
							{i === 0 && <span className='cnt'>{`${PHOTOS.length} ${c.ph}`}</span>}
							<span className='zm'>
								<IconZoom />
							</span>
						</button>
					))}
				</div>
				<div className='hl'>
					{c.hl.map((x, i) => (
						<div key={x[0]}>
							<span className='ic'>{HIGHLIGHT_ICONS[i]}</span>
							<span>
								<b>{x[0]}</b>
								<small>{x[1]}</small>
							</span>
						</div>
					))}
				</div>
			</Block>

			<Block n='02' title={c.s[1]}>
				{c.ab.map(p => (
					<p key={p}>{p}</p>
				))}
			</Block>

			<Block n='03' title={c.s[2]}>
				<div className='rules'>
					{c.R.map((r, i) => (
						<div className={`rule${r[0] === 'doc' ? ' wide doc' : ''}`} style={{ '--c': RULE_KINDS[r[0]][0] }} key={r[1]}>
							<span className='ic'>
								{RULE_KINDS[r[0]][1]}
								<b>{String(i + 1).padStart(2, '0')}</b>
							</span>
							<p dangerouslySetInnerHTML={{ __html: r[1] }} />
						</div>
					))}
				</div>
			</Block>

			<Block>
				<div className='dcta'>
					<div>
						<b>{c.ct[0]}</b>
						<span>{c.ct[1]}</span>
					</div>
					<div className='bt'>
						<a className='btn btn-p' href='tel:+998712038000'>
							<IconPhone /> +998 93 579 93 12
						</a>
						<a className='btn btn-g' href='mailto:info@instat.uz'>
							<IconMail /> info@instat.uz
						</a>
					</div>
				</div>
			</Block>

			<Lightbox index={lb} onClose={close} onGo={go} />
		</>
	)
}
