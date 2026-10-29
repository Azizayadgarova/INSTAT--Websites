import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/**
 * Asosiy menyu (Navbar overlay) ochiq/yopiqligi. Provayder MainLayout'da —
 * shu sababli sahifa ichidagi "Ortga" tugmalari ham menyuni ochishi mumkin.
 */
const MenuContext = createContext(null)

export const MenuProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const open = useCallback(() => setIsOpen(true), [])
	const close = useCallback(() => setIsOpen(false), [])
	const toggle = useCallback(() => setIsOpen(p => !p), [])
	const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle])

	return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

/**
 * Provayder bo'lmasa (masalan alohida render qilinganda) lokal holatga tushadi —
 * komponent hech qachon yiqilmaydi, faqat tashqaridan boshqarib bo'lmaydi.
 */
export const useMenuState = () => {
	const ctx = useContext(MenuContext)
	const [local, setLocal] = useState(false)
	const open = useCallback(() => setLocal(true), [])
	const close = useCallback(() => setLocal(false), [])
	const toggle = useCallback(() => setLocal(p => !p), [])
	return ctx ?? { isOpen: local, open, close, toggle }
}
