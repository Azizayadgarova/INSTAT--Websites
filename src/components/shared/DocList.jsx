import { useState } from 'react'
import DocCard from './DocCard'
import FileDrawer from './FileDrawer'

/**
 * `toDoc` shaklidagi ro'yxatlar uchun umumiy ko'rinish:
 * `{ id, label, date, number, path }`.
 *
 * Shu shaklni bir nechta endpoint qaytaradi — site-events,
 * site-corruption-docs, site-corruption-works — shuning uchun kartochka
 * mantiqini bir joyda saqlaymiz.
 *
 * `path` bo'lsa ixcham hujjat kartasi (DocCard) chiqadi: "Yuklab olish" tugmasi bilan; rasm bo'lsa
 * havola o'rniga rasmning o'zi ko'rsatiladi (ContentPage dagi Attachment bilan bir xil qoida).
 * `previewable` bo'lsa PDF fayllar yonida "Oldindan ko'rish" tugmasi ham chiqadi
 * (PDF sahifadan chiqmasdan o'ng paneldagi iframe'da ochiladi).
 */
const isImage = url => /\.(png|jpe?g|webp|gif|svg)$/i.test(url ?? '')

const DocList = ({ items, previewable = false }) => {
	const [preview, setPreview] = useState(null)

	return (
		<>
			<ul style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', margin: 0, padding: 0 }}>
				{items.map(item => {
					// `number` va `date` faqat hujjatlarda bo'ladi (PF-200 · 27.11.2023)
					const meta = [item.number, item.date].filter(Boolean).join(' · ')
					// Rasm bo'lsa havola o'rniga rasmning o'zi; fayl bo'lsa hujjat kartasi; faylsiz yozuv — oddiy karta
					if (item.path && !isImage(item.path)) {
						return (
							<li key={item.id}>
								<DocCard
									compact
									heading='h3'
									kicker={meta}
									title={item.label}
									path={item.path}
									onPreview={previewable ? () => setPreview({ src: item.path, title: item.label }) : undefined}
								/>
							</li>
						)
					}
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
							{item.path && (
								<img
									src={item.path}
									alt={item.label ?? ''}
									loading='lazy'
									decoding='async'
									style={{ maxWidth: '100%', borderRadius: 10, marginTop: 14, display: 'block' }}
								/>
							)}
						</li>
					)
				})}
			</ul>
			{previewable && (
				<FileDrawer open={!!preview} onClose={() => setPreview(null)} title={preview?.title} src={preview?.src} />
			)}
		</>
	)
}

export default DocList
