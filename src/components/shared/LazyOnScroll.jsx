import { useState, useEffect, useRef, Suspense } from 'react'

export default function LazyOnScroll({ children, fallback = null, rootMargin = '200px' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  if (visible) return <Suspense fallback={fallback}>{children}</Suspense>
  return <div ref={ref} style={{ minHeight: fallback ? undefined : '1px' }}>{fallback}</div>
}
