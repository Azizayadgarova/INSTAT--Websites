import { useInView } from './hooks'

/**
 * Ekranga kirganda `.in` klassi bilan "paydo bo'ladigan" raqamlangan bo'lim (page.css dagi `.blk`).
 * `children` funksiya bo'lsa, unga `inView` uzatiladi (sanagich kabi animatsiyalar uchun).
 */
export default function Block({ n, title, threshold = 0.08, children }) {
	const [ref, inView] = useInView({ threshold })
	return (
		<section className={`blk${inView ? ' in' : ''}`} ref={ref}>
			<h2>
				<i>{n}</i>
				{title}
			</h2>
			{typeof children === 'function' ? children(inView) : children}
		</section>
	)
}
