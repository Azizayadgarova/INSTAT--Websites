import { useContacts } from '@/hooks/useContacts'
import sIconInsta from '@/assets/Major Brand Logos [1.1] (1).png'
import sIconX from '@/assets/Major Brand Logos [1.1].png'
import sIconFb from '@/assets/Vector (14).png'
import sIconLn from '@/assets/Vector (15).png'

/**
 * "Share this blog" ijtimoiy tarmoq havolalari. Manzillar site-data
 * (module="all") API'sidan useContacts orqali olinadi; backendda bo'sh bo'lsa
 * config/contacts.js zaxirasiga qaytadi. URL yo'q bo'lsa, ikonka ko'rsatilmaydi.
 */
const LABEL = {
	fontFamily: 'Inter Display, sans-serif',
	fontWeight: 400,
	fontSize: '16px',
	lineHeight: '28px',
	letterSpacing: '-0.02em',
	color: 'rgba(153,160,174,1)',
	marginBottom: '12px',
}

const ShareLinks = ({ label }) => {
	const { social } = useContacts()

	const items = [
		{ src: sIconInsta, alt: 'Instagram', href: social.instagram },
		{ src: sIconX, alt: 'X', href: social.twitter },
		{ src: sIconFb, alt: 'Facebook', href: social.facebook },
		{ src: sIconLn, alt: 'LinkedIn', href: social.linkedin },
	].filter(i => i.href)

	if (items.length === 0) return null

	return (
		<div style={{ marginTop: '32px', paddingLeft: '6px' }}>
			<p style={LABEL}>{label}</p>
			<div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
				{items.map(({ src, alt, href }) => (
					<a
						key={alt}
						href={href}
						target='_blank'
						rel='noopener noreferrer'
						aria-label={alt}
						className='transition hover:opacity-80'
						style={{
							width: 24,
							height: 24,
							flexShrink: 0,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<img
							src={src}
							alt={alt}
							style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
							loading='lazy'
							decoding='async'
						/>
					</a>
				))}
			</div>
		</div>
	)
}

export default ShareLinks
