import { useEffect, useRef, useState } from 'react'

const LazyLoad = ({ children, fallback, rootMargin = '400px' }) => {
	const [visible, setVisible] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true)
					io.disconnect()
				}
			},
			{ rootMargin },
		)
		io.observe(el)
		return () => io.disconnect()
	}, [rootMargin])

	return <div ref={ref}>{visible ? children : fallback}</div>
}

export default LazyLoad
