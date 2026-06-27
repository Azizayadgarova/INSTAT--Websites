import { motion, AnimatePresence } from 'framer-motion'
import alertIcon from '@/assets/icons/alert-line.png'
import deviceIcon from '@/assets/icons/device-line.png'
import timeIcon from '@/assets/icons/time-line.png'

const vp = { once: true, amount: 0.15 }
const LINE_COLOR = 'rgba(43,117,204,0.7)'
const LINE_GLOW = 'rgba(43,117,204,0.35)'

/* ── Chiziq bo'ylab harakat qiluvchi nur nuqtasi ── */
const TravelDot = ({ delay = 0, duration = 2.8, reverse = false }) => (
	<motion.div
		style={{
			position: 'absolute',
			top: '-2px',
			width: '5px',
			height: '5px',
			borderRadius: '50%',
			background: '#2B75CC',
			boxShadow: '0 0 10px 3px rgba(43,117,204,0.8)',
			pointerEvents: 'none',
			zIndex: 2,
		}}
		animate={{ left: reverse ? ['100%', '0%'] : ['0%', '100%'] }}
		transition={{ duration, delay, repeat: Infinity, repeatDelay: 1.2, ease: 'linear' }}
	/>
)

/* ── Vertikal chiziq bo'ylab harakat ── */
const VerticalDot = ({ delay = 0, reverse = false }) => (
	<motion.div
		style={{
			position: 'absolute',
			left: '-2px',
			width: '5px',
			height: '5px',
			borderRadius: '50%',
			background: '#2B75CC',
			boxShadow: '0 0 8px 2px rgba(43,117,204,0.7)',
			pointerEvents: 'none',
			zIndex: 2,
		}}
		animate={{ top: reverse ? ['100%', '0%'] : ['0%', '100%'] }}
		transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
	/>
)

/* ── Kartani kesib o'tuvchi scan chiziq ── */
const ScanLine = () => (
	<motion.div
		style={{
			position: 'absolute',
			left: '8%',
			right: '8%',
			height: '1px',
			background: 'linear-gradient(90deg, transparent 0%, rgba(43,117,204,0.4) 30%, rgba(43,117,204,0.9) 50%, rgba(43,117,204,0.4) 70%, transparent 100%)',
			boxShadow: '0 0 8px rgba(43,117,204,0.5)',
			borderRadius: '1px',
			pointerEvents: 'none',
			zIndex: 5,
		}}
		animate={{ top: ['8%', '92%'] }}
		transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', repeatDelay: 0.5 }}
	/>
)

const IconBox = ({ icon = deviceIcon, index = 0 }) => (
	<motion.div
		animate={{ boxShadow: ['0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)', '0 8px 24px rgba(0,0,0,0.5), 0 0 14px rgba(43,117,204,0.25), inset 0 1px 0 rgba(255,255,255,0.07)', '0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)'] }}
		transition={{ duration: 2.5, delay: index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
		style={{
			width: '62px', height: '62px', borderRadius: '14px',
			background: 'linear-gradient(145deg, rgba(20,26,42,1) 0%, rgba(11,15,25,1) 100%)',
			border: '1px solid rgba(255,255,255,0.06)',
			display: 'flex', alignItems: 'center', justifyContent: 'center',
			flexShrink: 0, position: 'relative',
		}}
	>
		{[{ top: 5, left: 5 }, { top: 5, right: 5 }, { bottom: 5, left: 5 }, { bottom: 5, right: 5 }].map((pos, i) => (
			<motion.div
				key={i}
				style={{
					position: 'absolute', width: '4px', height: '4px', borderRadius: '50%',
					background: 'rgba(43,117,204,0.5)', ...pos,
				}}
				animate={{ opacity: [0.2, 0.9, 0.2] }}
				transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 + i * 0.2, ease: 'easeInOut' }}
			/>
		))}
		<img src={icon} alt='' style={{ width: '26px', height: '26px', objectFit: 'contain', opacity: 0.9 }} />
	</motion.div>
)

const IconTreeRow = ({ icons, isTop }) => (
	<div style={{ width: '100%' }}>
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isTop ? 'flex-end' : 'flex-start' }}>
			{icons.map((icon, i) => (
				<div key={i} style={{ display: 'flex', flexDirection: isTop ? 'column' : 'column-reverse', alignItems: 'center' }}>
					<IconBox icon={icon} index={i} />
					{/* Vertikal chiziq */}
					<div style={{ width: '1px', height: '16px', background: LINE_COLOR, position: 'relative' }}>
						<VerticalDot delay={i * 0.5} reverse={!isTop} />
					</div>
				</div>
			))}
		</div>
		{/* Gorizontal chiziq */}
		<div style={{
			marginLeft: '31px', marginRight: '31px', height: '1px', position: 'relative',
			background: `linear-gradient(90deg, ${LINE_GLOW}, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, ${LINE_GLOW})`,
		}}>
			<TravelDot delay={0.2} reverse={!isTop} />
			<TravelDot delay={1.8} reverse={isTop} duration={3.2} />
		</div>
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div style={{
				width: '1px', height: '16px', position: 'relative',
				background: isTop ? `linear-gradient(180deg,${LINE_COLOR},${LINE_GLOW})` : `linear-gradient(0deg,${LINE_COLOR},${LINE_GLOW})`,
			}}>
				<VerticalDot delay={0.8} reverse={!isTop} />
			</div>
		</div>
	</div>
)

/* ── Layout 0 ── */
const Layout0 = () => (
	<div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
		<IconTreeRow icons={[alertIcon, deviceIcon, timeIcon]} isTop={true} />
		<div style={{
			width: '100%', padding: '2px', borderRadius: '7px', flexShrink: 0,
			background: 'linear-gradient(90deg, rgba(43,48,59,1) 0%, rgba(43,117,204,1) 50%, rgba(43,48,59,1) 100%)',
		}}>
			<div style={{
				width: '100%', borderRadius: '5px', backgroundColor: 'rgba(14,18,27,1)',
				padding: '10px', minHeight: '120px', display: 'flex', gap: '8px', boxSizing: 'border-box',
			}}>
				<motion.div
					style={{ width: '22%', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.04)', flexShrink: 0 }}
					animate={{ opacity: [0.04 / 0.04, 1.8, 1] }}
					transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
				/>
				<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
					<div style={{ display: 'flex', gap: '7px', flex: 1 }}>
						{[0, 1].map(i => (
							<motion.div
								key={i}
								style={{ flex: 1, borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.065)' }}
								animate={{ opacity: [1, 0.4, 1] }}
								transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
							/>
						))}
					</div>
					<motion.div
						style={{ flex: 1.4, borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.065)' }}
						animate={{ opacity: [1, 0.4, 1] }}
						transition={{ duration: 3, repeat: Infinity, delay: 0.9, ease: 'easeInOut' }}
					/>
				</div>
			</div>
		</div>
		<IconTreeRow icons={[deviceIcon, alertIcon, alertIcon]} isTop={false} />
	</div>
)

/* ── Layout 1 ── */
const Layout1 = () => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
		<div style={{
			display: 'flex', alignItems: 'center', gap: '8px',
			background: 'rgba(255,255,255,0.03)', borderRadius: '10px',
			padding: '10px 14px', border: '1px solid rgba(255,255,255,0.06)',
		}}>
			<motion.div
				style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(43,117,204,0.4)', flexShrink: 0 }}
				animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
				transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
			/>
			<div style={{ flex: 1, height: '7px', background: 'rgba(255,255,255,0.07)', borderRadius: '4px' }} />
			<motion.div
				style={{ width: '36px', height: '7px', background: 'rgba(43,117,204,0.35)', borderRadius: '4px', flexShrink: 0 }}
				animate={{ opacity: [0.35, 0.8, 0.35] }}
				transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
			/>
		</div>

		{[
			{ status: 'ok',      w: '65%', label: 'rgba(43,204,117,0.7)',  glow: 'rgba(43,204,117,0.35)',  bg: 'rgba(255,255,255,0.03)' },
			{ status: 'ok',      w: '78%', label: 'rgba(43,204,117,0.7)',  glow: 'rgba(43,204,117,0.35)',  bg: 'rgba(255,255,255,0.03)' },
			{ status: 'unknown', w: '52%', label: 'rgba(255,190,0,0.8)',   glow: 'rgba(255,190,0,0.4)',    bg: 'rgba(255,190,0,0.03)' },
		].map((row, i) => (
			<div key={i} style={{
				display: 'flex', gap: '10px', alignItems: 'center',
				padding: '10px 14px', borderRadius: '8px', flex: 1,
				background: row.bg,
				border: `1px solid ${row.status === 'unknown' ? 'rgba(255,190,0,0.1)' : 'rgba(255,255,255,0.05)'}`,
			}}>
				<div style={{ width: '30px', height: '38px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />
				<div style={{ flex: 1 }}>
					<div style={{ height: '7px', borderRadius: '3px', background: row.status === 'unknown' ? 'rgba(255,190,0,0.2)' : 'rgba(255,255,255,0.08)', width: row.w, marginBottom: '6px' }} />
					<div style={{ height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,0.04)', width: '40%' }} />
				</div>
				<motion.div
					style={{
						width: '9px', height: '9px', borderRadius: '50%', flexShrink: 0,
						background: row.label, boxShadow: `0 0 7px ${row.glow}`,
					}}
					animate={{ boxShadow: [`0 0 7px ${row.glow}`, `0 0 16px ${row.glow}`, `0 0 7px ${row.glow}`] }}
					transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
				/>
			</div>
		))}

		<div style={{
			display: 'flex', gap: '6px', alignItems: 'center',
			padding: '8px 14px', borderRadius: '8px',
			background: 'rgba(255,190,0,0.06)', border: '1px solid rgba(255,190,0,0.12)',
		}}>
			<motion.div
				style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,190,0,0.2)', border: '1px solid rgba(255,190,0,0.3)', flexShrink: 0 }}
				animate={{ scale: [1, 1.15, 1] }}
				transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
			/>
			<div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,190,0,0.2)' }} />
		</div>
	</div>
)

/* ── Layout 2 ── */
const Layout2 = () => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
		<div style={{ display: 'flex', gap: '12px', flex: 1.4 }}>
			<div style={{
				width: '80px', flexShrink: 0, borderRadius: '8px',
				background: 'linear-gradient(160deg, rgba(28,38,62,1) 0%, rgba(16,20,34,1) 100%)',
				border: '1px solid rgba(255,255,255,0.06)',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
			}}>
				<div style={{ width: '38px', height: '48px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }} />
			</div>
			<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px', justifyContent: 'center' }}>
				{[{ w: '82%' }, { w: '56%' }, { w: '40%' }].map((bar, i) => (
					<motion.div
						key={i}
						style={{ height: i === 0 ? '9px' : '6px', background: i === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)', borderRadius: '4px', width: bar.w }}
						animate={{ opacity: [1, 0.4, 1] }}
						transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
					/>
				))}
				<div style={{
					marginTop: '4px', padding: '5px 10px', borderRadius: '6px', width: 'fit-content',
					background: 'rgba(43,117,204,0.2)', border: '1px solid rgba(43,117,204,0.3)',
				}}>
					<motion.div
						style={{ height: '8px', width: '44px', background: 'rgba(43,117,204,0.55)', borderRadius: '3px' }}
						animate={{ opacity: [0.55, 1, 0.55] }}
						transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
					/>
				</div>
			</div>
		</div>

		<motion.div
			style={{
				padding: '10px 14px', borderRadius: '8px',
				background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.18)',
				display: 'flex', gap: '10px', alignItems: 'center',
			}}
			animate={{ borderColor: ['rgba(255,80,80,0.18)', 'rgba(255,80,80,0.45)', 'rgba(255,80,80,0.18)'] }}
			transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
		>
			<motion.div
				style={{
					width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
					background: 'rgba(255,80,80,0.18)', border: '1px solid rgba(255,80,80,0.3)',
					display: 'flex', alignItems: 'center', justifyContent: 'center',
				}}
				animate={{ scale: [1, 1.2, 1] }}
				transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
			>
				<div style={{ width: '8px', height: '8px', background: 'rgba(255,80,80,0.85)', borderRadius: '2px' }} />
			</motion.div>
			<div style={{ flex: 1 }}>
				<div style={{ height: '6px', background: 'rgba(255,80,80,0.28)', borderRadius: '3px', width: '72%', marginBottom: '5px' }} />
				<div style={{ height: '5px', background: 'rgba(255,80,80,0.14)', borderRadius: '3px', width: '90%' }} />
			</div>
		</motion.div>

		<div style={{ display: 'flex', gap: '8px' }}>
			<motion.div
				style={{ flex: 1, height: '32px', borderRadius: '7px', background: 'rgba(43,117,204,0.25)', border: '1px solid rgba(43,117,204,0.3)' }}
				animate={{ background: ['rgba(43,117,204,0.25)', 'rgba(43,117,204,0.45)', 'rgba(43,117,204,0.25)'] }}
				transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
			/>
			<div style={{ flex: 1, height: '32px', borderRadius: '7px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
		</div>
	</div>
)

const LAYOUTS = [Layout0, Layout1, Layout2]

const Diagram = ({ active = 0, direction = 1 }) => {
	const CurrLayout = LAYOUTS[active]

	return (
		<motion.div
			initial={{ opacity: 0, x: 40 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={vp}
			animate={{
				boxShadow: [
					'0 0 8px 1px rgba(43,117,204,0.10)',
					'0 0 28px 3px rgba(43,117,204,0.25)',
					'0 0 8px 1px rgba(43,117,204,0.10)',
				],
			}}
			transition={{
				opacity: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
				x: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
				boxShadow: { repeat: Infinity, duration: 4, ease: 'easeInOut', repeatDelay: 0.3 },
			}}
			style={{
				borderRadius: '24px',
				border: '1px solid rgba(43,117,204,0.2)',
				height: '100%',
				boxSizing: 'border-box',
				position: 'relative',
				perspective: '900px',
				perspectiveOrigin: 'center 60%',
				overflow: 'hidden',
			}}
		>
			<ScanLine />

			<AnimatePresence mode='wait' custom={direction}>
				<motion.div
					key={active}
					custom={direction}
					initial={(dir) => ({
						rotateX: dir > 0 ? 90 : -90,
						z: -120,
					})}
					animate={{
						rotateX: 0,
						z: 0,
						transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
					}}
					exit={(dir) => ({
						rotateX: dir > 0 ? -90 : 90,
						z: -120,
						transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45] },
					})}
					style={{
						position: 'absolute',
						inset: 0,
						backgroundColor: 'rgba(14, 18, 27, 1)',
						borderRadius: '22px',
						padding: '28px 24px',
						boxSizing: 'border-box',
						transformOrigin: 'center center',
						backfaceVisibility: 'hidden',
					}}
				>
					<CurrLayout />
				</motion.div>
			</AnimatePresence>
		</motion.div>
	)
}

export default Diagram
