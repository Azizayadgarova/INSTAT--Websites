import bg1 from '../../assets/bg1.jpg?format=webp&quality=72'
import bg2 from '../../assets/bg2.jpg?format=webp&quality=72'
import bg3 from '../../assets/bg3.jpg?format=webp&quality=72'

export const slides = [
	{
		title: 'ORZUINGIZDAGI ISHNI TOPISH',
		highlight: 'YANADA OSON',
		desc: 'Sizga mos vakansiyalarni qidirish, filtrlash va bir necha bosqichda ariza yuborish imkoniyati.',
		img: bg1,
	},
	{
		title: 'MALAKALI MUTAXASSISLAR',
		highlight: 'BIZ BILAN',
		desc: "O'z sohangizning yetuk kadrlari bilan bir jamoada ishlash va tajriba almashish imkoniyati.",
		img: bg2,
	},
	{
		title: 'KARYERANGIZDA YANGI',
		highlight: 'BOSQICH',
		desc: "Yangi marralarni zabt etish va professional o'sish uchun eng yaxshi vakansiyalar to'plami.",
		img: bg3,
	},
	{
		title: 'MASOFAVIY ISH',
		highlight: 'ERKINLIK',
		desc: "Dunyoning istalgan nuqtasidan turib ishlash va o'z vaqtingizni boshqarish imkoniyati.",
		img: bg2,
	},
	{
		title: 'KELAJAKNI BIRGA',
		highlight: 'QURAMIZ',
		desc: 'Innovatsion loyihalarda ishtirok eting va zamonaviy texnologiyalar olamiga biz bilan kiring.',
		img: bg1,
	},
]

export const sliderConfig = {
	smoothing: 0.07,
	distortionStrength: 3.2,
	distortionSmoothing: 0.1,
	wheelSpeed: 0.008,
}

export const zeroPad = n => String(n).padStart(2, '0')
