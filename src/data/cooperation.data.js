/**
 * "Xalqaro hamkorlik" sahifasi (statik, uz/ru/en). Manba: INSTAT prototipi (page.html, `p32`).
 * `COOP_COUNTRIES`: [bayroq kaliti, 1 = MDH | 0 = xorijiy]; `COOP[lang].C`: [davlat, [tashkilotlar]].
 */
export const FLAGS = {
	"kr": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#fff\"/><circle cx=\"30\" cy=\"20\" r=\"10\" fill=\"#cd2e3a\"/><path d=\"M20 20a5 5 0 0 0 10 0a5 5 0 0 1 10 0a10 10 0 0 1-20 0z\" fill=\"#0047a0\"/><g fill=\"#000\"><rect x=\"8\" y=\"6\" width=\"9\" height=\"1.6\" transform=\"rotate(34 12 7)\"/><rect x=\"8\" y=\"9\" width=\"9\" height=\"1.6\" transform=\"rotate(34 12 10)\"/><rect x=\"43\" y=\"30\" width=\"9\" height=\"1.6\" transform=\"rotate(34 47 31)\"/><rect x=\"43\" y=\"33\" width=\"9\" height=\"1.6\" transform=\"rotate(34 47 34)\"/><rect x=\"43\" y=\"6\" width=\"9\" height=\"1.6\" transform=\"rotate(-34 47 7)\"/><rect x=\"8\" y=\"30\" width=\"9\" height=\"1.6\" transform=\"rotate(-34 12 31)\"/></g></svg>",
	"pl": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"20\" fill=\"#fff\"/><rect y=\"20\" width=\"60\" height=\"20\" fill=\"#dc143c\"/></svg>",
	"kg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#e8112d\"/><circle cx=\"30\" cy=\"20\" r=\"9\" fill=\"#ffef00\"/><circle cx=\"30\" cy=\"20\" r=\"5\" fill=\"#e8112d\"/><circle cx=\"30\" cy=\"20\" r=\"3.6\" fill=\"#ffef00\"/></svg>",
	"kz": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#00afca\"/><circle cx=\"31\" cy=\"17\" r=\"6\" fill=\"#fec50c\"/><path d=\"M22 27q9 5 18 0\" stroke=\"#fec50c\" stroke-width=\"2\" fill=\"none\"/><rect x=\"4\" y=\"3\" width=\"3\" height=\"34\" fill=\"#fec50c\" opacity=\".8\"/></svg>",
	"tj": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"12\" fill=\"#cc0000\"/><rect y=\"12\" width=\"60\" height=\"16\" fill=\"#fff\"/><rect y=\"28\" width=\"60\" height=\"12\" fill=\"#006600\"/><path d=\"M25 22h10l-1-3-2 1-2-3-2 3-2-1z\" fill=\"#f8c300\"/><g fill=\"#f8c300\"><circle cx=\"22\" cy=\"17\" r=\"1\"/><circle cx=\"26\" cy=\"15\" r=\"1\"/><circle cx=\"30\" cy=\"14\" r=\"1\"/><circle cx=\"34\" cy=\"15\" r=\"1\"/><circle cx=\"38\" cy=\"17\" r=\"1\"/></g></svg>",
	"ru": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"13.3\" fill=\"#fff\"/><rect y=\"13.3\" width=\"60\" height=\"13.4\" fill=\"#0039a6\"/><rect y=\"26.7\" width=\"60\" height=\"13.3\" fill=\"#d52b1e\"/></svg>"
}
export const COOP_COUNTRIES = [
	[
		"kr",
		0
	],
	[
		"pl",
		0
	],
	[
		"kg",
		1
	],
	[
		"kz",
		1
	],
	[
		"tj",
		1
	],
	[
		"ru",
		1
	]
]
export const COOP = {
	"uz": {
		"s": [
			"Hamkorlik yo‘nalishlari",
			"Hamkor davlatlar va tashkilotlar"
		],
		"rt": [
			"2",
			"yo‘nalishda hamkorlik"
		],
		"B": [
			[
				"Yo‘nalish 1",
				"Xorijiy ilmiy tashkilotlar va oliy ta’lim muassasalari bilan hamkorlik",
				[
					"MDH mamlakatlari",
					"Xorijiy mamlakatlar"
				]
			],
			[
				"Yo‘nalish 2",
				"Mahalliy ilmiy tashkilotlar va oliy o‘quv yurtlari bilan hamkorlik",
				[
					"Ilmiy tashkilotlar",
					"Oliy o‘quv yurtlari"
				]
			]
		],
		"st": [
			[
				"hamkor davlat"
			],
			[
				"hamkor tashkilot"
			],
			[
				"MDH davlati"
			]
		],
		"all": "Barchasi",
		"g": [
			"Xorijiy",
			"MDH"
		],
		"pt": "hamkor",
		"C": [
			[
				"Koreya Respublikasi",
				[
					"Statistics Korea — Statistics Training Institute",
					"Statistics Korea — Statistics Research Institute"
				]
			],
			[
				"Polsha Respublikasi",
				[
					"WSB universiteti",
					"Gdansk universiteti"
				]
			],
			[
				"Qirg‘iziston Respublikasi",
				[
					"Qirg‘iziston Respublikasi Milliy statistika qo‘mitasi"
				]
			],
			[
				"Qozog‘iston Respublikasi",
				[
					"M. Auezov nomidagi Janubiy Qozog‘iston universiteti",
					"Qozog‘iston Iqtisodiyot, moliya va xalqaro savdo universiteti",
					"Ahmad Yassaviy universiteti",
					"Olmaota Iqtisodiyot va statistika akademiyasi"
				]
			],
			[
				"Tojikiston Respublikasi",
				[
					"Tojikiston kon-metallurgiya instituti",
					"Akademik Bobojon G‘afurov nomidagi Xo‘jand davlat universiteti",
					"Rossiya-Tojikiston (Slavyan) universiteti"
				]
			],
			[
				"Rossiya Federatsiyasi",
				[
					"Ural federal universiteti",
					"MDH mamlakatlari instituti"
				]
			]
		]
	},
	"ru": {
		"s": [
			"Направления сотрудничества",
			"Страны и организации-партнёры"
		],
		"rt": [
			"2",
			"направления сотрудничества"
		],
		"B": [
			[
				"Направление 1",
				"Сотрудничество с зарубежными научными организациями и вузами",
				[
					"Страны СНГ",
					"Зарубежные страны"
				]
			],
			[
				"Направление 2",
				"Сотрудничество с местными научными организациями и вузами",
				[
					"Научные организации",
					"Высшие учебные заведения"
				]
			]
		],
		"st": [
			[
				"стран-партнёров"
			],
			[
				"организаций-партнёров"
			],
			[
				"страны СНГ"
			]
		],
		"all": "Все",
		"g": [
			"Зарубежные",
			"СНГ"
		],
		"pt": "партнёр",
		"C": [
			[
				"Республика Корея",
				[
					"Statistics Korea — Statistics Training Institute",
					"Statistics Korea — Statistics Research Institute"
				]
			],
			[
				"Республика Польша",
				[
					"Университет WSB",
					"Гданьский университет"
				]
			],
			[
				"Кыргызская Республика",
				[
					"Национальный статистический комитет Кыргызской Республики"
				]
			],
			[
				"Республика Казахстан",
				[
					"Южно-Казахстанский университет им. М. Ауэзова",
					"Казахский университет экономики, финансов и международной торговли",
					"Университет имени Ахмеда Ясави",
					"Алматинская академия экономики и статистики"
				]
			],
			[
				"Республика Таджикистан",
				[
					"Горно-металлургический институт Таджикистана",
					"Худжандский государственный университет им. академика Б. Гафурова",
					"Российско-Таджикский (Славянский) университет"
				]
			],
			[
				"Российская Федерация",
				[
					"Уральский федеральный университет",
					"Институт стран СНГ"
				]
			]
		]
	},
	"en": {
		"s": [
			"Areas of cooperation",
			"Partner countries and organisations"
		],
		"rt": [
			"2",
			"areas of cooperation"
		],
		"B": [
			[
				"Area 1",
				"Cooperation with foreign research organisations and universities",
				[
					"CIS countries",
					"Other countries"
				]
			],
			[
				"Area 2",
				"Cooperation with local research organisations and universities",
				[
					"Research organisations",
					"Universities"
				]
			]
		],
		"st": [
			[
				"partner countries"
			],
			[
				"partner organisations"
			],
			[
				"CIS countries"
			]
		],
		"all": "All",
		"g": [
			"Foreign",
			"CIS"
		],
		"pt": "partners",
		"C": [
			[
				"Republic of Korea",
				[
					"Statistics Korea — Statistics Training Institute",
					"Statistics Korea — Statistics Research Institute"
				]
			],
			[
				"Republic of Poland",
				[
					"WSB University",
					"University of Gdańsk"
				]
			],
			[
				"Kyrgyz Republic",
				[
					"National Statistical Committee of the Kyrgyz Republic"
				]
			],
			[
				"Republic of Kazakhstan",
				[
					"M. Auezov South Kazakhstan University",
					"Kazakh University of Economics, Finance and International Trade",
					"Khoja Akhmet Yassawi University",
					"Almaty Academy of Economics and Statistics"
				]
			],
			[
				"Republic of Tajikistan",
				[
					"Mining and Metallurgical Institute of Tajikistan",
					"Khujand State University named after B. Gafurov",
					"Russian-Tajik (Slavonic) University"
				]
			],
			[
				"Russian Federation",
				[
					"Ural Federal University",
					"Institute of CIS Countries"
				]
			]
		]
	}
}
