import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const PageIntro = () => {
	const [done, setDone] = useState(false)
	if (done) return null

	return (
		<AnimatePresence>
			<motion.div
				key='intro-overlay'
				initial={{ opacity: 1 }}
				animate={{ opacity: 0 }}
				transition={{ duration: 0.9, delay: 1.5, ease: 'easeInOut' }}
				onAnimationComplete={() => setDone(true)}
				style={{
					position: 'fixed',
					inset: 0,
					zIndex: 9999,
					background: 'rgba(14,18,27,1)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'none',
					overflow: 'hidden',
				}}
			>
				{/* 1. Tashqi keng halqa to'lqini */}
				<motion.div
					initial={{ scale: 0, opacity: 0.7 }}
					animate={{ scale: 7, opacity: 0 }}
					transition={{ duration: 2.0, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
					style={{
						position: 'absolute',
						width: 280,
						height: 280,
						borderRadius: '50%',
						border: '1px solid rgba(0,230,252,0.25)',
					}}
				/>
				{/* 2. O'rta halqa */}
				<motion.div
					initial={{ scale: 0, opacity: 0.9 }}
					animate={{ scale: 5, opacity: 0 }}
					transition={{ duration: 1.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
					style={{
						position: 'absolute',
						width: 180,
						height: 180,
						borderRadius: '50%',
						border: '1.5px solid rgba(43,117,204,0.45)',
					}}
				/>
				{/* 3. Ichki halqa */}
				<motion.div
					initial={{ scale: 0, opacity: 1 }}
					animate={{ scale: 3, opacity: 0 }}
					transition={{ duration: 1.2, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
					style={{
						position: 'absolute',
						width: 100,
						height: 100,
						borderRadius: '50%',
						border: '2px solid rgba(0,230,252,0.7)',
					}}
				/>
				{/* 4. Katta glow burst */}
				<motion.div
					initial={{ scale: 0.05, opacity: 0 }}
					animate={{ scale: 4.5, opacity: [0, 0.95, 0] }}
					transition={{ duration: 1.8, delay: 0.05, ease: 'easeOut' }}
					style={{
						position: 'absolute',
						width: 360,
						height: 360,
						borderRadius: '50%',
						background:
							'radial-gradient(circle, rgba(0,230,252,0.45) 0%, rgba(43,117,204,0.18) 45%, transparent 70%)',
						filter: 'blur(28px)',
					}}
				/>
				{/* 5. Yorqin yadro */}
				<motion.div
					initial={{ scale: 0, opacity: 1 }}
					animate={{ scale: 2.5, opacity: 0 }}
					transition={{ duration: 0.9, delay: 0.18, ease: 'easeOut' }}
					style={{
						position: 'absolute',
						width: 90,
						height: 90,
						borderRadius: '50%',
						background:
							'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(0,230,252,0.7) 35%, transparent 70%)',
						filter: 'blur(6px)',
					}}
				/>
				{/* 6. Flash impulsi — o'ta yorqin */}
				<motion.div
					initial={{ opacity: 0.6 }}
					animate={{ opacity: 0 }}
					transition={{ duration: 0.35, delay: 0.18 }}
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(circle at center, rgba(0,230,252,0.12) 0%, transparent 60%)',
					}}
				/>
			</motion.div>
		</AnimatePresence>
	)
}

export default PageIntro
