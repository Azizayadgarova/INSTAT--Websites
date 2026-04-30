import { memo, useEffect, useRef, useState } from 'react'
import bg1 from '@/assets/bgImg/Background (1).png'
import ParticleBackground from './ParticleBackground'

const SectionBackground = memo(() => {
	const ref = useRef(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const el = ref.current?.parentElement
		if (!el) return
		const observer = new IntersectionObserver(
			([entry]) => setVisible(entry.isIntersecting),
			{ threshold: 0.05 },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
		<>
			<img
				ref={ref}
				src={bg1}
				alt=''
				aria-hidden='true'
				className='absolute top-0 left-0 w-full h-full object-cover pointer-events-none'
				style={{
					zIndex: 3,
					opacity: visible ? 1 : 0,
					transition: 'opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1)',
				}}
			/>
			<ParticleBackground
				count={100}
				height={650}
				opacity={0.8}
				color='255, 255, 255'
				zIndex={1}
			/>
		</>
	)
})

export default SectionBackground
