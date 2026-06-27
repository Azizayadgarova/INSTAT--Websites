import { motion } from 'framer-motion'

const BG = 'rgba(14,18,27,1)'
const vp = { once: true, amount: 0.18 }

export default function IshOrinlariCTA() {
	return (
		<section style={{ width: '100%', background: BG, padding: '80px 0 100px' }}>
			<div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={vp}
					transition={{ duration: 0.6 }}
					style={{
						background: 'rgba(17,22,34,1)',
						border: '1px solid rgba(43,117,204,0.25)',
						borderRadius: '24px',
						padding: 'clamp(40px, 5vw, 72px)',
						textAlign: 'center',
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					<div style={{
						position: 'absolute',
						top: '50%', left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '600px', height: '200px',
						background: 'radial-gradient(ellipse at center, rgba(0,230,252,0.1) 0%, transparent 70%)',
						filter: 'blur(40px)',
						pointerEvents: 'none',
					}} />

					<div style={{ position: 'relative', zIndex: 2 }}>
						<h2 style={{
							fontFamily: '"Inter Display",Inter,sans-serif',
							fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 42px)',
							color: '#fff', margin: '0 0 16px',
							letterSpacing: '-0.02em',
						}}>
							Mos lavozim topa olmadingizmi?
						</h2>
						<p style={{
							fontFamily: 'Inter,sans-serif',
							fontSize: '15px', color: 'rgba(188,188,188,1)',
							maxWidth: '480px', margin: '0 auto 36px',
							lineHeight: 1.75,
						}}>
							Rezyumeyingizni yuboring — biz yangi lavozimlar ochilganda siz bilan bog'lanamiz.
						</p>
						<div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
							<button
								style={{
									height: '48px', padding: '0 32px',
									borderRadius: '12px',
									background: 'rgba(43,117,204,1)',
									border: '1px solid rgba(255,255,255,0.15)',
									boxShadow: '0px 2px 6px 0px rgba(255,255,255,0.2) inset, 0px 0px 0px 1px rgba(28,84,148,1)',
									color: '#fff', fontSize: '14px', fontWeight: 600,
									fontFamily: '"Inter Display",Inter,sans-serif',
									cursor: 'pointer',
									transition: 'transform .2s, filter .2s',
								}}
								onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.filter = 'brightness(1.15)' }}
								onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.filter = 'brightness(1)' }}
							>
								Rezyume yuborish
							</button>
							<button
								style={{
									height: '48px', padding: '0 24px',
									borderRadius: '12px',
									background: 'rgba(31,37,51,1)',
									border: '1px solid rgba(255,255,255,0.08)',
									color: 'rgba(188,188,188,1)', fontSize: '14px', fontWeight: 500,
									fontFamily: '"Inter Display",Inter,sans-serif',
									cursor: 'pointer',
									transition: 'transform .2s, background .2s',
								}}
								onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(43,55,80,1)' }}
								onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.background = 'rgba(31,37,51,1)' }}
							>
								Bog'lanish
							</button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
