import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/** O'ngdan chiqadigan keng panel: fayl sahifadan chiqmasdan iframe ichida ochiladi. */
const FileDrawer = ({ open, onClose, title, src }) => {
	const { t } = useTranslation()

	useEffect(() => {
		if (!open) return
		const onKey = e => e.key === 'Escape' && onClose()
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKey)
		return () => {
			document.body.style.overflow = prevOverflow
			window.removeEventListener('keydown', onKey)
		}
	}, [open, onClose])

	return (
		<>
			<div
				onClick={onClose}
				style={{
					position: 'fixed',
					inset: 0,
					background: 'rgba(0,0,0,0.6)',
					opacity: open ? 1 : 0,
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity .25s',
					zIndex: 1000,
				}}
			/>
			<aside
				role='dialog'
				aria-modal='true'
				aria-hidden={!open}
				style={{
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					width: 'min(1100px, 100%)',
					background: 'rgba(var(--card-rgb),1)',
					transform: open ? 'translateX(0)' : 'translateX(100%)',
					transition: 'transform .3s ease',
					zIndex: 1001,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
					<p style={{ flex: 1, minWidth: 0, margin: 0, color: '#fff', fontSize: '14px', lineHeight: 1.6, fontFamily: 'var(--font-display)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</p>
					<a
						href={src}
						target='_blank'
						rel='noopener noreferrer'
						style={{ color: 'rgba(var(--blue-rgb),1)', fontSize: '13px', fontFamily: 'var(--font-display)', textDecoration: 'none', whiteSpace: 'nowrap' }}
					>
						{t('pages.maqolaDetail.yangi_tabda', 'Yangi tabda ochish')}
					</a>
					<button
						type='button'
						onClick={onClose}
						aria-label={t('pages.maqolaDetail.yopish', 'Yopish')}
						style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}
					>
						×
					</button>
				</div>
				{open && <iframe src={src} title={title} style={{ flex: 1, width: '100%', border: 'none', background: '#fff' }} />}
			</aside>
		</>
	)
}

export default FileDrawer
