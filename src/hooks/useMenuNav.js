import { useState } from 'react'
import { useLocation } from 'react-router-dom'

/** Joriy yo'l qaysi bo'lim va qaysi ichki havolaga to'g'ri kelishini topadi. */
const findCurrent = (menuConfig, pathname) => {
	for (const [section, { base, links }] of Object.entries(menuConfig)) {
		if (pathname !== base && !pathname.startsWith(`${base}/`)) continue
		const index = links.findIndex(l => pathname === `${base}/${l.path}` || pathname.startsWith(`${base}/${l.path}/`))
		return { section, index: index >= 0 ? index : null }
	}
	return null
}

/**
 * Menyu (Navbar overlay) navigatsiya holati.
 *
 * - `current` — ochiq sahifa qaysi bo'lim va qaysi ichki havolaga to'g'ri kelishi
 *   (`{ section, index }`), menyuga tegishli bo'lmasa `null`.
 * - Menyu har ochilganda joriy sahifaning bo'limi tanlangan bo'ladi, ichki
 *   havolalar orasida joriy sahifa belgilanadi (`isCurrentLink`).
 * - Foydalanuvchi boshqa bo'limni bossa — shu ochilish davomida u ustun turadi.
 */
export const useMenuNav = (menuConfig, isOpen) => {
	const { pathname } = useLocation()

	const current = findCurrent(menuConfig, pathname)

	const [picked, setPicked] = useState(null)
	const [activeLinkIndex, setActiveLinkIndex] = useState(null)

	// Menyu qayta ochilganda tanlov joriy sahifaga qaytadi (render paytida
	// sinxronlash — effektsiz, ortiqcha render yo'q)
	const [wasOpen, setWasOpen] = useState(isOpen)
	if (wasOpen !== isOpen) {
		setWasOpen(isOpen)
		if (isOpen) {
			setPicked(null)
			setActiveLinkIndex(null)
		}
	}

	const activeMenu = picked ?? current?.section ?? 'axborot'

	const pickMenu = key => {
		setPicked(key)
		setActiveLinkIndex(null)
	}

	const isCurrentLink = (section, index) => current?.section === section && current.index === index

	return { activeMenu, pickMenu, activeLinkIndex, setActiveLinkIndex, current, isCurrentLink }
}

export default useMenuNav
