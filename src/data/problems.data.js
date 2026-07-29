import alertIcon from '@/assets/icons/alert-line.png'
import deviceIcon from '@/assets/icons/device-line.png'

export const problems = [
	{
		id: 'problem-1',
		icon: deviceIcon,
		title: "Qidiruv juda ko'p vaqt oladi",
		description:
			"Kutubxonaga kelasiz va kerakli kitobni topish uchun 20–30 daqiqa vaqt sarflaysiz. Javonlar har doim ham tushunarli tartibda emas, xodimlar band bo'lishi mumkin, navigatsiya esa qulay emas.",
	},
	{
		id: 'problem-2',
		icon: alertIcon,
		title: "Kitob mavjudligiga ishonch yo'q",
		description:
			"Kerakli kitob kutubxonada bormi, hozir mavjudmi va qaysi bo'limda joylashganini oldindan bilish qiyin.",
	},
	{
		id: 'problem-3',
		icon: deviceIcon,
		title: 'Pullik kitoblar — xavfli tanlov',
		description:
			"Onlayn platformalarda kitobni sotib olishdan oldin uning mazmuni va uslubini to'liq baholash qiyin. Uni \"varaqlab ko'rish\" imkoniyati yo'q.",
	},
]
