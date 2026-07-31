import { useTranslation } from 'react-i18next'

/**
 * `toDoc` shaklidagi ro'yxatlar uchun umumiy ko'rinish:
 * `{ id, label, date, number, path }`.
 *
 * Shu shaklni bir nechta endpoint qaytaradi — site-events,
 * site-corruption-docs, site-corruption-works — shuning uchun kartochka
 * mantiqini bir joyda saqlaymiz.
 *
 * `path` bo'lsa yuklab olish havolasi chiqadi; rasm bo'lsa havola o'rniga
 * rasmning o'zi ko'rsatiladi (ContentPage dagi Attachment bilan bir xil qoida).
 */
const isImage = url => /\.(png|jpe?g|webp|gif|svg)$/i.test(url ?? '')

const DownloadLink = ({ path }) => {
	const { t } = useTranslation()
	return (
		<a
			href={path}
			target='_blank'
			rel='noopener noreferrer'
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 8,
				marginTop: 14,
				padding: '10px 18px',
				borderRadius: 10,
				border: '1px solid rgba(var(--blue-rgb),0.4)',
				background: 'rgba(var(--blue-rgb),0.1)',
				color: '#fff',
				textDecoration: 'none',
				fontSize: 14,
			}}
		>
			<svg width='17' height='17' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
				<path
					d='M12 3v12m0 0l-4-4m4 4l4-4M5 21h14'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
			{t('common.download')}
		</a>
	)
}

const DocList = ({ items }) => (
	<ul style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', margin: 0, padding: 0 }}>
		{items.map(item => {
			// `number` va `date` faqat hujjatlarda bo'ladi (PF-200 · 27.11.2023)
			const meta = [item.number, item.date].filter(Boolean).join(' · ')
			return (
				<li
					key={item.id}
					style={{
						background: 'rgba(var(--card-rgb),1)',
						border: '1px solid rgba(255,255,255,0.05)',
						borderRadius: 14,
						padding: '18px 22px',
					}}
				>
					{meta && (
						<p style={{ color: 'rgba(var(--blue-rgb),1)', fontSize: 13, margin: '0 0 8px', fontWeight: 500 }}>
							{meta}
						</p>
					)}
					{item.label && (
						<p style={{ color: '#fff', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{item.label}</p>
					)}
					{item.path &&
						(isImage(item.path) ? (
							<img
								src={item.path}
								alt={item.label ?? ''}
								loading='lazy'
								decoding='async'
								style={{ maxWidth: '100%', borderRadius: 10, marginTop: 14, display: 'block' }}
							/>
						) : (
							<DownloadLink path={item.path} />
						))}
				</li>
			)
		})}
	</ul>
)

export default DocList
