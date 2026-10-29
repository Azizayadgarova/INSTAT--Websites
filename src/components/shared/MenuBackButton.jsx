import { useMenuState } from '@/context/MenuContext'

/**
 * Bo'lim sahifalaridagi "Ortga" tugmasi: bosh sahifaga yo'naltirmaydi, balki
 * asosiy menyuni ochadi (menyu joriy bo'limni ko'rsatib turadi).
 */
const MenuBackButton = ({ className, children }) => {
	const { open } = useMenuState()

	return (
		<button type='button' onClick={open} className={className}>
			{children}
		</button>
	)
}

export default MenuBackButton
