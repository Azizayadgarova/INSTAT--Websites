import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function IntroAnimation() {
  const [phase, setPhase] = useState(() =>
    sessionStorage.getItem('instat_v4') ? 'done' : 'show'
  )
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (phase === 'done') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const FL = 400                  // focal length
    const TOTAL_MS = 3200           // total before iris

    // Create 200 stars in 3D space
    const mkStar = () => ({
      x: (Math.random() - 0.5) * W * 3.5,
      y: (Math.random() - 0.5) * H * 3.5,
      z: Math.random() * 1800 + 100,
      pz: 0,                        // previous z for streak
      r: Math.random(),             // 0..1 for color pick
      baseSpeed: 0.6 + Math.random() * 1.4,
    })

    const stars = Array.from({ length: 200 }, mkStar)
    // pre-set pz
    stars.forEach(s => { s.pz = s.z })

    let startTime = null

    const draw = (ts) => {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const t = Math.min(elapsed / TOTAL_MS, 1)

      // Background — near-black with very faint blue tint
      ctx.fillStyle = '#010810'
      ctx.fillRect(0, 0, W, H)

      // Subtle central nebula glow
      const nebulaAlpha = 0.06 + t * 0.08
      const ng = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.55)
      ng.addColorStop(0,   `rgba(20,60,140,${nebulaAlpha})`)
      ng.addColorStop(0.4, `rgba(10,30,80,${nebulaAlpha * 0.5})`)
      ng.addColorStop(1,   'transparent')
      ctx.fillStyle = ng
      ctx.fillRect(0, 0, W, H)

      // Warp factor: last 0.55s accelerates
      const warpStart = 0.72
      const warpT = t < warpStart ? 0 : Math.pow((t - warpStart) / (1 - warpStart), 2.2)
      const speed = 1 + warpT * 55

      stars.forEach(s => {
        s.pz = s.z
        s.z -= s.baseSpeed * speed

        if (s.z <= 1) {
          s.z = 1800
          s.pz = 1800
          s.x = (Math.random() - 0.5) * W * 3.5
          s.y = (Math.random() - 0.5) * H * 3.5
        }

        // Project current position
        const px  = (s.x / s.z)  * FL + cx
        const py  = (s.y / s.z)  * FL + cy
        // Project previous position (for streak)
        const ppx = (s.x / s.pz) * FL + cx
        const ppy = (s.y / s.pz) * FL + cy

        // Size and opacity by depth
        const size    = Math.min((FL / s.z) * 1.4, 3.5)
        const opacity = Math.min((1800 - s.z) / 1400, 1) * (0.5 + t * 0.5)

        // Color: mostly white, subtle blue for some, warm for rare
        let color
        if      (s.r < 0.12) color = '#a5f3fc'   // pale cyan
        else if (s.r < 0.06) color = '#fef9e7'   // warm white
        else                 color = '#ffffff'    // pure white

        ctx.globalAlpha = opacity

        // Streak (line from prev → current)
        const streakLen = Math.hypot(px - ppx, py - ppy)
        if (streakLen > 1.2) {
          const g = ctx.createLinearGradient(ppx, ppy, px, py)
          g.addColorStop(0, 'transparent')
          g.addColorStop(1, color)
          ctx.beginPath()
          ctx.moveTo(ppx, ppy)
          ctx.lineTo(px, py)
          ctx.strokeStyle = g
          ctx.lineWidth = size * 0.6
          ctx.stroke()
        }

        // Dot at head
        ctx.beginPath()
        ctx.arc(px, py, Math.max(size * 0.5, 0.4), 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Warp flash at the very end (t > 0.94)
      if (t > 0.94) {
        const f = (t - 0.94) / 0.06
        ctx.fillStyle = `rgba(10,30,80,${f * 0.75})`
        ctx.fillRect(0, 0, W, H)
        const wg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.7)
        wg.addColorStop(0, `rgba(180,220,255,${f * 0.55})`)
        wg.addColorStop(0.3, `rgba(55,139,239,${f * 0.25})`)
        wg.addColorStop(1, 'transparent')
        ctx.fillStyle = wg
        ctx.fillRect(0, 0, W, H)
      }

      if (t < 1) rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [phase])

  useEffect(() => {
    if (phase === 'done') return
    const t1 = setTimeout(() => setPhase('out'), 3300)
    const t2 = setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem('instat_v4', '1')
    }, 4600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [phase])

  if (phase === 'done') return null

  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={
        phase === 'out'
          ? { clipPath: 'circle(0% at 50% 50%)', opacity: 1 }
          : { opacity: 1, clipPath: 'circle(150% at 50% 50%)' }
      }
      transition={
        phase === 'out'
          ? { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0.3 }
      }
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </motion.div>
  )
}
