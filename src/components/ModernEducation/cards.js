import Image1 from '../../assets/Image1.png'
import Image2 from '../../assets/Image2.png'
import Image3 from '../../assets/Image3.png'
import Image4 from '../../assets/Image4.png'
import Image5 from '../../assets/Image5.png'

export const BUTTON_TEXT = 'Tizimga kirish'

export const cards = [
	{
		id: 1,
		title: 'Zamonaviy onlayn ',
		highlight: 'kurslar',
		tags: "Onlayn ta'lim platformasi",
		description:
			"Tajribali mutaxassislar tomonidan yaratilgan kurslar orqali yangi bilim va ko'nikmalarni egallang. Video darslar, amaliy topshiriqlar va sertifikatlar bilan zamonaviy ta'lim imkoniyatiga ega bo'ling.",
		img: Image1,
		startX: '-10%',
		startY: -10,
		exitX: '-100%',
	},
	{
		id: 2,
		title: 'Ilmiy manbalar ',
		highlight: 'kutubxonasi',
		tags: 'Elektron kutubxona',
		description:
			"Ilmiy kitoblar, o'quv qo'llanmalar va akademik materiallardan iborat keng elektron kutubxonaga kirish imkoniyatini oling. Bilimlaringizni ishonchli manbalar bilan boyiting.",
		img: Image2,
		startX: '50%',
		startY: 30,
		exitX: '150%',
	},
	{
		id: 3,
		title: 'Ilmiy maqolalar va ',
		highlight: 'jurnallar',
		tags: 'Ilmiy jurnallar platformasi',
		description:
			"Tadqiqot natijalarini ilmiy jurnallarda chop etish, maqolalarni ko'rib chiqish va akademik hamjamiyat bilan bilim almashish imkoniyati.",
		img: Image3,
		startX: '-55%',
		startY: 60,
		exitX: '-180%',
	},
	{
		id: 4,
		title: "Mikroma'lumotlar va tadqiqot  ",
		highlight: 'tahlili',
		tags: "Ma'lumotlar laboratoriyasi",
		description:
			"Statistik va ilmiy mikroma'lumotlar bilan ishlash uchun maxsus platforma. Tadqiqotchilar ma'lumotlarni tahlil qilib, ilmiy xulosalar va yangi tadqiqotlar yaratishlari mumkin.",
		img: Image4,
		startX: '40%',
		startY: -100,
		exitX: '120%',
	},
	{
		id: 5,
		title: "Bo'sh ish o'rinlari  ",
		highlight: 'imkoniyatlari',
		tags: 'Karyera imkoniyatlari',
		description:
			"Talabalar, mutaxassislar va tadqiqotchilar uchun ochiq ish o'rinlari, stajirovkalar va professional loyihalarni topish imkoniyati.",
		img: Image5,
		startX: '-20%',
		startY: 20,
		exitX: '-40%',
	},
]
