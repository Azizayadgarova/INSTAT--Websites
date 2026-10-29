import { useSocialLinks } from '@/hooks/useSocialLinks'

/**
 * Ijtimoiy tarmoq ikonkalari (Remix Icon) — About / Science / MediaServise
 * sidebar'lari va SidebarLayout uchun.
 *
 * Havolalar API'dan keladi: site-data (module="all") -> telegram / instagram /
 * facebook / twitter / linkedin / youtube (@/hooks/useSocialLinks). Qiymati
 * bo'sh tarmoq ko'rsatilmaydi; hech biri bo'lmasa blok umuman chizilmaydi.
 */
const SocialLinks = ({ size = 24, gap = 25 }) => {
	const socials = useSocialLinks()
	if (socials.length === 0) return null

	return (
		<div style={{ display: 'flex', gap, alignItems: 'center' }}>
			{socials.map(({ key, label, href, Icon }) => (
				<a
					key={key}
					href={href}
					target='_blank'
					rel='noopener noreferrer'
					aria-label={label}
					title={label}
					style={{
						width: size,
						height: size,
						flexShrink: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#fff',
						transition: 'opacity .2s, transform .2s',
					}}
					onMouseEnter={e => {
						e.currentTarget.style.opacity = '0.7'
						e.currentTarget.style.transform = 'translateY(-2px)'
					}}
					onMouseLeave={e => {
						e.currentTarget.style.opacity = '1'
						e.currentTarget.style.transform = 'none'
					}}
				>
					<Icon size={size} aria-hidden='true' />
				</a>
			))}
		</div>
	)
}

export default SocialLinks
