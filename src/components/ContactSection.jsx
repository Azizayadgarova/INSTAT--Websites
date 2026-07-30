import { useTranslation } from 'react-i18next'
import { useContacts } from '@/hooks/useContacts'
import sIcon1 from '@/assets/icons/Major Brand Logos [1.1] (2).png'
import sIcon2 from '@/assets/icons/Major Brand Logos [1.1] (3).png'
import sIcon3 from '@/assets/icons/Major Brand Logos [1.1] (4).png'
import sIcon4 from '@/assets/icons/Vector (16).png'

/**
 * Kontakt bloki: "Biz bilan bog'laning" (telefon/email/ijtimoiy tarmoq) + "Manzil"
 * (xarita). Ilgari Tuzilma sahifasida edi — Rahbariyat sahifasiga ko'chirildi.
 * Ma'lumot manbasi: useContacts (site-data, module="all") + statik zaxira.
 */

const TITLE = {
	fontFamily: 'Inter Display, sans-serif',
	fontWeight: 600,
	fontSize: '24px',
	lineHeight: '32px',
	letterSpacing: '-0.03em',
	color: 'rgba(242, 243, 247, 1)',
	margin: 0,
}

const LABEL = {
	fontFamily: 'Inter Display, sans-serif',
	fontWeight: 400,
	fontSize: '16px',
	lineHeight: '24px',
	letterSpacing: '0',
	color: 'rgba(227, 240, 252, 1)',
	margin: 0,
}

const LINK = {
	fontFamily: 'Inter Display, sans-serif',
	fontWeight: 500,
	fontSize: '20px',
	lineHeight: '28px',
	letterSpacing: '0',
	color: 'rgba(248, 250, 255, 1)',
	textDecoration: 'underline',
	textDecorationStyle: 'solid',
}

const SOCIAL_LABEL = {
	fontFamily: 'Inter Display, sans-serif',
	fontWeight: 500,
	fontSize: '20px',
	lineHeight: '28px',
	letterSpacing: '-0.5px',
	color: 'rgba(255, 255, 255, 1)',
	margin: 0,
}

/** Uzluksiz transport matnini turlar bo'yicha alohida qatorlarga ajratadi. */
const splitTransport = raw =>
	String(raw)
		.replace(/(Avtobus|Trolleybus|Trolleybuslar|Tramvay|Marshrut\s*taks(?:i)?|Marshrutka|Metro)\s*:/gi, '\n$1:')
		.split('\n')
		.map(s => s.trim())
		.filter(Boolean)

const IconSquare = ({ children }) => (
	<div
		style={{
			width: '32px',
			height: '32px',
			borderRadius: '8px',
			background: 'rgba(var(--blue-rgb),1)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexShrink: 0,
		}}
	>
		{children}
	</div>
)

const PhoneIcon = () => (
	<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
		<path
			d='M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.6c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z'
			stroke='#fff'
			strokeWidth='1.5'
			strokeLinejoin='round'
		/>
	</svg>
)

const EmailIcon = () => (
	<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
		<rect x='3' y='5' width='18' height='14' rx='2' stroke='#fff' strokeWidth='1.5' />
		<path d='M4 7l8 6 8-6' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const ContactSection = () => {
	const { t } = useTranslation()
	const contacts = useContacts()

	return (
		<div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px 80px' }}>
			{/* Badge */}
			<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
				<span
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						padding: '4px 16px',
						borderRadius: '8px',
						background: 'rgba(255, 255, 255, 0.04)',
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 600,
						fontSize: '16px',
						lineHeight: '28px',
						letterSpacing: '-0.02em',
						color: 'rgba(255, 255, 255, 1)',
					}}
				>
					{t('pages.tuzilma.kontakt')}
				</span>
			</div>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-[286px_501px]'>
				{/* Card 1: Biz bilan bog'laning */}
				<div
					style={{
						background: 'rgba(31, 37, 51, 1)',
						width: '100%',
						minHeight: '441px',
						borderRadius: '16px',
						padding: '16px',
						opacity: 1,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						gap: '20px',
						boxSizing: 'border-box',
					}}
				>
					<div>
						<h3 style={TITLE}>{t('pages.tuzilma.biz_bilan_boglaning')}</h3>

						<div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
							{/* Telefon */}
							<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
								<IconSquare>
									<PhoneIcon />
								</IconSquare>
								<p style={{ ...LABEL, marginTop: '8px' }}>{t('pages.tuzilma.telefon')}</p>
								<a href={contacts.phoneHref} style={LINK}>
									{contacts.phone}
								</a>
							</div>

							{/* Email */}
							<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
								<IconSquare>
									<EmailIcon />
								</IconSquare>
								<p style={{ ...LABEL, marginTop: '8px' }}>{t('pages.tuzilma.e_mail')}</p>
								<a href={contacts.emailHref} style={LINK}>
									{contacts.email}
								</a>
							</div>

							{/* Faks */}
							{contacts.fax && (
								<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
									<IconSquare>
										<PhoneIcon />
									</IconSquare>
									<p style={{ ...LABEL, marginTop: '8px' }}>{t('pages.tuzilma.faks')}</p>
									<a href={contacts.faxHref} style={LINK}>
										{contacts.fax}
									</a>
								</div>
							)}
						</div>
					</div>

					{/* Ijtimoiy tarmoqlar */}
					<div>
						<p style={SOCIAL_LABEL}>{t('pages.tuzilma.ijtimoiy_tarmoqlar')}</p>
						<div style={{ display: 'flex', gap: '29px', marginTop: '12px' }}>
							{[
								{ src: sIcon1, href: contacts.social.instagram, alt: 'Instagram', size: 40 },
								{ src: sIcon2, href: contacts.social.twitter, alt: 'X', size: 40 },
								{ src: sIcon3, href: contacts.social.facebook, alt: 'Facebook', size: 40 },
								{ src: sIcon4, href: contacts.social.linkedin, alt: 'LinkedIn', size: 32, mt: 4 },
							].map(({ src, href, alt, size, mt = 0 }) => (
								<a
									key={alt}
									href={href}
									target='_blank'
									rel='noopener noreferrer'
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: `${size}px`,
										height: `${size}px`,
										borderRadius: '8px',
										overflow: 'hidden',
										flexShrink: 0,
										marginTop: `${mt}px`,
									}}
								>
									<img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading='lazy' decoding='async' />
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Card 2: Manzil */}
				<div
					style={{
						background: 'rgba(31, 37, 51, 1)',
						width: '100%',
						minHeight: '441px',
						borderRadius: '16px',
						padding: '16px',
						gap: '16px',
						opacity: 1,
						display: 'flex',
						flexDirection: 'column',
						boxSizing: 'border-box',
					}}
				>
					<h3
						style={{
							fontFamily: 'Inter Display, sans-serif',
							fontWeight: 600,
							fontSize: '24px',
							lineHeight: '32px',
							letterSpacing: '-0.03em',
							color: 'rgba(242, 243, 244, 1)',
							margin: 0,
						}}
					>
						{t('pages.tuzilma.manzil')}
					</h3>

					<div
						style={{
							width: '100%',
							height: '296px',
							borderRadius: '24px',
							gap: '18px',
							opacity: 1,
							overflow: 'hidden',
							flexShrink: 0,
							boxSizing: 'border-box',
						}}
					>
						<iframe
							title={t('pages.tuzilma.instat_manzili')}
							src='https://www.google.com/maps?q=Toshkent+shahri+Shayxontohur+tumani+Navoiy+ko%27chasi+30-uy&output=embed'
							width='100%'
							height='100%'
							style={{ border: 0, display: 'block', borderRadius: '8px' }}
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
						/>
					</div>

					<div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
						<IconSquare>
							<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
								<path d='M12 22s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z' stroke='#fff' strokeWidth='1.5' strokeLinejoin='round' />
								<circle cx='12' cy='10' r='2.5' stroke='#fff' strokeWidth='1.5' />
							</svg>
						</IconSquare>
						<p
							style={{
								fontFamily: 'Inter Display, sans-serif',
								fontWeight: 500,
								fontSize: '20px',
								lineHeight: '28px',
								letterSpacing: '0',
								color: 'rgba(242, 243, 244, 1)',
								margin: 0,
							}}
						>
							{t('pages.tuzilma.toshkent_shahri_shayxontohur_tumani')}
						</p>
					</div>

					{/* Transport yo'nalishlari */}
					{contacts.transport && (
						<div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
							<IconSquare>
								<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
									<rect x='5' y='4' width='14' height='13' rx='3' stroke='#fff' strokeWidth='1.5' />
									<path d='M5 12h14' stroke='#fff' strokeWidth='1.5' />
									<path d='M8 20l1.5-3M16 20l-1.5-3' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' />
									<circle cx='8.5' cy='14.5' r='1' fill='#fff' />
									<circle cx='15.5' cy='14.5' r='1' fill='#fff' />
								</svg>
							</IconSquare>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
								{splitTransport(contacts.transport).map((line, i) => {
									const idx = line.indexOf(':')
									const rest = idx >= 0 ? line.slice(idx + 1).trim() : line
									return (
										<p
											key={i}
											style={{
												fontFamily: 'Inter Display, sans-serif',
												fontWeight: 500,
												fontSize: '20px',
												lineHeight: '28px',
												letterSpacing: '0',
												verticalAlign: 'middle',
												color: 'rgba(242, 243, 244, 1)',
												margin: 0,
											}}
										>
											{rest}
										</p>
									)
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ContactSection
