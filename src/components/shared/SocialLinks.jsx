import { useContacts } from '@/hooks/useContacts'

// DIQQAT: fayl nomlari Figma eksportidan qolgan va tarmoq nomiga mos emas.
// Quyidagi tartib maketdagi ko'rinish bo'yicha: LinkedIn, X, Facebook, Instagram.
import icLinkedin from '@/assets/Major Brand Logos [1.1] (1).png'
import icX from '@/assets/Major Brand Logos [1.1].png'
import icFacebook from '@/assets/Vector (14).png'
import icInstagram from '@/assets/Vector (15).png'

/**
 * Ochib bo'ladigan havolami. Faqat http(s) manzil link qilinadi — API kaliti
 * butunlay bo'sh bo'lsa `href=""` bilan o'lik <a> chiqarmaymiz (bosilganda
 * sahifa o'zini qayta yuklaydi). Profil manzili yo'q, lekin tarmoq manzili bor
 * qiymat (masalan "https://facebook.com/") link qilinadi — @/config/contacts
 * dagi o'rinbosarlar shunday va bu qasddan: qator hamma yerda bosiladigan
 * bo'lib turadi, admin panelda aniq profil yozilishi bilan aynan unga o'tadi.
 */
const isOpenable = url => /^https?:\/\/.+/i.test((url ?? '').toString().trim())

/**
 * Ijtimoiy tarmoq ikonkalari — sayt bo'ylab YAGONA manba (Navbar footer'i,
 * About / Science / MediaServise sidebar'lari, SidebarLayout).
 *
 * Havolalar API'dan keladi: site-data (module="all") -> linkedin / twitter /
 * facebook / instagram kalitlari (@/hooks/useContacts), bo'sh bo'lsa
 * @/config/contacts dagi qiymatlar.
 */
const SocialLinks = ({ size = 24, gap = 25 }) => {
	const { social } = useContacts()

	const items = [
		{ src: icLinkedin, label: 'LinkedIn', href: social.linkedin },
		{ src: icX, label: 'X (Twitter)', href: social.twitter },
		{ src: icFacebook, label: 'Facebook', href: social.facebook },
		{ src: icInstagram, label: 'Instagram', href: social.instagram },
	]

	return (
		<div style={{ display: 'flex', gap, alignItems: 'center' }}>
			{items.map(({ src, label, href }) => {
				const icon = (
					<img
						src={src}
						alt={label}
						loading='lazy'
						decoding='async'
						style={{ width: '100%', height: '100%', objectFit: 'contain' }}
					/>
				)
				const style = {
					width: size,
					height: size,
					flexShrink: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transition: 'opacity .2s, transform .2s',
				}

				if (!isOpenable(href)) return <span key={label} style={style}>{icon}</span>

				return (
					<a
						key={label}
						href={href}
						target='_blank'
						rel='noopener noreferrer'
						aria-label={label}
						style={style}
						onMouseEnter={e => {
							e.currentTarget.style.opacity = '0.7'
							e.currentTarget.style.transform = 'translateY(-2px)'
						}}
						onMouseLeave={e => {
							e.currentTarget.style.opacity = '1'
							e.currentTarget.style.transform = 'none'
						}}
					>
						{icon}
					</a>
				)
			})}
		</div>
	)
}

export default SocialLinks
