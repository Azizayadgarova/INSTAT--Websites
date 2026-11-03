import { useInView } from './hooks'

/**
 * Ekranga kirganda `.in` klassi bilan "paydo bo'ladigan" bo'lim (page.css dagi `.blk`).
 * `title` berilsa raqamlangan sarlavha (`n`) chiqadi. `children` funksiya bo'lsa, unga `inView`
 * uzatiladi (sanagich kabi animatsiyalar uchun). `instant` — darhol ko'rsatiladi (ro'yxatlar uchun).
 */
export default function Block({ n, title, threshold = 0.08, instant = false, children }) {
	const [ref, inView] = useInView({ threshold })
	const shown = instant || inView
	return (
		<section className={`blk${shown ? ' in' : ''}`} ref={ref}>
			{title && (
				<h2>
					<i>{n}</i>
					{title}
				</h2>
			)}
			{typeof children === 'function' ? children(shown) : children}
		</section>
	)
}
