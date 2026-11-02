import { useEffect, useRef, useState } from 'react'

/** prefers-reduced-motion: reduce (sinxron boshlang'ich qiymat bilan — flicker yo'q). */
export const usePrefersReducedMotion = () => {
	const [rm] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
	return rm
}

/** Element ekranga kirganda true bo'ladi (once=true bo'lsa qaytib false bo'lmaydi). */
export const useInView = (options = {}, once = true) => {
	const ref = useRef(null)
	const [inView, setInView] = useState(false)
	useEffect(() => {
		const el = ref.current
		if (!el) return
		const io = new IntersectionObserver(([e]) => {
			if (e.isIntersecting) {
				setInView(true)
				if (once) io.disconnect()
			} else if (!once) setInView(false)
		}, options)
		io.observe(el)
		return () => io.disconnect()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return [ref, inView]
}

/** requestAnimationFrame sikli; `visibleRef.current` false bo'lsa kadr chizilmaydi. */
export const useRafLoop = (callback, deps = []) => {
	const cb = useRef(callback)
	cb.current = callback
	useEffect(() => {
		let raf
		const tick = t => {
			cb.current(t)
			raf = requestAnimationFrame(tick)
		}
		raf = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(raf)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)
}

/** Raqamni 0 dan `to` gacha silliq sanaydi (ease-out). */
export const useCountUp = (to, run, reduced) => {
	const [v, setV] = useState(0)
	useEffect(() => {
		if (!run || to == null || reduced) return
		let raf
		const t0 = performance.now()
		const step = t => {
			const p = Math.min(1, (t - t0) / 1600)
			setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
			if (p < 1) raf = requestAnimationFrame(step)
		}
		raf = requestAnimationFrame(step)
		return () => cancelAnimationFrame(raf)
	}, [to, run, reduced])
	return reduced && run && to != null ? to : v
}
