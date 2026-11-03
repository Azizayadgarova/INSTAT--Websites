/**
 * "Qayta tayyorlash va malaka oshirish dasturining bajarilishi" jadvali (statik, uz/ru/en).
 * Manba: INSTAT prototipi (page.html, `p14`). `EXECUTION_ROWS`: [soat, yillik dastur bo'yicha, haqiqatda | null],
 * `COURSE_NAMES` — kurs nomlari (qator tartibida), `EXECUTION_TEXT` — jadval sarlavhalari.
 */
export const EXECUTION_ROWS = [
	[
		36,
		43,
		14
	],
	[
		576,
		30,
		14
	],
	[
		72,
		48,
		30
	],
	[
		36,
		34,
		30
	],
	[
		36,
		34,
		null
	],
	[
		36,
		32,
		null
	],
	[
		36,
		28,
		29
	],
	[
		36,
		34,
		null
	],
	[
		36,
		34,
		31
	],
	[
		36,
		32,
		23
	],
	[
		36,
		17,
		15
	],
	[
		36,
		15,
		15
	],
	[
		36,
		16,
		14
	]
]
export const COURSE_NAMES = {
	"uz": [
		"«Milliy hisoblar tizimi»",
		"«Statistika (tarmoqlar va sohalar bo‘yicha)»",
		"«Statistika uslubiyoti va amaliyoti» (36+36)*",
		"«Qishloq xo‘jaligi va atrof muhit statistikasi uslubiyoti va amaliyoti»",
		"«Aholi va qishloq xo‘jaligini ro‘yxatga olish uslubiyoti va tahlili»",
		"«Raqamli texnologiyalar, sun’iy intellekt va statistik registrlarni yuritish»",
		"«STATA» amaliy-dasturiy paketi asosida katta hajmdagi ma’lumotlarni qayta ishlash va tahlil qilish",
		"«Python bilan statistik tahlil (boshlang‘ich daraja)»",
		"«Statistika Data Analitics» ta’lim uslubiyoti",
		"«Buxgalteriya hisobini yuritish, moliyaviy va boshqa hisobotlarni tayyorlash va ularning tahlili»",
		"«Milliy statistika qo‘mitasi tizimida Inson resurslarini rivojlantirish bo‘limlari xodimlari salohiyatini oshirish va amaliy ko‘nikmalarni takomillashtirish»",
		"«Ish yuritish, ijro intizomini ta’minlash hamda murojaatlar bilan ishlash»",
		"«Milliy statistika qo‘mitasi tizimida yuridik ko‘nikma va norma ijodkorligini takomillashtirish hamda korrupsiyani oldini olish»"
	],
	"ru": [
		"«Система национальных счетов»",
		"«Статистика (по отраслям и сферам)»",
		"«Методология и практика статистики» (36+36)*",
		"«Методология и практика статистики сельского хозяйства и окружающей среды»",
		"«Методология и анализ переписи населения и сельского хозяйства»",
		"«Цифровые технологии, искусственный интеллект и ведение статистических регистров»",
		"Обработка и анализ больших данных на базе пакета «STATA»",
		"«Статистический анализ на Python (начальный уровень)»",
		"Методика обучения «Statistics Data Analytics»",
		"«Ведение бухгалтерского учёта, подготовка и анализ финансовой и иной отчётности»",
		"«Повышение потенциала сотрудников отделов развития человеческих ресурсов системы Национального комитета по статистике»",
		"«Делопроизводство, обеспечение исполнительской дисциплины и работа с обращениями»",
		"«Совершенствование юридических навыков, нормотворчества и предупреждение коррупции в системе Национального комитета по статистике»"
	],
	"en": [
		"“System of National Accounts”",
		"“Statistics (by sector and field)”",
		"“Statistical methodology and practice” (36+36)*",
		"“Methodology and practice of agricultural and environmental statistics”",
		"“Methodology and analysis of population and agricultural censuses”",
		"“Digital technologies, AI and statistical registers”",
		"Processing and analysing big data with the “STATA” package",
		"“Statistical analysis with Python (beginner)”",
		"“Statistics Data Analytics” teaching methodology",
		"“Accounting, preparing and analysing financial and other reports”",
		"“Building capacity of HR development staff in the National Statistics Committee system”",
		"“Records management, execution discipline and handling appeals”",
		"“Improving legal skills, rule-making and preventing corruption in the National Statistics Committee system”"
	]
}
export const EXECUTION_HOURS = {
	"uz": "soat",
	"ru": "ч",
	"en": "h"
}
export const EXECUTION_TEXT = {
	"uz": [
		"Kadrlar malakasini oshirish va statistik tadqiqotlar institutida 2026-yil mart–sentabr oylarida malaka oshirgan tinglovchilar to‘g‘risida",
		"MA’LUMOT",
		"T/r",
		"O‘quv kurslarining nomi",
		"Tinglovchilar soni (nafar)",
		"Yillik dastur bo‘yicha",
		"Mart–sentabr oylarida haqiqatda",
		"JAMI"
	],
	"ru": [
		"Сведения о слушателях, прошедших повышение квалификации в Институте повышения квалификации кадров и статистических исследований в марте–сентябре 2026 года",
		"СПРАВКА",
		"№",
		"Наименование учебных курсов",
		"Количество слушателей (чел.)",
		"По годовой программе",
		"Фактически в марте–сентябре",
		"ИТОГО"
	],
	"en": [
		"Trainees who completed professional development at the Institute for Staff Development and Statistical Research in March–September 2026",
		"INFORMATION",
		"No.",
		"Course title",
		"Number of trainees",
		"Annual plan",
		"Actual, March–September",
		"TOTAL"
	]
}
