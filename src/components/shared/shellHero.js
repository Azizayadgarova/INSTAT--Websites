import { createContext, useContext, useEffect } from 'react'

/**
 * SectionShell hero'sini sahifa ichidan almashtirish (masalan, yangilik sahifasida hero'da
 * sana va yangilik sarlavhasi chiqadi). Provider — SectionShell.
 */
export const ShellHeroContext = createContext(null)

/** `hero`: `{ kicker, title }` yoki null (standart hero). Sahifadan chiqilganda tiklanadi. */
export const useShellHero = hero => {
	const set = useContext(ShellHeroContext)
	const key = hero ? JSON.stringify(hero) : ''
	useEffect(() => {
		if (!set) return
		set(key ? JSON.parse(key) : null)
		return () => set(null)
	}, [set, key])
}
