import { useTranslation } from 'react-i18next'
import { useContacts } from '@/hooks/useContacts'
import { useSiteData } from '@/hooks/useSiteData'
import { pickPath } from '@/utils/siteContent'
import sIcon1 from '@/assets/icons/Major Brand Logos [1.1] (2).png'
import sIcon2 from '@/assets/icons/Major Brand Logos [1.1] (3).png'
import sIcon3 from '@/assets/icons/Major Brand Logos [1.1] (4).png'
import sIcon4 from '@/assets/icons/Vector (16).png'

const CARD = {
	background: 'rgba(31, 37, 51, 1)',
	borderRadius: '16px',
	padding: '16px',
}

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
		<rect
			x='3'
			y='5'
			width='18'
			height='14'
			rx='2'
			stroke='#fff'
			strokeWidth='1.5'
		/>
		<path
			d='M4 7l8 6 8-6'
			stroke='#fff'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

const InstagramSocial = () => (
	<svg width='40' height='40' viewBox='0 0 40 40' fill='none'>
		<rect width='40' height='40' rx='8' fill='url(#ig-grad)' />
		<defs>
			<linearGradient
				id='ig-grad'
				x1='40'
				y1='0'
				x2='0'
				y2='40'
				gradientUnits='userSpaceOnUse'
			>
				<stop stopColor='#833AB4' />
				<stop offset='0.5' stopColor='#C13584' />
				<stop offset='1' stopColor='#FD1D1D' />
			</linearGradient>
		</defs>
		<rect
			x='11'
			y='11'
			width='18'
			height='18'
			rx='5'
			stroke='#fff'
			strokeWidth='1.6'
		/>
		<circle cx='20' cy='20' r='4.5' stroke='#fff' strokeWidth='1.6' />
		<circle cx='25.5' cy='14.5' r='1.2' fill='#fff' />
	</svg>
)

const XSocial = () => (
	<svg width='40' height='40' viewBox='0 0 40 40' fill='none'>
		<rect width='40' height='40' rx='8' fill='#000' />
		<path
			d='M23.5 11h3.3l-7.2 8.2L28 29h-6.6l-4.6-6-5.3 6H8.2l7.7-8.8L12 11h6.8l4.1 5.6L23.5 11zm-1.2 16.1h1.8L17.9 13H16l6.3 14.1z'
			fill='#fff'
		/>
	</svg>
)

const FacebookSocial = () => (
	<svg width='40' height='40' viewBox='0 0 40 40' fill='none'>
		<rect width='40' height='40' rx='8' fill='#1877F2' />
		<path
			d='M22.5 21h2.3l.7-3H22.5v-1.8c0-.8.4-1.6 1.6-1.6H25.5V12s-1.1-.2-2.2-.2c-2.3 0-3.8 1.4-3.8 3.8V18H17v3h2.5v7.5h3V21z'
			fill='#fff'
		/>
	</svg>
)

const LinkedinSocial = () => (
	<svg width='40' height='40' viewBox='0 0 40 40' fill='none'>
		<rect width='40' height='40' rx='8' fill='#0A66C2' />
		<circle cx='14.5' cy='15' r='1.8' fill='#fff' />
		<rect x='13' y='18.5' width='3' height='10' rx='1' fill='#fff' />
		<path
			d='M20 18.5h2.8v1.5c.5-.9 1.6-1.7 3-1.7 2.7 0 3.7 1.8 3.7 4.3V28.5h-3v-5c0-1.2-.4-2.1-1.5-2.1-1.2 0-1.5.9-1.5 2.1v5H20V18.5z'
			fill='#fff'
		/>
	</svg>
)

const Tuzilma = () => {
    const {
        t
    } = useTranslation();

    const contacts = useContacts()
    const structureImg = useSiteData(d => pickPath(d.byModuleKey.structure?.structure)).data

    return (
        <div
            style={{ maxWidth: '900px', margin: '0 auto', padding: '59px 16px 80px' }}
        >
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
                >{t("pages.tuzilma.kontakt")}</span>
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-[286px_501px]'>
                {/* Card 1 */}
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
                        <h3 style={TITLE}>{t("pages.tuzilma.biz_bilan_boglaning")}</h3>

                        <div
                            style={{
                                marginTop: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            {/* Telefon */}
                            <div
                                style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
                            >
                                <IconSquare>
                                    <PhoneIcon />
                                </IconSquare>
                                <p style={{ ...LABEL, marginTop: '8px' }}>{t("pages.tuzilma.telefon")}</p>
                                <a href={contacts.phoneHref} style={LINK}>
                                    {contacts.phone}
                                </a>
                            </div>

                            {/* Email */}
                            <div
                                style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
                            >
                                <IconSquare>
                                    <EmailIcon />
                                </IconSquare>
                                <p style={{ ...LABEL, marginTop: '8px' }}>{t("pages.tuzilma.e_mail")}</p>
                                <a href={contacts.emailHref} style={LINK}>
                                    {contacts.email}
                                </a>
                            </div>

                            {/* Faks */}
                            {contacts.fax && (
                                <div
                                    style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
                                >
                                    <IconSquare>
                                        <PhoneIcon />
                                    </IconSquare>
                                    <p style={{ ...LABEL, marginTop: '8px' }}>{t("pages.tuzilma.faks")}</p>
                                    <a href={contacts.faxHref} style={LINK}>
                                        {contacts.fax}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ijtimoiy tarmoqlar */}
                    <div>
                        <p style={SOCIAL_LABEL}>{t("pages.tuzilma.ijtimoiy_tarmoqlar")}</p>
                        <div style={{ display: 'flex', gap: '29px', marginTop: '12px' }}>
                            {[
                                { src: sIcon1, href: contacts.social.instagram, alt: 'Instagram', size: 40 },
                                { src: sIcon2, href: contacts.social.twitter, alt: 'X', size: 40 },
                                { src: sIcon3, href: contacts.social.facebook, alt: 'Facebook', size: 40 },
                                { src: sIcon4, href: contacts.social.linkedin, alt: 'LinkedIn', size: 32, mt: 4 },
                            ].map(({ src, href, alt, size, mt = 0 }) => (
                                <a key={alt} href={href} target='_blank' rel='noopener noreferrer'
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
                    >{t("pages.tuzilma.manzil")}</h3>

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
                            title={t("pages.tuzilma.instat_manzili")}
                            src='https://www.google.com/maps?q=Toshkent+shahri+Shayxontohur+tumani+Navoiy+ko%27chasi+30-uy&output=embed'
                            width='100%'
                            height='100%'
                            style={{ border: 0, display: 'block', borderRadius: '8px' }}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                        }}
                    >
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
                            <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                                <path
                                    d='M12 22s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z'
                                    stroke='#fff'
                                    strokeWidth='1.5'
                                    strokeLinejoin='round'
                                />
                                <circle cx='12' cy='10' r='2.5' stroke='#fff' strokeWidth='1.5' />
                            </svg>
                        </div>
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
                        >{t("pages.tuzilma.toshkent_shahri_shayxontohur_tumani")}</p>
                    </div>

                    {/* Transport yo'nalishlari */}
                    {contacts.transport && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px',
                            }}
                        >
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
                                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                                    <rect x='5' y='4' width='14' height='13' rx='3' stroke='#fff' strokeWidth='1.5' />
                                    <path d='M5 12h14' stroke='#fff' strokeWidth='1.5' />
                                    <path d='M8 20l1.5-3M16 20l-1.5-3' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' />
                                    <circle cx='8.5' cy='14.5' r='1' fill='#fff' />
                                    <circle cx='15.5' cy='14.5' r='1' fill='#fff' />
                                </svg>
                            </div>
                            <div>
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
                        </div>
                    )}
                </div>
            </div>

            {/* Tashkiliy tuzilma rasmi (API: module=structure) */}
            {structureImg && (
                <div
                    style={{
                        marginTop: '24px',
                        background: 'rgba(31, 37, 51, 1)',
                        borderRadius: '16px',
                        padding: '16px',
                        boxSizing: 'border-box',
                    }}
                >
                    <h3 style={{ ...TITLE, marginBottom: '16px' }}>{t("pages.tuzilma.tuzilma_rasmi")}</h3>
                    <a href={structureImg} target='_blank' rel='noopener noreferrer'>
                        <img
                            src={structureImg}
                            alt={t("pages.tuzilma.tuzilma_rasmi")}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                borderRadius: '12px',
                            }}
                            loading='lazy'
                            decoding='async'
                        />
                    </a>
                </div>
            )}
        </div>
    );
}

export default Tuzilma
