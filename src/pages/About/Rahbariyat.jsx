import { useTranslation } from 'react-i18next'
import { useApiResource } from '@/hooks/useApiResource'
import { getManagers } from '@/api/managers.api'
import { pickField, mediaUrl } from '@/utils/siteContent'
import ContactSection from '@/components/ContactSection'
import iconPhone from '@/assets/icons/Frame 2147238356.png'
import iconEmail from '@/assets/icons/Frame 2147238356 (1).png'
import iconClock from '@/assets/icons/Frame 2147238356 (2).png'
import photo1 from '@/assets/Image (2).webp'
import photo2 from '@/assets/Image (3).webp'

/**
 * Rahbarlar API'dan (site-managers) olinadi. API bo'sh yoki 401 bo'lsa —
 * quyidagi statik zaxira ko'rsatiladi (sayt hech qachon "bo'sh" turmasin).
 */
const FALLBACK = [
	{
		id: 1,
		name: 'Shukurov Shuxrat Zokirjanovich',
		position:
			"O'zbekiston Respublikasi Milliy Statistika qo'mitasining Kadrlar malakasini oshirish va statistik tadqiqotlar instituti direktori",
		photo: photo1,
		phones: ['(71) 202-81-86', '(71) 267-16-03'],
		email: '',
		acceptance: 'Chorshanba - Juma, 15:00 - 16:00',
	},
	{
		id: 2,
		name: 'Abduvaliyev Abdulaziz Abduvaliyevich',
		position:
			"O'zbekiston Respublikasi Milliy Statistika qo'mitasining Kadrlar malakasini oshirish va statistik tadqiqotlar instituti direktorining ilmiy ishlar, innovatsiyalar va xalqaro aloqalar bo'yicha o'rinbosari",
		photo: photo2,
		phones: ['(71) 202-81-87'],
		email: 'a.abduvaliyev@instat.uz',
		acceptance: 'Chorshanba - Juma, 15:00 - 16:00',
	},
]

/** "(71) 202-81-86, (71) 267-16-03" -> ['(71) 202-81-86', '(71) 267-16-03'] */
const splitPhones = raw =>
	String(raw ?? '')
		.split(/[,;\n]/)
		.map(s => s.trim())
		.filter(Boolean)

/** API obyektini kartochka shakliga o'giradi. path bo'lmasa statik rasm zaxira. */
const mapManager = (m, lang, i) => ({
	id: m.id ?? i,
	name: m.full_name || FALLBACK[i]?.name || '',
	position: pickField(m, 'description', lang) || FALLBACK[i]?.position || '',
	photo: mediaUrl(m.path) || FALLBACK[i]?.photo || null,
	phones: splitPhones(m.phone_number),
	email: m.email || '',
	acceptance: m.acceptance || '',
})

const AvatarPlaceholder = () => (
	<div
		style={{
			width: '100%',
			height: '100%',
			background: 'rgba(225, 227, 235, 0.08)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '24px',
		}}
	>
		<svg width='64' height='64' viewBox='0 0 24 24' fill='none'>
			<circle cx='12' cy='8' r='4' fill='rgba(255,255,255,0.2)' />
			<path d='M4 20c0-4 3.6-7 8-7s8 3 8 7' stroke='rgba(255,255,255,0.2)' strokeWidth='1.5' strokeLinecap='round' />
		</svg>
	</div>
)

const TEXT_STYLE = {
	fontFamily: 'Inter Display, sans-serif',
	fontWeight: 500,
	fontSize: '18px',
	lineHeight: '24px',
	letterSpacing: '-0.01em',
	color: 'rgba(255, 255, 255, 1)',
}

const LeaderCard = ({ leader }) => {
	const { t } = useTranslation()

	return (
		<div
			className='flex flex-col gap-4 sm:flex-row sm:gap-6'
			style={{
				background: 'rgba(31, 37, 51, 1)',
				borderRadius: '24px',
				padding: '16px',
			}}
		>
			{/* Photo */}
			<div
				style={{
					width: '210px',
					minWidth: '210px',
					height: '267px',
					borderRadius: '24px',
					overflow: 'hidden',
					flexShrink: 0,
				}}
			>
				{leader.photo ? (
					<img
						src={leader.photo}
						alt={leader.name}
						style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }}
						loading='lazy'
						decoding='async'
					/>
				) : (
					<AvatarPlaceholder />
				)}
			</div>
			{/* Info */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
				<h3
					style={{
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 600,
						fontSize: '20px',
						lineHeight: '28px',
						letterSpacing: '-0.01em',
						color: 'rgba(255, 255, 255, 1)',
						margin: 0,
					}}
				>
					{leader.name}
				</h3>

				<p
					style={{
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 500,
						fontSize: '18px',
						lineHeight: '24px',
						letterSpacing: '-0.01em',
						color: 'rgba(var(--text-rgb),1)',
						margin: 0,
					}}
				>
					{leader.position}
				</p>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
					{leader.phones.length > 0 && (
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							<img src={iconPhone} alt='' style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} loading='lazy' decoding='async' />
							<span style={{ ...TEXT_STYLE, fontSize: '18px' }}>{t('pages.rahbariyat.tel')}</span>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
								{leader.phones.map(phone => (
									<a
										key={phone}
										href={`tel:${phone.replace(/\D/g, '')}`}
										style={{
											fontFamily: 'Inter Display, sans-serif',
											fontWeight: 500,
											fontSize: '18px',
											lineHeight: '24px',
											letterSpacing: '-0.01em',
											color: 'rgba(var(--blue-rgb),1)',
											textDecoration: 'underline',
										}}
									>
										{phone}
									</a>
								))}
							</div>
						</div>
					)}

					{leader.email && (
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							<img src={iconEmail} alt='' style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} loading='lazy' decoding='async' />
							<span style={{ ...TEXT_STYLE, fontSize: '18px' }}>{t('pages.rahbariyat.e_mail')}</span>
							<a
								href={`mailto:${leader.email}`}
								style={{
									fontFamily: 'Inter Display, sans-serif',
									fontWeight: 500,
									fontSize: '18px',
									lineHeight: '24px',
									letterSpacing: '-0.01em',
									color: 'rgba(var(--blue-rgb),1)',
									textDecoration: 'underline',
								}}
							>
								{leader.email}
							</a>
						</div>
					)}

					{leader.acceptance && (
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							<img src={iconClock} alt='' style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} loading='lazy' decoding='async' />
							<span style={{ ...TEXT_STYLE, fontSize: '18px' }}>
								{t('pages.rahbariyat.fuqarolarni_qabul_qilish')}{' '}
								<span style={{ color: 'rgba(var(--blue-rgb),1)' }}>{leader.acceptance}</span>
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

const Rahbariyat = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: managers } = useApiResource(getManagers)

	// API dan kelsa — o'shani, aks holda statik zaxirani ko'rsatamiz.
	const cards =
		managers && managers.length > 0 ? managers.map((m, i) => mapManager(m, lang, i)) : FALLBACK

	return (
		<>
		<div style={{ maxWidth: '900px', margin: '0 auto', padding: '59px 0 40px 0' }}>
			{/* Heading badge */}
			<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
				<span
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: '8px',
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
					{t('menu.about.title')}
				</span>
			</div>
			<h1 className='gradient-heading' style={{ marginBottom: '32px' }}>
				{t('menu.about.rahbariyat')}
			</h1>
			{/* General info */}
			<p style={{ ...TEXT_STYLE, marginBottom: '16px' }}>{t('pages.rahbariyat.institut_faoliyati_ozbekiston_respublika')}</p>
			<p style={{ ...TEXT_STYLE, marginBottom: '48px' }}>{t('pages.rahbariyat.institut_ozbekiston_respublikasi_milliy')}</p>
			{/* Leader cards */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
				{cards.map(leader => (
					<LeaderCard key={leader.id} leader={leader} />
				))}
			</div>
		</div>
		{/* Tuzilma sahifasidan ko'chirilgan Kontakt bloki (Biz bilan bog'laning + Manzil) */}
		<ContactSection />
		</>
	)
}

export default Rahbariyat
