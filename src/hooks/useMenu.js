import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { menuConfig } from '../config/menuConfig'

/**
 * menuConfig'ni joriy tilga tarjima qilib qaytaradi.
 * Shakli Navbar kutayotgani bilan bir xil: { title, base, links: [{ name, path }] }
 */
export const useMenu = () => {
	const { t, i18n } = useTranslation()

	return useMemo(() => {
		const entries = Object.entries(menuConfig).map(([section, { base, paths, direct }]) => [
			section,
			{
				base,
				direct: Boolean(direct) || paths.length === 0,
				title: t(`menu.${section}.title`),
				links: paths.map(path => ({ path, name: t(`menu.${section}.${path}`) })),
			},
		])
		return Object.fromEntries(entries)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [t, i18n.resolvedLanguage])
}

export default useMenu
