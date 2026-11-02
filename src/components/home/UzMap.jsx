import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { REG, buildDotMap, fitCanvas } from './geo'
import { usePrefersReducedMotion } from './hooks'

/** Hududlar bo'ylab aylanuvchi nuqtali O'zbekiston xaritasi (canvas). */
export default function UzMap() {
	const { t } = useTranslation()
	const rm = usePrefersReducedMotion()
	const regions = t('home.r', { returnObjects: true })
	const regionNames = Array.isArray(regions) ? regions : []

	const wrapRef = useRef(null)
	const canvasRef = useRef(null)
	const s = useRef({ W: 0, H: 0, dots: [], pts: [], ctx: null, regIdx: 0, hoverIdx: -1, last: 0, visible: true })

	const [regIdx, setRegIdx] = useState(0)
	const [shownIdx, setShownIdx] = useState(0)
	const [fade, setFade] = useState(1)
	const [tip, setTip] = useState(null)

	// Hudud nomi o'zgarganda matn avval so'nadi, keyin almashadi
	const fadeTimer = useRef(null)
	const goRegion = useCallback(idx => {
		setRegIdx(idx)
		setFade(0)
		clearTimeout(fadeTimer.current)
		fadeTimer.current = setTimeout(() => {
			setShownIdx(idx)
			setFade(1)
		}, 200)
	}, [])
	useEffect(() => () => clearTimeout(fadeTimer.current), [])

	const init = useCallback(() => {
		const canvas = canvasRef.current
		if (!canvas || !canvas.clientWidth) return
		const { ctx, W, H } = fitCanvas(canvas)
		const { proj, dots } = buildDotMap(W, H, { pad: [60, 56], step: W < 480 ? 6 : 7, yShift: -8, withRandom: true })
		Object.assign(s.current, { W, H, ctx, dots, pts: REG.map(g => proj(g[0], g[1])) })
	}, [])

	const draw = useCallback(
		time => {
			const { ctx, W, H, dots, pts, regIdx: ri, hoverIdx } = s.current
			if (!ctx || !pts.length) return
			ctx.clearRect(0, 0, W, H)
			const act = hoverIdx >= 0 ? hoverIdx : ri
			const [rx, ry] = pts[act]
			const [tx, ty] = pts[0]
			for (const p of dots) {
				const d = Math.hypot(p[0] - rx, p[1] - ry)
				const near = Math.max(0, 1 - d / 70)
				ctx.globalAlpha = 0.4 + p[2] * 0.18 + near * 0.42
				ctx.fillStyle = near > 0.25 ? '#00E6FC' : '#3d86d8'
				ctx.fillRect(p[0] - 1.1, p[1] - 1.1, 2.3, 2.3)
			}
			ctx.globalAlpha = 1
			pts.forEach(([x, y], i) => {
				if (!i) return
				const on = i === act
				ctx.strokeStyle = on ? 'rgba(0,230,252,.75)' : 'rgba(105,170,251,.13)'
				ctx.lineWidth = on ? 1.4 : 1
				ctx.beginPath()
				ctx.moveTo(x, y)
				ctx.quadraticCurveTo((x + tx) / 2, Math.min(y, ty) - 28, tx, ty)
				ctx.stroke()
			})
			pts.forEach(([x, y], i) => {
				ctx.fillStyle = i === act ? '#00E6FC' : '#a9cdf2'
				ctx.beginPath()
				ctx.arc(x, y, i === act ? 4 : 2.6, 0, 7)
				ctx.fill()
			})
			if (!rm) {
				const ph = (time % 2600) / 2600
				ctx.strokeStyle = '#00E6FC'
				ctx.globalAlpha = 1 - ph
				ctx.lineWidth = 1.2
				ctx.beginPath()
				ctx.arc(rx, ry, 5 + ph * 22, 0, 7)
				ctx.stroke()
				ctx.globalAlpha = 1
			}
			ctx.fillStyle = '#fff'
			ctx.beginPath()
			ctx.arc(tx, ty, 3, 0, 7)
			ctx.fill()
		},
		[rm],
	)

	useEffect(() => {
		init()
		draw(0)
		const ro = new ResizeObserver(() => {
			init()
			draw(0)
		})
		ro.observe(canvasRef.current)
		const io = new IntersectionObserver(([e]) => (s.current.visible = e.isIntersecting))
		io.observe(wrapRef.current)

		let raf
		const loop = t => {
			const st = s.current
			if (st.visible && !rm) {
				draw(t)
				if (st.hoverIdx < 0 && t - st.last > 2800) {
					st.last = t
					st.regIdx = (st.regIdx + 1) % REG.length
					goRegion(st.regIdx)
				}
			}
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)
		return () => {
			cancelAnimationFrame(raf)
			ro.disconnect()
			io.disconnect()
		}
	}, [init, draw, rm, goRegion])

	const onMove = e => {
		const r = canvasRef.current.getBoundingClientRect()
		const x = e.clientX - r.left
		const y = e.clientY - r.top
		let best = -1
		let bd = 22
		s.current.pts.forEach(([px, py], i) => {
			const d = Math.hypot(px - x, py - y)
			if (d < bd) {
				bd = d
				best = i
			}
		})
		s.current.hoverIdx = best
		setTip(best >= 0 ? { i: best, x: s.current.pts[best][0], y: s.current.pts[best][1] } : null)
	}
	const onLeave = () => {
		s.current.hoverIdx = -1
		setTip(null)
	}
	const onClick = () => {
		const { hoverIdx } = s.current
		if (hoverIdx >= 0) {
			s.current.regIdx = hoverIdx
			s.current.last = performance.now()
			goRegion(hoverIdx)
		}
	}

	return (
		<div
			className='p-map'
			id='pMap'
			ref={wrapRef}
			style={{ cursor: tip ? 'pointer' : '' }}
			onPointerMove={onMove}
			onPointerLeave={onLeave}
			onClick={onClick}
		>
			<canvas ref={canvasRef} role='img' aria-label={`${t('home.uz')}, ${t('home.regions')}`} />
			<div className={`tip${tip ? ' on' : ''}`} style={tip ? { left: tip.x, top: tip.y } : undefined}>
				{tip ? regionNames[tip.i] : ''}
			</div>
			<div className='p-reg'>
				<span>{t('home.region')}</span>
				<b style={{ opacity: fade }}>{regionNames[shownIdx]}</b>
			</div>
			<div className='p-idx'>
				<b>{String(regIdx + 1).padStart(2, '0')}</b> / 14
			</div>
		</div>
	)
}
