/**
 * Menyu strukturasi. Matnlar bu yerda emas — i18n fayllarida (src/i18n/*.json),
 * `menu.<section>.<path>` kalitlari orqali. Tarjimasi bilan olish uchun `useMenu()`.
 */
export const menuConfig = {
	about: {
		base: '/about',
		paths: [
			'umumiy-malumot',
			'tuzilma',
			'rahbariyat',
			'qarshi-kurash',
			'ish-orinlar',
			'yotoqhona',
			'odob-axloq',
		],
	},
	axborot: {
		base: '/information-resurses',
		paths: [
			'axborot-tizimi',
			'rivojlanish-maqsadlari',
			'gender-statistika',
			'royhatga-olish',
			'qishloq-xojaligi',
			'ochiq-malumotlar',
			'statistika-agentligi',
		],
	},
	science: {
		base: '/science',
		paths: ['ilmiy-tadqiqot', 'oliy-talim'],
	},
	media: {
		base: '/media-servises',
		paths: ['yangiliklar', 'tadbirlar', 'hamkorlik'],
	},
}

/** Sitemap generatsiyasi va router uchun tekis ro‘yxat */
export const allRoutes = [
	'/',
	...Object.values(menuConfig).flatMap(({ base, paths }) => [
		base,
		...paths.map(p => `${base}/${p}`),
	]),
	'/platform/onlayn-talim',
	'/platform/raqamli-kutubxona',
	'/platform/kutubxona-katalogi',
	'/platform/elektron-jurnal',
	'/platform/mikro-malumotlar',
	'/platform/bosh-ish-orinlari',
]
