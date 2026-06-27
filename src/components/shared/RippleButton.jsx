import { useRef, useState } from 'react'

export default function RippleButton({ children, style, onMouseEnter, onMouseLeave, onClick }) {
	const [ripples, setRipples] = useState([])
	const rid = useRef(0)

	const handleClick = (e) => {
		const r  = e.currentTarget.getBoundingClientRect()
		const id = ++rid.current
		setRipples(p => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
		setTimeout(() => setRipples(p => p.filter(x => x.id !== id)), 700)
		onClick?.(e)
	}

	return (
		<button
			onClick={handleClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={{ position: 'relative', overflow: 'hidden', ...style }}
		>
			{children}
			{ripples.map(r => (
				<span key={r.id} style={{
					position: 'absolute', left: r.x - 10, top: r.y - 10,
					width: 20, height: 20, borderRadius: '50%',
					background: 'rgba(255,255,255,0.4)', pointerEvents: 'none',
					animation: 'ripple_btn 0.7s ease-out both',
				}} />
			))}
		</button>
	)
}
