import { useEffect, useRef } from 'react'

const ScrollBar = () => {
	const barRef = useRef(null)

	useEffect(() => {
		const bar = barRef.current
		if (!bar) return
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight
			bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<div
			ref={barRef}
			aria-hidden='true'
			style={{
				position: 'fixed',
				top: 0, left: 0, right: 0,
				height: '2px',
				background: 'linear-gradient(90deg, rgba(43,117,204,1), rgba(0,230,252,1))',
				transformOrigin: '0%',
				transform: 'scaleX(0)',
				zIndex: 9999,
				pointerEvents: 'none',
				willChange: 'transform',
			}}
		/>
	)
}

export default ScrollBar
