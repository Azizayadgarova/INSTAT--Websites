/**
 * Tashkiliy tuzilma (Institut tuzilmasi) — prototip: INSTAT/page.html (Milliy statistika qo'mitasining
 * 2026-yil 2-sentabrdagi 63-son buyrug'i ilovasi). Backendda hozircha bunday ma'lumot yo'q,
 * shuning uchun statik; backend paydo bo'lsa shu shaklda (H = boshqarmalar, U = bo'limlar) almashtiriladi.
 *
 * H[i]   — i-yo'nalish boshlig'i: [yorliq, lavozim, qisqa nom]
 * U[i]   — shu yo'nalishdagi bo'linmalar
 * STAFF  — U ga mos shtat birliklari: son | '*' (o'z mablag'i hisobidan) | '**' (funksional platforma) | 'y' (ichki bo'linma)
 */
export const ORG_COLORS = ["#3d8bff","#00E6FC","#a78bfa","#2fd39a"]

export const ORG_STAFF = [[5,3,3,1],[4,3,"*","*"],[3,1,1,"**"],[2,1,1,1,2,"y"]]

export const ORG_STRUCTURE = {
	"uz": {
		"t": "Institut *tuzilmasi",
		"l": "Institutning boshqaruv tizimi, bo‘limlari va shtat birliklari — Milliy statistika qo‘mitasining 2026-yil 2-sentabrdagi 63-son buyrug‘iga muvofiq.",
		"s": [
			"Asosiy ko‘rsatkichlar",
			"Tashkiliy tuzilma",
			"Izohlar"
		],
		"doc": [
			"Asos",
			"Milliy statistika qo‘mitasining 2026-yil 2-sentabrdagi 63-son buyrug‘iga ilova"
		],
		"n": [
			[
				"47",
				"jami xodimlar"
			],
			[
				"34",
				"boshqaruv xodimlari va professor-o‘qituvchilar"
			],
			[
				"20",
				"bo‘linma va lavozim"
			]
		],
		"dir": "Direktor",
		"ken": "Kengash",
		"all": "Barchasi",
		"sh": "shtat",
		"H": [
			[
				"O‘rinbosar",
				"Direktorning ta’lim va statistik salohiyatni rivojlantirish bo‘yicha o‘rinbosari",
				"Ta’lim"
			],
			[
				"O‘rinbosar",
				"Direktorning tadqiqot, tahlil va innovatsiyalar bo‘yicha o‘rinbosari",
				"Tadqiqot"
			],
			[
				"Direktorga bo‘ysunadi",
				"Raqamli ta’lim va kadrlar",
				"Raqamli ta’lim"
			],
			[
				"Direktorga bo‘ysunadi",
				"Moliya, huquq va ma’muriy ta’minot",
				"Ma’muriy"
			]
		],
		"U": [
			[
				"Kompetensiyalar, ta’lim dasturlari va o‘quv-metodik ta’minot bo‘limi",
				"Ta’lim jarayoni, sertifikatlash va natijalarni baholash bo‘limi",
				"Hududiy va tarmoq tadqiqotlari hamda amaliy loyihalar bo‘limi",
				"O‘quv dasturlari va xizmatlarini rivojlantirish bo‘yicha bosh mutaxassis"
			],
			[
				"Statistik metodologiya, tadqiqotlar va ma’lumotlar tahlili bo‘limi",
				"Yashirin va kreativ iqtisodiyotni statistik baholash metodologiyasi va monitoringi bo‘limi",
				"«O‘zbekiston statistika axborotnomasi» ilmiy ommabop elektron jurnali tahririyati",
				"«Elektron statistika» xalqaro ilmiy nashrlar kutubxonasi"
			],
			[
				"Raqamli ta’lim va «Ma’lumotlar tahlili» platformasini boshqarish bo‘limi",
				"Inson resurslarini rivojlantirish bo‘yicha bosh mutaxassis",
				"Ilmiy kadrlar va akademik hamkorlik bo‘yicha bosh mutaxassis",
				"Zamonaviy bilimlar markazi (Centre of Excellence)"
			],
			[
				"Moliya va buxgalteriya hisobi bo‘limi",
				"Xalqaro hamkorlik va qo‘shma ta’lim-tadqiqot dasturlari bo‘yicha bosh mutaxassis",
				"Bosh yuriskonsult",
				"Murojaatlar bilan ishlash va ijro nazorati bo‘yicha bosh mutaxassis",
				"Ma’muriy-xo‘jalik ishlari bo‘limi",
				"Mehmonxona turidagi yotoqxona"
			]
		],
		"f1": "Xo‘jalik hisobidan",
		"f2": "Funksional platforma",
		"N": [
			"Jami xodimlar soni – 47 nafar, shu jumladan boshqaruv xodimlari va professor-o‘qituvchilar soni – 34 nafar.",
			"Institut tomonidan o‘quv jarayoniga professor-o‘qituvchilar hamda soha bo‘yicha mutaxassislar mehnatiga soatbay (kunbay, ishbay) haq to‘lagan holda qonunchilik hujjatlarida belgilangan tartibda jalb etiladi.",
			"Texnik va xizmat ko‘rsatuvchi xodimlar soni belgilangan normativlarga muvofiq aniqlanadi."
		],
		"F": [
			"ushbu bo‘linmalar institut umumiy shtat birligiga kirmaydi, xo‘jalik faoliyati hisobidan moliyalashtiriladi.",
			"funksional platforma hisoblanib, yuridik shaxs tashkil etmagan holda xo‘jalik faoliyati hisobidan moliyalashtiriladi."
		]
	},
	"ru": {
		"t": "Структура *института",
		"l": "Система управления, подразделения и штатные единицы института — в соответствии с приказом Национального комитета по статистике № 63 от 2 сентября 2026 года.",
		"s": [
			"Основные показатели",
			"Организационная структура",
			"Примечания"
		],
		"doc": [
			"Основание",
			"Приложение к приказу Национального комитета по статистике № 63 от 2 сентября 2026 года"
		],
		"n": [
			[
				"47",
				"всего сотрудников"
			],
			[
				"34",
				"управленческий и профессорско-преподавательский состав"
			],
			[
				"20",
				"подразделений и должностей"
			]
		],
		"dir": "Директор",
		"ken": "Совет",
		"all": "Все",
		"sh": "штат",
		"H": [
			[
				"Заместитель",
				"Заместитель директора по образованию и развитию статистического потенциала",
				"Образование"
			],
			[
				"Заместитель",
				"Заместитель директора по исследованиям, анализу и инновациям",
				"Исследования"
			],
			[
				"Подчиняется директору",
				"Цифровое обучение и кадры",
				"Цифровое обучение"
			],
			[
				"Подчиняется директору",
				"Финансы, право и административное обеспечение",
				"Администрация"
			]
		],
		"U": [
			[
				"Отдел компетенций, образовательных программ и учебно-методического обеспечения",
				"Отдел учебного процесса, сертификации и оценки результатов",
				"Отдел региональных и отраслевых исследований и прикладных проектов",
				"Главный специалист по развитию учебных программ и услуг"
			],
			[
				"Отдел статистической методологии, исследований и анализа данных",
				"Отдел методологии статистической оценки и мониторинга скрытой и креативной экономики",
				"Редакция научно-популярного электронного журнала «Статистический вестник Узбекистана»",
				"Библиотека международных научных изданий «Электронная статистика»"
			],
			[
				"Отдел управления цифровым обучением и платформой «Анализ данных»",
				"Главный специалист по развитию человеческих ресурсов",
				"Главный специалист по научным кадрам и академическому сотрудничеству",
				"Центр современных знаний (Centre of Excellence)"
			],
			[
				"Отдел финансов и бухгалтерского учёта",
				"Главный специалист по международному сотрудничеству и совместным образовательно-исследовательским программам",
				"Главный юрисконсульт",
				"Главный специалист по работе с обращениями и контролю исполнения",
				"Административно-хозяйственный отдел",
				"Общежитие гостиничного типа"
			]
		],
		"f1": "Хозрасчёт",
		"f2": "Функциональная платформа",
		"N": [
			"Общая численность сотрудников – 47 человек, в том числе управленческий и профессорско-преподавательский состав – 34 человека.",
			"Институт привлекает к учебному процессу преподавателей и отраслевых специалистов с почасовой (поденной, сдельной) оплатой в порядке, установленном законодательством.",
			"Численность технического и обслуживающего персонала определяется в соответствии с установленными нормативами."
		],
		"F": [
			"данные подразделения не входят в общую штатную численность института и финансируются за счёт хозяйственной деятельности.",
			"является функциональной платформой и финансируется за счёт хозяйственной деятельности без образования юридического лица."
		]
	},
	"en": {
		"t": "Institute *structure",
		"l": "The Institute’s governance, units and staff positions — under Order No. 63 of the National Statistics Committee dated 2 September 2026.",
		"s": [
			"Key figures",
			"Organizational chart",
			"Notes"
		],
		"doc": [
			"Basis",
			"Annex to Order No. 63 of the National Statistics Committee dated 2 September 2026"
		],
		"n": [
			[
				"47",
				"total staff"
			],
			[
				"34",
				"management and teaching staff"
			],
			[
				"20",
				"units and positions"
			]
		],
		"dir": "Director",
		"ken": "Council",
		"all": "All",
		"sh": "staff",
		"H": [
			[
				"Deputy",
				"Deputy Director for Education and Statistical Capacity Development",
				"Education"
			],
			[
				"Deputy",
				"Deputy Director for Research, Analysis and Innovation",
				"Research"
			],
			[
				"Reports to the Director",
				"Digital learning and human resources",
				"Digital learning"
			],
			[
				"Reports to the Director",
				"Finance, legal and administration",
				"Administration"
			]
		],
		"U": [
			[
				"Competencies, Curricula and Teaching Materials Department",
				"Learning Process, Certification and Assessment Department",
				"Regional and Sectoral Research and Applied Projects Department",
				"Chief Specialist for Curriculum and Services Development"
			],
			[
				"Statistical Methodology, Research and Data Analysis Department",
				"Hidden and Creative Economy Statistical Assessment and Monitoring Department",
				"Editorial office of the “Uzbekistan Statistical Bulletin” popular science e-journal",
				"“Electronic Statistics” international scientific publications library"
			],
			[
				"Digital Learning and “Data Analysis” Platform Management Department",
				"Chief Specialist for Human Resources Development",
				"Chief Specialist for Research Staff and Academic Cooperation",
				"Centre of Excellence"
			],
			[
				"Finance and Accounting Department",
				"Chief Specialist for International Cooperation and Joint Education-Research Programs",
				"Chief Legal Counsel",
				"Chief Specialist for Citizen Appeals and Execution Control",
				"Administrative Department",
				"Hotel-type dormitory"
			]
		],
		"f1": "Self-financed",
		"f2": "Functional platform",
		"N": [
			"Total staff – 47, including 34 management and teaching staff.",
			"The Institute engages lecturers and sector specialists in teaching on an hourly (daily, piece-rate) basis as provided by law.",
			"The number of technical and support staff is set according to established standards."
		],
		"F": [
			"these units are not part of the Institute’s total staff and are financed from self-supporting activities.",
			"a functional platform financed from self-supporting activities without forming a legal entity."
		]
	}
}
