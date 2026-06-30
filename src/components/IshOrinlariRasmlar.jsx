import { useEffect, useRef, useState } from 'react'
import img1 from '@/assets/Group 1707483863.png'
import img2 from '@/assets/icons/Union (1).png'

const CARDS = [
	{
		title: 'Arizani tez yuboring',
		desc: 'Tanlagan ishga bir necha klik bilan ariza yuboring va vaqtni tejang.',
	},
	{
		title: 'Profilingizni kuchli qiling',
		desc: "Profilingizni to'liq to'ldiring va ish beruvchiga o'zingizni eng yaxshi tarzda ko'rsating.",
	},
	{
		title: 'Tezkor bildirishnomalar',
		desc: "Yangi vakansiyalar va ariza holati haqida darhol xabardor bo'ling.",
	},
	{
		title: 'Karyerangizni tez rivojlantiring',
		desc: "Firma vakansiyalari bilan tanishing va karyerangizni samarali rivojlantiring.",
	},
]

const Card = ({ title, desc, index, visible }) => (
	<div
		style={{
			background: 'rgba(var(--card-rgb),1)',
			borderRadius: '20px',
			padding: '64px 24px 24px',
			display: 'flex',
			flexDirection: 'column',
			gap: '8px',
			boxSizing: 'border-box',
			opacity: visible ? 1 : 0,
			transform: visible ? 'translateY(0px)' : 'translateY(36px)',
			transition: `opacity 0.6s ease ${0.15 + index * 0.12}s, transform 0.6s ease ${0.15 + index * 0.12}s`,
		}}
	>
		<h4
			style={{
				fontFamily: 'var(--font-display)',
				fontWeight: 500,
				fontSize: '32px',
				lineHeight: '40px',
				letterSpacing: '0%',
				color: 'rgba(255,255,255,1)',
				margin: 0,
			}}
		>
			{title}
		</h4>
		<p
			style={{
				fontFamily: 'var(--font-display)',
				fontWeight: 500,
				fontSize: '18px',
				lineHeight: '24px',
				letterSpacing: '0%',
				color: 'rgba(var(--text-rgb),1)',
				margin: 0,
			}}
		>
			{desc}
		</p>
	</div>
)

const IshOrinlariRasmlar = () => {
	const sectionRef = useRef(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.12 },
		)
		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section
			ref={sectionRef}
			style={{
				width: '100%',
				maxWidth: '1440px',
				margin: '0 auto',
				background: 'rgba(var(--bg-rgb),1)',
				boxSizing: 'border-box',
				padding: '40px 120px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: '24px',
			}}
		>
			{/* Chap karta — chapdan siljib keladi */}
			<div
				style={{
					position: 'relative',
					width: '552px',
					height: '520px',
					flexShrink: 0,
					borderRadius: '20px',
					overflow: 'hidden',
					opacity: visible ? 1 : 0,
					transform: visible ? 'translateX(0px)' : 'translateX(-50px)',
					transition: 'opacity 0.7s ease 0s, transform 0.7s ease 0s',
				}}
			>
				<img
					src={img1}
					alt=''
					fetchpriority='high'
					loading='eager'
					style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
				/>
				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 0,
						padding: '0 32px 32px',
						display: 'flex',
						flexDirection: 'column',
						gap: '12px',
					}}
				>
					<h3
						style={{
							fontFamily: 'var(--font-display)',
							fontWeight: 500,
							fontSize: '32px',
							lineHeight: '40px',
							letterSpacing: '0%',
							color: 'rgba(255,255,255,1)',
							margin: 0,
						}}
					>
						Mos vakansiyalarni tez toping
					</h3>
					<p
						style={{
							fontFamily: 'var(--font-display)',
							fontWeight: 500,
							fontSize: '18px',
							lineHeight: '24px',
							letterSpacing: '0%',
							color: 'rgba(202,202,206,1)',
							margin: 0,
						}}
					>
						Sizning qiziqishlaringiz, ko'nikmalaringiz va tajribangizga mos
						keladigan firma vakansiyalarini bir necha soniya ichida toping. Bu
						platforma ortiqcha qidiruvsiz, aniq va dolzarb ishlarni ko'rish
						imkonini beradi.
					</p>
				</div>
			</div>

			{/* O'ng kartalar — pastdan ketma-ket chiqadi */}
			<div style={{ position: 'relative', width: '624px', height: '520px', flexShrink: 0 }}>
				<img
					src={img2}
					alt=''
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						zIndex: 0,
						pointerEvents: 'none',
					}}
				/>
				<div
					style={{
						position: 'relative',
						zIndex: 1,
						width: '100%',
						height: '100%',
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gridTemplateRows: '1fr 1fr',
						gap: '24px',
					}}
				>
					{CARDS.map((c, i) => (
						<Card key={c.title} title={c.title} desc={c.desc} index={i} visible={visible} />
					))}
				</div>
			</div>
		</section>
	)
}

export default IshOrinlariRasmlar
