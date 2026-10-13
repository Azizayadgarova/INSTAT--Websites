import Image1 from '@/assets/image1.webp'
import Image2 from '@/assets/image2.webp'
import Image3 from '@/assets/image3.webp'
import Image4 from '@/assets/image4.webp'
import Image5 from '@/assets/image5.webp'

/**
 * API'dan kelgan FEATURE yozuvlarini statik kartochka maketiga qo'shadi.
 *
 * Backend faqat matn va rasm beradi — animatsiya parametrlari (startX/startY/
 * exitX) va havolalar (`to`) frontendda qoladi, shuning uchun i-indeksdagi
 * statik kartochka "shablon" sifatida ishlatiladi. API rasmi bo'sh bo'lsa
 * (image: null) statik rasm saqlanadi.
 */
export const mergeCards = (apiItems, layout) =>
	apiItems.map((item, i) => {
		const base = layout[i % layout.length]
		return {
			...base,
			id: item.id,
			title: item.title,
			highlight: '', // API sarlavhani bo'lmaydi — to'liq `title` da keladi
			description: item.description,
			img: item.image || base.img,
		}
	})

export const getCards = t => [
	{
		id: 1,
		title: t('components.modernEducation.card1_title', 'Zamonaviy onlayn '),
		highlight: t('components.modernEducation.card1_highlight', 'kurslar'),
		tags: t('components.modernEducation.card1_tags', "Onlayn ta'lim platformasi"),
		description: t('components.modernEducation.card1_description',
			"Tajribali mutaxassislar tomonidan yaratilgan kurslar orqali yangi bilim va ko'nikmalarni egallang. Video darslar, amaliy topshiriqlar va sertifikatlar bilan zamonaviy ta'lim imkoniyatiga ega bo'ling."),
		img: Image1,
		startX: '-10%',
		startY: -10,
		exitX: '-100%',
		to: '/platform/onlayn-talim',
	},
	{
		id: 2,
		title: t('components.modernEducation.card2_title', 'Ilmiy manbalar '),
		highlight: t('components.modernEducation.card2_highlight', 'kutubxonasi'),
		tags: t('components.modernEducation.card2_tags', 'Elektron kutubxona'),
		description: t('components.modernEducation.card2_description',
			"Ilmiy kitoblar, o'quv qo'llanmalar va akademik materiallardan iborat keng elektron kutubxonaga kirish imkoniyatini oling. Bilimlaringizni ishonchli manbalar bilan boyiting."),
		img: Image2,
		startX: '50%',
		startY: 30,
		exitX: '150%',
		to: '/platform/raqamli-kutubxona',
	},
	{
		id: 3,
		title: t('components.modernEducation.card3_title', 'Ilmiy maqolalar va '),
		highlight: t('components.modernEducation.card3_highlight', 'jurnallar'),
		tags: t('components.modernEducation.card3_tags', 'Ilmiy jurnallar platformasi'),
		description: t('components.modernEducation.card3_description',
			"Tadqiqot natijalarini ilmiy jurnallarda chop etish, maqolalarni ko'rib chiqish va akademik hamjamiyat bilan bilim almashish imkoniyati."),
		img: Image3,
		startX: '-55%',
		startY: 60,
		exitX: '-180%',
		to: '/platform/elektron-jurnal',
	},
	{
		id: 4,
		title: t('components.modernEducation.card4_title', "Mikroma'lumotlar va tadqiqot  "),
		highlight: t('components.modernEducation.card4_highlight', 'tahlili'),
		tags: t('components.modernEducation.card4_tags', "Ma'lumotlar laboratoriyasi"),
		description: t('components.modernEducation.card4_description',
			"Statistik va ilmiy mikroma'lumotlar bilan ishlash uchun maxsus platforma. Tadqiqotchilar ma'lumotlarni tahlil qilib, ilmiy xulosalar va yangi tadqiqotlar yaratishlari mumkin."),
		img: Image4,
		startX: '40%',
		startY: -100,
		exitX: '120%',
		to: '/platform/mikro-malumotlar',
	},
	{
		id: 5,
		title: t('components.modernEducation.card5_title', "Bo'sh ish o'rinlari  "),
		highlight: t('components.modernEducation.card5_highlight', 'imkoniyatlari'),
		tags: t('components.modernEducation.card5_tags', 'Karyera imkoniyatlari'),
		description: t('components.modernEducation.card5_description',
			"Talabalar, mutaxassislar va tadqiqotchilar uchun ochiq ish o'rinlari, stajirovkalar va professional loyihalarni topish imkoniyati."),
		img: Image5,
		startX: '-20%',
		startY: 20,
		exitX: '-40%',
		to: '/platform/bosh-ish-orinlari',
	},
]
