import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgGlow from '@/assets/bgImg/Background (1).png'
import BlurWords from './shared/BlurWords'
import { Button2 } from './shared/Button2'
import BookCard from './ElektronKutubxona/BookCard'
import { books } from '../data/books.data'

const vp = { once: true, amount: 0.2 }

const ElektronKutubxona = () => {
	const navigate = useNavigate()
	const bgRef = useRef(null)
	const [bgVisible, setBgVisible] = useState(false)

	useEffect(() => {
		const el = bgRef.current?.parentElement
		if (!el) return
		const observer = new IntersectionObserver(
			([entry]) => setBgVisible(entry.isIntersecting),
			{ threshold: 0.05 },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
	<section
		style={{
			width: '100%',
			backgroundColor: 'rgba(14, 18, 27, 1)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			position: 'relative',
			overflow: 'hidden',
			paddingTop: '40px',
			paddingBottom: '80px',
		}}
	>
		<img
			ref={bgRef}
			src={bgGlow}
			alt=''
			aria-hidden='true'
			style={{
				position: 'absolute',
				top: 0,
				left: '50%',
				transform: 'translateX(-50%)',
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				objectPosition: 'center top',
				zIndex: 0,
				pointerEvents: 'none',
				opacity: bgVisible ? 1 : 0,
				transition: 'opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1)',
			}}
		/>

		{/* Header */}
		<div
			style={{
				position: 'relative',
				zIndex: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				textAlign: 'center',
				gap: '20px',
				maxWidth: '720px',
				padding: '0 24px',
				marginBottom: '56px',
			}}
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={vp}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			>
				<Button2 text='Elektron kutubxona' />
			</motion.div>

			<BlurWords
				text='Kitoblar katalogi'
				delay={0.1}
				step={0.08}
				style={{
					fontFamily: '"Inter Display", Inter, sans-serif',
					fontWeight: 600,
					fontSize: '48px',
					lineHeight: '58px',
					color: '#ffffff',
					display: 'block',
				}}
			/>

			<motion.p
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={vp}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
				style={{
					fontFamily: '"Inter Display", Inter, sans-serif',
					fontWeight: 400,
					fontSize: '16px',
					lineHeight: '140%',
					color: 'rgba(202, 202, 206, 1)',
					textAlign: 'center',
					margin: 0,
				}}
			>
				Platformamizdagi barcha elektron kitoblarni bir joyda kashf eting.
				Janr, reyting va narx bo'yicha saralab, o'zingizga mos asarni oson tanlang.
			</motion.p>
		</div>

		{/* Books grid */}
		<div style={{
			position: 'relative',
			zIndex: 1,
			width: '100%',
			maxWidth: '1200px',
			padding: '0 24px',
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			gap: '20px',
		}}>
			{books.map((book, i) => (
				<BookCard key={book.id} book={book} index={i} />
			))}
		</div>

		{/* Barchasini ko'rish */}
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={vp}
			transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
			style={{ position: 'relative', zIndex: 1, marginTop: '40px' }}
		>
			<button style={{
				height: '48px',
				padding: '0 28px',
				borderRadius: '12px',
				background: 'rgba(43, 117, 204, 1)',
				border: '1px solid transparent',
				outline: '1px solid rgba(28, 84, 148, 1)',
				boxShadow: '0px 2px 6px 0px rgba(255,255,255,0.25) inset, 0px -2px 4px 0px rgba(14,18,27,0.3) inset, 0px 16px 24px -8px rgba(14,18,27,0.1)',
				fontFamily: '"Inter Display", Inter, sans-serif',
				fontWeight: 600,
				fontSize: '16px',
				color: '#fff',
				cursor: 'pointer',
				whiteSpace: 'nowrap',
			}}
			onClick={() => navigate('/platform/raqamli-kutubxona')}
			>
				Barchasini ko'rish
			</button>
		</motion.div>
	</section>
	)
}

export default ElektronKutubxona
