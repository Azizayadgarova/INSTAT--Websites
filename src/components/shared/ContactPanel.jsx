import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useContacts } from '@/hooks/useContacts'
import useSectionText from '@/hooks/useSectionText'
import { useSocialLinks } from '@/hooks/useSocialLinks'
import './contact-panel.css'

const icon = children => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
		{children}
	</svg>
)

const PhoneIcon = () =>
	icon(<path d='M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.6c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z' />)
const MailIcon = () =>
	icon(
		<>
			<rect x='3' y='5' width='18' height='14' rx='2' />
			<path d='M4 7l8 6 8-6' />
		</>,
	)
const ClockIcon = () =>
	icon(
		<>
			<circle cx='12' cy='12' r='9' />
			<path d='M12 7v5l3 2' />
		</>,
	)
const CopyIcon = () =>
	icon(
		<>
			<rect x='9' y='9' width='11' height='11' rx='2' />
			<path d='M5 15V6a2 2 0 012-2h9' />
		</>,
	)
const CheckIcon = () => icon(<path d='M5 12.5l4.5 4.5L19 7.5' />)
const ExternalIcon = () => icon(<path d='M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5' />)
const NavIcon = () => icon(<path d='M21 3L3 10.5l7.5 2.5L13 20.5 21 3z' />)
const PinIcon = () =>
	icon(
		<>
			<path d='M12 22s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z' />
			<circle cx='12' cy='10' r='2.5' />
		</>,
	)
const BusIcon = () =>
	icon(
		<>
			<rect x='5' y='4' width='14' height='13' rx='3' />
			<path d='M5 12h14M8 20l1.5-3M16 20l-1.5-3' />
		</>,
	)

/** Uzluksiz transport matnini turlar bo'yicha alohida qatorlarga ajratadi. */
const splitTransport = raw =>
	String(raw)
		.replace(/(Avtobus|Trolleybus|Trolleybuslar|Tramvay|Marshrut\s*taks(?:i)?|Marshrutka|Metro)\s*:/gi, '\n$1:')
		.split('\n')
		.map(s => s.trim())
		.filter(Boolean)

/** "+998712038000" -> "+998 71 203 80 00"; boshqa shakllar o'zgarishsiz qoladi. */
const formatPhone = raw => {
	const m = /^\+?998(\d{2})(\d{3})(\d{2})(\d{2})$/.exec(String(raw).replace(/[\s()-]/g, ''))
	return m ? `+998 ${m[1]} ${m[2]} ${m[3]} ${m[4]}` : raw
}

/** Bitta aloqa qatori: ikonka + yorliq + qiymat (havola bo'lishi mumkin) + nusxalash tugmasi. */
const Row = ({ Ico, label, value, href, copy, copied, onCopy, copyLabel }) => (
	<div className='cc-row'>
		<span className='cc-ic'>
			<Ico />
		</span>
		<div className='cc-t'>
			<small>{label}</small>
			{href ? <a href={href}>{value}</a> : <span>{value}</span>}
		</div>
		{copy && (
			<button type='button' className={`cc-cp${copied ? ' ok' : ''}`} onClick={() => onCopy(copy)} aria-label={copyLabel} title={copyLabel}>
				{copied ? <CheckIcon /> : <CopyIcon />}
			</button>
		)}
	</div>
)

/**
 * "Kontakt" sahifasi: chapda aloqa kanallari (telefon, pochta, ish vaqti — nusxalash tugmalari bilan)
 * va ijtimoiy tarmoqlar, o'ngda xarita (manzil havolasi bo'lsa iframe) va manzil kartasi.
 * Ma'lumot backend'dan (module="all"): useContacts / useSocialLinks / useSectionText.
 */
export default function ContactPanel() {
	const { t } = useTranslation()
	const contacts = useContacts()
	const socials = useSocialLinks()
	const st = useSectionText('all')

	const [copied, setCopied] = useState('')
	const timer = useRef(0)
	useEffect(() => () => clearTimeout(timer.current), [])
	const onCopy = async text => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(text)
			clearTimeout(timer.current)
			timer.current = setTimeout(() => setCopied(''), 1800)
		} catch {
			/* clipboard mavjud emas — jim o'tkazib yuboriladi */
		}
	}

	const phoneRaw = st('phone_number', contacts.phone)
	const phone = formatPhone(phoneRaw)
	const email = st('email', contacts.email)
	const address = st('address', contacts.address.full)
	const mapSrc = st('address_link', '')
	const query = encodeURIComponent(address)
	const copyLabel = t('contactPage.copy')
	const rowProps = { onCopy, copyLabel }

	return (
		<div className='cc'>
			<div className='cc-card'>
				<h3>{t('contactPage.channels')}</h3>
				<div className='cc-rows'>
					<Row Ico={PhoneIcon} label={t('contactPage.phone')} value={phone} href={`tel:${phoneRaw.replace(/[^\d+]/g, '')}`} copy={phone} copied={copied === phone} {...rowProps} />
					<Row Ico={MailIcon} label={t('contactPage.email')} value={email} href={`mailto:${email}`} copy={email} copied={copied === email} {...rowProps} />
					{contacts.fax && (
						<Row Ico={PhoneIcon} label={t('contactPage.fax')} value={contacts.fax} href={contacts.faxHref} copy={contacts.fax} copied={copied === contacts.fax} {...rowProps} />
					)}
					<Row Ico={ClockIcon} label={t('contactPage.hours')} value={t('contactPage.hoursVal')} {...rowProps} />
				</div>
				{/* Qiymati bo'sh tarmoq ko'rsatilmaydi (useSocialLinks) */}
				{socials.length > 0 && (
					<>
						<div className='cc-sep' />
						<div>
							<div className='cc-sl'>{t('contactPage.social')}</div>
							<div className='cc-soc'>
								{socials.map(({ key, label, href, Icon }) => (
									<a key={key} href={href} target='_blank' rel='noopener noreferrer' aria-label={label} title={label}>
										<Icon size={20} aria-hidden='true' />
									</a>
								))}
							</div>
						</div>
					</>
				)}
			</div>

			<div className='cc-card cc-map'>
				<div className='cc-view'>
					{/* Marker xarita ostida turadi: embed yuklanmasa ham ko'rinadi, yuklansa xarita uni yopadi */}
					<span className='cc-pin' aria-hidden='true' />
					{mapSrc && <iframe title={t('contactPage.mapTitle')} src={mapSrc} loading='lazy' referrerPolicy='no-referrer-when-downgrade' />}
					<div className='cc-act'>
						<a className='cc-b p' href={`https://www.google.com/maps/search/?api=1&query=${query}`} target='_blank' rel='noopener noreferrer'>
							<ExternalIcon />
							{t('contactPage.openMap')}
						</a>
						<a className='cc-b' href={`https://www.google.com/maps/dir/?api=1&destination=${query}`} target='_blank' rel='noopener noreferrer'>
							<NavIcon />
							{t('contactPage.route')}
						</a>
					</div>
				</div>
				<div className='cc-addr'>
					<div>
						<span className='cc-ic'>
							<PinIcon />
						</span>
						<div className='cc-t'>
							<small>{t('contactPage.address')}</small>
							<span>{address}</span>
						</div>
					</div>
					{contacts.transport && (
						<div>
							<span className='cc-ic'>
								<BusIcon />
							</span>
							<div className='cc-t'>
								<small>{t('contactPage.transport')}</small>
								{splitTransport(contacts.transport).map(line => (
									<span className='sm' key={line}>
										{line.includes(':') ? line.slice(line.indexOf(':') + 1).trim() : line}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
