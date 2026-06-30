import { useEffect, useRef } from 'react'
import heroBg from '@/assets/bgImg/hero 2.png'

export default function WaterCanvas() {
	const canvasRef = useRef(null)
	const rafRef    = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d', { willReadFrequently: true })

		const SCALE = 0.75
		let W, H, buf1, buf2, srcPixels, outImg, alive = true

		const init = (img) => {
			W = Math.round(canvas.offsetWidth  * SCALE)
			H = Math.round(canvas.offsetHeight * SCALE)
			canvas.width  = W
			canvas.height = H
			const off = document.createElement('canvas')
			off.width = W; off.height = H
			const octx = off.getContext('2d')
			octx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight * 0.8, 0, 0, W, H)
			srcPixels = octx.getImageData(0, 0, W, H).data.slice()
			buf1   = new Int16Array(W * H)
			buf2   = new Int16Array(W * H)
			outImg = ctx.createImageData(W, H)
		}

		const disturb = (px, py, str = 600) => {
			const ix = Math.round(px * SCALE)
			const iy = Math.round(py * SCALE)
			const R  = 6
			for (let dy = -R; dy <= R; dy++) {
				for (let dx = -R; dx <= R; dx++) {
					const nx = ix + dx, ny = iy + dy
					if (nx > 0 && nx < W - 1 && ny > 0 && ny < H - 1) buf1[ny * W + nx] = str
				}
			}
		}

		const loop = () => {
			if (!alive || !W) { rafRef.current = requestAnimationFrame(loop); return }
			for (let y = 1; y < H - 1; y++) {
				for (let x = 1; x < W - 1; x++) {
					const i = y * W + x
					buf2[i]  = ((buf1[i-1] + buf1[i+1] + buf1[i-W] + buf1[i+W]) >> 1) - buf2[i]
					buf2[i] -= buf2[i] >> 6
				}
			}
			const tmp = buf1; buf1 = buf2; buf2 = tmp
			const dst = outImg.data
			for (let y = 1; y < H - 1; y++) {
				for (let x = 1; x < W - 1; x++) {
					const i  = y * W + x
					const dx = buf1[i-1] - buf1[i+1]
					const dy = buf1[i-W] - buf1[i+W]
					const ca = Math.min(Math.abs(buf1[i]) >> 3, 4)
					let sxR = x + dx - ca, syR = y + dy
					let sxG = x + dx,      syG = y + dy
					let sxB = x + dx + ca, syB = y + dy
					if (sxR < 0) sxR = 0; if (sxR >= W) sxR = W - 1
					if (syR < 0) syR = 0; if (syR >= H) syR = H - 1
					if (sxG < 0) sxG = 0; if (sxG >= W) sxG = W - 1
					if (syG < 0) syG = 0; if (syG >= H) syG = H - 1
					if (sxB < 0) sxB = 0; if (sxB >= W) sxB = W - 1
					if (syB < 0) syB = 0; if (syB >= H) syB = H - 1
					const di  = i * 4
					dst[di]   = srcPixels[(syR * W + sxR) * 4]
					dst[di+1] = srcPixels[(syG * W + sxG) * 4 + 1]
					dst[di+2] = srcPixels[(syB * W + sxB) * 4 + 2]
					dst[di+3] = 255
				}
			}
			ctx.putImageData(outImg, 0, 0)
			rafRef.current = requestAnimationFrame(loop)
		}

		const img = new Image()
		img.onload = () => { init(img); rafRef.current = requestAnimationFrame(loop) }
		img.src    = heroBg

		const onMove = (e) => {
			if (!W) return
			const r = canvas.getBoundingClientRect()
			disturb(e.clientX - r.left, e.clientY - r.top, 600)
		}
		canvas.addEventListener('mousemove', onMove)

		const obs = new IntersectionObserver(([entry]) => { alive = entry.isIntersecting }, { threshold: 0.1 })
		obs.observe(canvas)

		return () => {
			alive = false
			cancelAnimationFrame(rafRef.current)
			canvas.removeEventListener('mousemove', onMove)
			obs.disconnect()
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, imageRendering: 'auto' }}
		/>
	)
}
