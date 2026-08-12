import { Link } from 'react-router-dom'

/**
 * Menyudagi ichki bo'lim havolasi. `href` berilgan bo'lsa (admin panelda tashqi
 * URL yozilgan) — yangi oynada ochiladi, aks holda oddiy ichki route.
 *
 * `href` holatida ham <a> ishlatiladi (o'rta tugma / "havolani nusxalash"
 * ishlashi uchun), ochish esa window.open orqali.
 */
const MenuLink = ({ href, to, onClick, children }) =>
	href ? (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			onClick={e => {
				e.preventDefault()
				window.open(href, '_blank', 'noopener,noreferrer')
				onClick?.()
			}}
		>
			{children}
		</a>
	) : (
		<Link to={to} onClick={onClick}>
			{children}
		</Link>
	)

export default MenuLink
