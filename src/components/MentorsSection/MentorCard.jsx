import { memo, useRef, useState } from 'react'
import {
	motion, AnimatePresence,
	useMotionValue, useSpring, useTransform, useMotionTemplate,
} from 'framer-motion'
import insta from '../../assets/instagram-fill (1).png'
import facebook from '../../assets/Vector (1).png'
import twitter from '../../assets/twitter-x-line (1).png'
import { BASE_W, BASE_H, getCenterX } from './mentors.data'

const MentorCard = ({ mentor, cfg, trackW, dimScale = 1, isActive, onShift }) => {
	const w = BASE_W * cfg.scale * dimScale
	const h = BASE_H * cfg.scale * dimScale
	const cx = getCenterX(cfg, trackW / 2, dimScale)
	const cardRef = useRef(null)
	const [isHovered, setIsHovered] = useState(false)

	const mx = useMotionValue(0.5)
	const my = useMotionValue(0.5)
	const scaleBase = useMotionValue(1)

	const rotateX = useSpring(useTransform(my, [0, 1], [-14, 14]), { stiffness: 400, damping: 30 })
	const rotateY = useSpring(useTransform(mx, [0, 1], [14, -14]), { stiffness: 400, damping: 30 })
	const scale   = useSpring(scaleBase, { stiffness: 400, damping: 30 })

	const l1x = useTransform(mx, [0, 1], [14, -14])
	const l1y = useTransform(my, [0, 1], [14, -14])
	const l2x = useTransform(mx, [0, 1], [-11, 11])
	const l2y = useTransform(my, [0, 1], [-11, 11])

	const glowX  = useTransform(mx, v => `${v * 100}%`)
	const glowY  = useTransform(my, v => `${v * 100}%`)
	const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.18) 0%, transparent 50%)`

	const chromaticAngle = useTransform(rotateY, v => `${135 + v}deg`)
	const chromatic      = useMotionTemplate`linear-gradient(${chromaticAngle}, rgba(56,160,255,0.18) 0%, transparent 40%, transparent 60%, rgba(45,61,153,0.18) 100%)`

	const shineSkew = useTransform(rotateY, v => `skewY(${v * 0.25}deg)`)

	const handleMouseMove = e => {
		if (!isActive || !cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		mx.set((e.clientX - rect.left) / rect.width)
		my.set((e.clientY - rect.top) / rect.height)
	}

	const handleMouseEnter = () => {
		if (!isActive) return
		setIsHovered(true)
		scaleBase.set(1.07)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		mx.set(0.5)
		my.set(0.5)
		scaleBase.set(1)
	}

	return (
		<div
			onClick={() => !isActive && onShift(cfg.offset)}
			style={{
				position: 'absolute',
				width: w,
				height: h,
				left: cx - w / 2,
				top: '40%',
				transform: 'translateY(-50%)',
				zIndex: cfg.z,
				opacity: cfg.opacity,
				transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
				perspective: '800px',
			}}
		>
			<motion.div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{
					width: '100%',
					height: '100%',
					borderRadius: 24,
					overflow: 'hidden',
					transformStyle: 'preserve-3d',
					cursor: isActive ? 'default' : 'pointer',
					rotateX,
					rotateY,
					scale,
					boxShadow: isHovered
						? '0 60px 120px -20px rgba(0,0,0,1), 0 0 0 1.5px rgba(255,255,255,0.15), 0 0 100px rgba(43,117,204,0.4), inset 0 2px 0 rgba(255,255,255,0.2)'
						: isActive
						? '0 30px 60px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07)'
						: 'none',
					transition: 'box-shadow 0.4s ease',
				}}
			>
				<motion.div
					style={{
						x: l1x, y: l1y,
						width: '115%', height: '115%', marginLeft: '-7.5%', marginTop: '-7.5%',
						scale: isHovered ? 1.12 : 1,
						transition: 'scale 0.12s ease',
					}}
				>
					<img
						src={mentor.photo}
						alt={mentor.name}
						loading='lazy'
						decoding='async'
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							filter: isActive ? 'none' : 'grayscale(1) brightness(0.5)',
							transition: 'filter 0.5s ease',
						}}
					/>
				</motion.div>

				{isActive && (
					<motion.div
						style={{
							x: l2x, y: l2y,
							position: 'absolute',
							inset: '-15%',
							background: isHovered ? glowBg : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
							pointerEvents: 'none',
						}}
					/>
				)}

				{isActive && isHovered && (
					<motion.div
						style={{
							position: 'absolute', inset: 0, borderRadius: 24,
							background: chromatic,
							pointerEvents: 'none',
						}}
					/>
				)}

				{isActive && isHovered && (
					<motion.div
						animate={{ opacity: [0.3, 0.7, 0.3] }}
						transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
						style={{
							position: 'absolute', top: 0, left: 0, right: 0,
							height: '30%',
							background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 100%)',
							pointerEvents: 'none',
							transform: shineSkew,
						}}
					/>
				)}

				{isActive && (
					<div style={{
						position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
						background: 'linear-gradient(to top, rgba(14,18,27,0.7) 0%, transparent 100%)',
						pointerEvents: 'none',
					}} />
				)}

				{isActive && (
					<motion.div
						animate={isHovered ? { opacity: 1 } : { opacity: 0.4 }}
						transition={{ duration: 0.3 }}
						style={{
							position: 'absolute', inset: 0, borderRadius: 24,
							border: '1.5px solid rgba(255,255,255,0.12)',
							pointerEvents: 'none',
						}}
					/>
				)}
			</motion.div>

			<AnimatePresence mode='wait'>
				{isActive && (
					<motion.div
						key={mentor.name}
						initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
						animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
						exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
						transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
						style={{ position: 'absolute', top: '110%', left: 0, width: '100%', textAlign: 'center' }}
					>
						<motion.h3
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
							style={{ color: 'rgba(255,255,255,1)', fontSize: Math.max(14, 20 * dimScale), margin: '0 0 4px 0' }}
						>
							{mentor.name}
						</motion.h3>
						<motion.p
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
							style={{ color: 'rgba(188,188,188,1)', fontSize: Math.max(11, 15 * dimScale), margin: '0 0 4px 0' }}
						>
							{mentor.role}
						</motion.p>
						<motion.p
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: 0.19, ease: [0.16, 1, 0.3, 1] }}
							style={{ color: 'rgba(188,188,188,1)', fontSize: Math.max(10, 13 * dimScale), marginBottom: 15 }}
						>
							{mentor.exp}
						</motion.p>
						<motion.div
							initial={{ opacity: 0, scale: 0.85 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
							style={{ display: 'flex', justifyContent: 'center', gap: 15 }}
						>
							<a href='#' aria-label='Instagram'><img src={insta} alt='' aria-hidden='true' loading='lazy' decoding='async' /></a>
							<a href='#' aria-label='Facebook'><img src={facebook} alt='' aria-hidden='true' loading='lazy' decoding='async' /></a>
							<a href='#' aria-label='Twitter'><img src={twitter} alt='' aria-hidden='true' loading='lazy' decoding='async' /></a>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default memo(MentorCard)
