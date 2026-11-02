import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import logoImg from '@/assets/icons/InstatIcon.png'
import { LANGUAGES } from '@/i18n'
import { useMenuState } from '@/context/MenuContext'
import { useContacts } from '@/hooks/useContacts'
import { useExternalMenuLink } from '@/hooks/useExternalMenuLink'
import { useMenu } from '@/hooks/useMenu'
import useSectionText from '@/hooks/useSectionText'
import { useSocialLinks } from '@/hooks/useSocialLinks'
import { openCabinet } from '@/utils/cabinet'

const Arrow = () => <span aria-hidden='true'>→</span>

/** Bosh sahifa navigatsiyasi: tepadagi panel + to'liq ekranli menyu (bo'limlar / ichki havolalar). */
export default function HomeNav() {
	const { t, i18n } = useTranslation()
	const contacts = useContacts()
	const st = useSectionText('all')
	const socials = useSocialLinks()
	const menuConfig = useMenu()
	const externalHref = useExternalMenuLink()
	const { isOpen, toggle, close } = useMenuState()

	const keys = Object.keys(menuConfig)
	const [sel, setSel] = useState(0)
	const [scrolled, setScrolled] = useState(false)
	const sitesRef = useRef(null)
	const firstItemRef = useRef(null)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : ''
		if (!isOpen) return
		const focus = setTimeout(() => firstItemRef.current?.focus({ preventScroll: true }), 400)
		const onKey = e => e.key === 'Escape' && close()
		window.addEventListener('keydown', onKey)
		return () => {
			clearTimeout(focus)
			window.removeEventListener('keydown', onKey)
			document.body.style.overflow = ''
		}
	}, [isOpen, close])

	const section = menuConfig[keys[sel]] ?? menuConfig[keys[0]]

	// Ichki havolalar har bo'lim almashganda qayta "kirib keladi"
	useEffect(() => {
		const box = sitesRef.current
		if (!box) return
		box.classList.remove('sw')
		void box.offsetWidth
		box.classList.add('sw')
	}, [sel, isOpen, i18n.resolvedLanguage])

	const phone = st('phone_number', contacts.phone)
	const email = st('email', contacts.email)
	const address = st('address', '') || contacts.address.full

	return (
		<>
			<header className={`nav${scrolled ? ' sc' : ''}`} id='nav'>
				<div className='in'>
					<Link className='logo' to='/' aria-label='INSTAT' onClick={close}>
						<img className='logo-img' src={logoImg} alt='INSTAT' />
					</Link>
					<div className='r'>
						<div className='lang' role='group' aria-label={t('common.language')}>
							{LANGUAGES.map(({ code, label }) => (
								<button
									key={code}
									type='button'
									lang={code}
									className={i18n.resolvedLanguage === code ? 'on' : ''}
									aria-pressed={i18n.resolvedLanguage === code}
									onClick={() => i18n.changeLanguage(code)}
								>
									{label}
								</button>
							))}
						</div>
						<button
							className='mbtn'
							type='button'
							aria-expanded={isOpen}
							aria-controls='home-menu'
							onClick={toggle}
						>
							<span className='ico' aria-hidden='true'>
								<i />
								<i />
							</span>
							<span className='lb'>
								<span>{t('home.menu')}</span>
								<span>{t('home.close')}</span>
							</span>
						</button>
					</div>
				</div>
			</header>

			<div className={`menu${isOpen ? ' open' : ''}`} id='home-menu' aria-hidden={!isOpen} role='dialog' aria-modal='true' aria-label={t('home.menu')}>
				<div className='m-bg' />
				<div className='m-line' />
				<div className='m-in'>
					<div className='m-main'>
						<div className='m-lbl m-st'>{t('home.m_nav')}</div>
						<div>
							{keys.map((key, i) => (
								<a
									key={key}
									ref={i === 0 ? firstItemRef : undefined}
									className={`m-item m-st${i === sel ? ' on' : ''}`}
									style={{ '--i': i + 1 }}
									href='#'
									onPointerEnter={() => setSel(i)}
									onFocus={() => setSel(i)}
									onClick={e => {
										e.preventDefault()
										setSel(i)
									}}
								>
									<span className='n'>0{i + 1}</span>
									<span className='t'>{menuConfig[key].title}</span>
									<span className='a' aria-hidden='true'>→</span>
								</a>
							))}
						</div>
					</div>

					<div className='m-side'>
						<div className='m-st m-subw' style={{ '--i': 4 }}>
							<div className='m-lbl'>{t('home.m_sites')}</div>
							<div className='m-subh'>
								0{sel + 1}
								<b>/</b>
								{section.title}
								<b>· {section.links.length}</b>
							</div>
							<div className='m-sites' ref={sitesRef} key={keys[sel]}>
								{section.links.map((link, k) => {
									const external = externalHref(keys[sel], link.path)
									const common = { style: { '--k': k }, onClick: close }
									return external ? (
										<a key={link.path} {...common} href={external} target='_blank' rel='noopener noreferrer'>
											<span>{link.name}</span>
											<span>↗</span>
										</a>
									) : (
										<Link key={link.path} {...common} to={`${section.base}/${link.path}`}>
											<span>{link.name}</span>
											<span>→</span>
										</Link>
									)
								})}
							</div>
						</div>
					</div>

					<div className='m-foot m-st' style={{ '--i': 6 }}>
						<div className='ct'>
							<a href={contacts.phoneHref}>
								<small>{t('home.tel')}</small>
								{phone}
							</a>
							<a href={contacts.emailHref}>
								<small>Email</small>
								{email}
							</a>
							<a href='#contact' onClick={close}>
								<small>{t('home.adr')}</small>
								<span>{address}</span>
							</a>
							{socials.length > 0 && (
								<div className='sn'>
									<small>{t('home.sn')}</small>
									<div className='soc'>
										{socials.map(({ key, label, href }) => (
											<a key={key} href={href} target='_blank' rel='noopener noreferrer'>
												{label}
											</a>
										))}
									</div>
								</div>
							)}
						</div>
						<button
							className='btn btn-p'
							type='button'
							onClick={() => {
								close()
								openCabinet()
							}}
						>
							<span>{t('home.login')}</span>
							<Arrow />
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
