import bg1 from '@/assets/bg1.jpg'
import bg2 from '@/assets/bg2.jpg'
import bg3 from '@/assets/bg3.jpg'

export const slides = [
	{
		title: "ish o'rinlari tobora kun",
		highlight: 'sayin oshmoqda!',
		desc: "Bizning platformamizda 10,000+ faol ish o'rinlari mavjud. Sizga mos ishni topish endi oson va tez!",
		img: bg1,
	},
	{
		title: '50,000+ foydalanuvchi biz',
		highlight: 'bilan ishlamoqda',
		desc: "Ko'plab ish qidiruvchilar platformamizdan foydalangan va o'z ideal ishlarini topishdi. Siz ham ularga qo'shiling!",
		img: bg2,
	},
	{
		title: 'Har soha uchun',
		highlight: "ish o'rinlari",
		desc: "Texnologiya, ta'lim, moliya va boshqa sohalarda yuzlab vakansiyalar mavjud. Sizning qiziqishingiz va tajribangizga mos ishni toping!",
		img: bg3,
	},
	{
		title: "orzuingizdagi ishni topish",
		highlight: 'yanada oson',
		desc: "Sizga mos vakansiyalarni qidirish, filtrlash va bir necha bosqichda ariza yuborish imkoniyati bilan ish qidirish jarayoni tez va samarali bo'ladi.",
		img: bg2,
	},
]

export const sliderConfig = {
	smoothing: 0.07,
	distortionStrength: 3.2,
	distortionSmoothing: 0.1,
	wheelSpeed: 0.008,
}

export const zeroPad = n => String(n).padStart(2, '0')
