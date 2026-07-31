import { useEffect } from 'react'

function Particle({ x, y, dx, dy, color, onDone }) {
	useEffect(() => {
		const t = setTimeout(onDone, 700)
		return () => clearTimeout(t)
	}, [])
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width: 6,
				height: 6,
				borderRadius: '50%',
				background: color,
				pointerEvents: 'none',
				'--dx': `${dx}px`,
				'--dy': `${dy}px`,
				animation: 'ej_p .7s cubic-bezier(.22,1,.36,1) both',
			}}
		/>
	)
}

export default Particle
