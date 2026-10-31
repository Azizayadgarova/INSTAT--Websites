/** Yangiliklar ro'yxati va alohida sahifasi uchun umumiy kichik qismlar. */

/** created_at (ISO) -> 23.01.2026. Sana bo'lmasa bo'sh qator. */
export const formatPostDate = iso => {
	if (!iso) return ''
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	const p = n => String(n).padStart(2, '0')
	return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`
}

/** HTML matndan oddiy qisqa matn (kartochkadagi tavsif uchun). */
export const htmlToExcerpt = (html, max = 160) => {
	if (!html) return ''
	const text = new DOMParser().parseFromString(html, 'text/html').body.textContent ?? ''
	const clean = text.replace(/\s+/g, ' ').trim()
	return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean
}

/** Sahifa boshidagi "Yangiliklar" yorlig'i */
export const Badge = ({ children }) => (
	<span
		style={{
			display: 'inline-block',
			padding: '6px 14px',
			borderRadius: 8,
			background: 'rgba(255,255,255,0.05)',
			border: '1px solid rgba(255,255,255,0.08)',
			color: '#fff',
			fontFamily: 'var(--font-display)',
			fontSize: 13,
			lineHeight: '20px',
			letterSpacing: '-0.01em',
		}}
	>
		{children}
	</span>
)

/** Rasm bo'lmaganda ham panjara buzilmasin — o'sha o'lchamdagi neytral joy */
export const Thumb = ({ src, radius = 12, aspect = '16 / 10' }) => (
	<div
		style={{
			width: '100%',
			aspectRatio: aspect,
			borderRadius: radius,
			overflow: 'hidden',
			background: 'rgba(255,255,255,0.04)',
			flexShrink: 0,
		}}
	>
		{src && (
			<img
				src={src}
				alt=''
				loading='lazy'
				decoding='async'
				style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
			/>
		)}
	</div>
)
