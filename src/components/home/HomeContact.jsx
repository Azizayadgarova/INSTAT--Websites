import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useContacts } from '@/hooks/useContacts'
import useSectionText from '@/hooks/useSectionText'
import { buildDotMap, fitCanvas } from './geo'
import { useInView, usePrefersReducedMotion } from './hooks'

const Icon = ({ children }) => (
	<i>
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>{children}</svg>
	</i>
)

/** Toshkent nuqtasi yonib turadigan kichik xarita. */
function CityMap({ active, rm }) {
	const ref = useRef(null)
	useEffect(() => {
		const canvas = ref.current
		if (!canvas || !active) return
		let ctx, W, H, proj, dots
		const init = () => {
			if (!canvas.clientWidth) return
			;({ ctx, W, H } = fitCanvas(canvas))
			;({ proj, dots } = buildDotMap(W, H, { pad: [30, 24], step: 5, yShift: 0 }))
		}
		const draw = t => {
			if (!proj) return
			ctx.clearRect(0, 0, W, H)
			const [tx, ty] = proj(69.24, 41.31)
			for (const p of dots) {
				const d = Math.hypot(p[0] - tx, p[1] - ty)
				const n = Math.max(0, 1 - d / 60)
				ctx.globalAlpha = 0.35 + n * 0.6
				ctx.fillStyle = n > 0.3 ? '#00E6FC' : '#3d86d8'
				ctx.fillRect(p[0] - 0.9, p[1] - 0.9, 1.8, 1.8)
			}
			ctx.globalAlpha = 1
			const ph = (t % 2400) / 2400
			ctx.strokeStyle = '#00E6FC'
			ctx.globalAlpha = 1 - ph
			ctx.lineWidth = 1.2
			ctx.beginPath()
			ctx.arc(tx, ty, 4 + ph * 18, 0, 7)
			ctx.stroke()
			ctx.globalAlpha = 1
			ctx.fillStyle = '#fff'
			ctx.beginPath()
			ctx.arc(tx, ty, 3, 0, 7)
			ctx.fill()
		}
		init()
		draw(0)
		const onResize = () => {
			init()
			draw(0)
		}
		window.addEventListener('resize', onResize)
		let raf
		const loop = t => {
			if (!rm) draw(t)
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)
		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', onResize)
		}
	}, [active, rm])
	return <canvas id='ctMap' ref={ref} />
}

/**
 * Aloqa bloki. Kontaktlar backenddan (site-data "all" moduli, useContacts).
 * Xabar yuborish uchun backendda endpoint yo'q — forma brauzer ichida tekshiriladi.
 */
export default function HomeContact() {
	const { t } = useTranslation()
	const rm = usePrefersReducedMotion()
	const contacts = useContacts()
	const st = useSectionText('all')
	const [secRef, inView] = useInView({ threshold: 0.12 })
	const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
	const [errors, setErrors] = useState({ name: false, phone: false })
	const [status, setStatus] = useState('') // '' | 'err' | 'ok'
	const timer = useRef(null)
	const [l1, l2 = ''] = t('home.ct_t').split('|')

	useEffect(() => () => clearTimeout(timer.current), [])

	const phone = st('phone_number', contacts.phone)
	const email = st('email', contacts.email)
	const address = st('address', '') || contacts.address.full
	const telegram = contacts.social?.telegram
	const tgHandle = telegram ? `@${telegram.replace(/\/+$/, '').split('/').pop()}` : ''

	const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

	const onSubmit = e => {
		e.preventDefault()
		const nameBad = !form.name.trim()
		const phoneBad = form.phone.replace(/\D/g, '').length < 7
		setErrors({ name: nameBad, phone: phoneBad })
		if (nameBad || phoneBad) return setStatus('err')
		setStatus('ok')
		timer.current = setTimeout(() => {
			setStatus('')
			setForm({ name: '', phone: '', email: '', message: '' })
		}, 4000)
	}

	return (
		<section id='contact' aria-labelledby='ctTitle' ref={secRef} className={inView ? 'in' : ''}>
			<div className='ct-in'>
				<div className='ct-info'>
					<span className='lab' style={{ '--i': 0 }}>{t('home.ct_lab')}</span>
					<h2 id='ctTitle' style={{ '--i': 1 }}>
						{l1} <span>{l2}</span>
					</h2>
					<p style={{ '--i': 2 }}>{t('home.ct_sub')}</p>
					<div className='ct-rows' style={{ '--i': 3 }}>
						<a href={contacts.phoneHref}>
							<Icon><path d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z' /></Icon>
							<span><small>{t('home.ct_tel')}</small><b>{phone}</b></span>
							<em>→</em>
						</a>
						<a href={contacts.emailHref}>
							<Icon><rect x='2' y='4' width='20' height='16' rx='2' /><path d='m22 7-10 6L2 7' /></Icon>
							<span><small>Email</small><b>{email}</b></span>
							<em>→</em>
						</a>
						{telegram && (
							<a href={telegram} target='_blank' rel='noopener noreferrer'>
								<Icon><path d='m22 3-9.5 18-2.5-8-8-2.5Z' /><path d='m22 3-12 10' /></Icon>
								<span><small>Telegram</small><b>{tgHandle}</b></span>
								<em>↗</em>
							</a>
						)}
						<div>
							<Icon><path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' /><circle cx='12' cy='10' r='3' /></Icon>
							<span><small>{t('home.ct_adr')}</small><b>{address}</b></span>
							<em />
						</div>
					</div>
					<div className='ct-map' style={{ '--i': 4 }} aria-hidden='true'>
						<CityMap active={inView} rm={rm} />
						<span>{t('home.ct_city')}</span>
					</div>
				</div>

				<form className='ct-form' id='ctForm' noValidate onSubmit={onSubmit}>
					<svg className='gb-s' aria-hidden='true'>
						<rect x='.75' y='.75' width='calc(100% - 1.5px)' height='calc(100% - 1.5px)' rx='32' pathLength='100' />
					</svg>
					<h3 style={{ '--i': 1 }}>{t('home.ct_ft')}</h3>
					<div className='ct-two' style={{ '--i': 3 }}>
						<div className={`fl${errors.name ? ' err' : ''}`}>
							<input id='ctN' placeholder=' ' autoComplete='name' value={form.name} onChange={set('name')} />
							<label htmlFor='ctN'>{t('home.ct_n')}</label>
						</div>
						<div className={`fl${errors.phone ? ' err' : ''}`}>
							<input id='ctP' type='tel' placeholder=' ' autoComplete='tel' value={form.phone} onChange={set('phone')} />
							<label htmlFor='ctP'>{t('home.ct_p')}</label>
						</div>
					</div>
					<div className='fl' style={{ '--i': 4 }}>
						<input id='ctE' type='email' placeholder=' ' autoComplete='email' value={form.email} onChange={set('email')} />
						<label htmlFor='ctE'>Email</label>
					</div>
					<div className='fl msg' style={{ '--i': 5 }}>
						<textarea id='ctM' placeholder=' ' value={form.message} onChange={set('message')} />
						<label htmlFor='ctM'>{t('home.ct_m')}</label>
					</div>
					<div className='ct-send' style={{ '--i': 6 }}>
						<button className={`btn btn-p ct-btn${status === 'ok' ? ' done' : ''}`} type='submit'>
							<span>{t('home.ct_s')}</span>
							<span aria-hidden='true'>→</span>
							<span className='ok' aria-hidden='true'>✓</span>
						</button>
						<small>{t('home.ct_note')}</small>
					</div>
					<div className={`ct-msg${status === 'ok' ? ' good' : ''}`} role='status' style={{ '--i': 7 }}>
						{status === 'err' ? t('home.ct_err') : status === 'ok' ? t('home.ct_ok') : ''}
					</div>
				</form>
			</div>
		</section>
	)
}
