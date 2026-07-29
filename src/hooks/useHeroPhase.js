import { useEffect, useState } from 'react'

const KF = `
@keyframes ripple_btn { 0%{transform:scale(0);opacity:0.8} 100%{transform:scale(4);opacity:0} }
`

export function useHeroPhase() {
	const [phase, setPhase] = useState(0)

	useEffect(() => {
		const el = document.createElement('style')
		el.setAttribute('data-hero-kf', '1')
		if (!document.querySelector('[data-hero-kf]')) {
			el.textContent = KF
			document.head.appendChild(el)
		}
		return () => { if (document.head.contains(el)) document.head.removeChild(el) }
	}, [])

	useEffect(() => {
		const ts = [
			setTimeout(() => setPhase(1), 120),
			setTimeout(() => setPhase(2), 380),
			setTimeout(() => setPhase(3), 620),
			setTimeout(() => setPhase(4), 850),
		]
		return () => ts.forEach(clearTimeout)
	}, [])

	const show = (n) => ({
		opacity:   phase >= n ? 1 : 0,
		transform: phase >= n ? 'translateY(0)' : 'translateY(28px)',
		transition: 'opacity 0.75s cubic-bezier(.16,1,.3,1), transform 0.75s cubic-bezier(.16,1,.3,1)',
	})

	return { show }
}
