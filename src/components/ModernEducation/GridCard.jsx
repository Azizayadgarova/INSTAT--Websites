import { useRef, useState, useEffect } from 'react'

function useInView(threshold = 0.2) {
	const ref = useRef(null)
	const [inView, setInView] = useState(false)
	useEffect(() => {
		const el = ref.current
		if (!el) return
		const obs = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
			{ threshold }
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [threshold])
	return [ref, inView]
}

export default function GridCard({ card, index }) {
	const [ref, inView] = useInView(0.15)
	const isEven = index % 2 === 0

	return (
		<div
			ref={ref}
			style={{
				opacity: inView ? 1 : 0,
				transform: inView ? 'translateY(0)' : 'translateY(48px)',
				transition: `opacity 0.8s ease ${index * 0.08}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
			}}
			className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 py-12 max-w-[1200px] mx-auto px-4 md:px-8`}
		>
			<div className='w-full md:w-[55%] shrink-0'>
				<img
					src={card.img}
					alt={card.title}
					loading='lazy'
					decoding='async'
					style={{
						width: '620px',
						height: '400px',
						borderRadius: '20px',
						opacity: 1,
						objectFit: 'cover',
						boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
					}}
				/>
			</div>

			<div className='w-full md:w-[45%] flex flex-col gap-4'>
				<h3 className='text-white font-semibold leading-tight tracking-tight' style={{ fontSize: '36px' }}>
					{card.title}{card.highlight}
				</h3>
				<p className='text-white/60 leading-relaxed' style={{ fontSize: '18px' }}>
					{card.description}
				</p>
			</div>
		</div>
	)
}
