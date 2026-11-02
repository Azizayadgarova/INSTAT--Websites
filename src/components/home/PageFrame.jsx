import { useEffect, useState } from 'react'

import { useMenuState } from '@/context/MenuContext'
import HomeFooter from './HomeFooter'
import HomeNav from './HomeNav'
import { usePrefersReducedMotion } from './hooks'
import './home.css'
import './page.css'

/**
 * Yangi dizaynning umumiy qobig'i: tepa navigatsiya + to'liq ekranli menyu + footer.
 * Bosh sahifa ham, menyu bo'limlari (Institut haqida, O'quv faoliyati ...) ham shu qobiqda.
 * Stillar `.home` ostida izolyatsiya qilingan (home.css / page.css).
 *
 * `children` — tugun yoki `({ ready }) => tugun` funksiyasi (ready: birinchi kadrdan keyin true).
 */
export default function PageFrame({ children }) {
	const rm = usePrefersReducedMotion()
	const { isOpen } = useMenuState()
	const [ready, setReady] = useState(false)

	useEffect(() => {
		const id = requestAnimationFrame(() => setReady(true))
		return () => cancelAnimationFrame(id)
	}, [])

	return (
		<div className={`home js${ready ? ' ready' : ''}${rm ? ' rm' : ''}${isOpen ? ' mopen' : ''}`}>
			<svg width='0' height='0' style={{ position: 'absolute' }} aria-hidden='true'>
				<defs>
					<linearGradient id='glowGrad' x1='100%' y1='0' x2='0' y2='0'>
						<stop offset='20%' stopColor='#69AAFB' />
						<stop offset='80%' stopColor='#27425C' stopOpacity='0' />
					</linearGradient>
				</defs>
			</svg>
			<HomeNav />
			{typeof children === 'function' ? children({ ready }) : children}
			<HomeFooter />
		</div>
	)
}
