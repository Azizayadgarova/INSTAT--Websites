import img1 from '@/assets/2.webp'
import img2 from '@/assets/3.webp'
import img3 from '@/assets/4.webp'
import img4 from '@/assets/5.webp'
import img5 from '@/assets/6.webp'

const CARDS = [
	{
		src: img1,
		backTitle: 'Ilmiy maqolalar',
		backDesc: "Recenzentdan o'tgan sifatli ilmiy ishlar bazasi.",
	},
	{
		src: img2,
		backTitle: 'Xalqaro jurnallar',
		backDesc: "Scopus va Web of Science ro'yxatidagi jurnallar.",
	},
	{
		src: img3,
		backTitle: 'Yagona platforma',
		backDesc: "Nashr qilish, o'qish va hamkorlik — bir joyda.",
	},
	{
		src: img4,
		backTitle: 'Tezkor nashr',
		backDesc: 'Maqolangizni tez va oson nashr qildiring.',
	},
	{
		src: img5,
		backTitle: 'Karyera imkoniyati',
		backDesc: 'Ilmiy faoliyatingizni rivojlantiring va tan oling.',
	},
]

const JOURNALS = [
	{ id: 'journal-1', img: img1, title: "O'zbekistonda qurilish",                          year: '2020 yil 1-son', author: 'Afzal Pulatov',    category: 'Sanoat'           },
	{ id: 'journal-2', img: img2, title: "O'zbekistonda kichik tadbirkorlik",               year: '2020 yil 1-son', author: 'Dilnoza Yusupova', category: 'Makroiqtisodiyot' },
	{ id: 'journal-3', img: img3, title: 'Ayollar va erkaklar',                             year: '2022 yil 1-son', author: 'Malika Xasanova',  category: 'Demografiya'      },
	{ id: 'journal-4', img: img4, title: "O'zbekiston raqamlarda",                          year: '2022 yil 1-son', author: 'Jahongir Toshmatov', category: 'Makroiqtisodiyot' },
	{ id: 'journal-5', img: img5, title: "O'zbekistonda axborotlashgan jamiyat rivojlanishi", year: '2022 yil 1-son', author: 'Afzal Pulatov',   category: "Ta'lim"           },
	{ id: 'journal-6', img: img1, title: "O'zbekistonda ilm-fan va innovatsion faoliyat",   year: '2022 yil 1-son', author: 'Dilnoza Yusupova', category: "Ta'lim"           },
	{ id: 'journal-7', img: img2, title: "O'zbekistonda transport va aloqa",                year: '2018 yil 1-son', author: 'Jahongir Toshmatov', category: 'Sanoat'         },
	{ id: 'journal-8', img: img3, title: "O'zbekiston sanoati",                             year: '2020 yil 1-son', author: 'Malika Xasanova',  category: 'Sanoat'           },
	{ id: 'journal-9', img: img4, title: "O'zbekistonda qishloq xo'jaligi",                year: '2021 yil 1-son', author: 'Afzal Pulatov',    category: "Qishloq xo'jaligi" },
	{ id: 'journal-10', img: img5, title: "Demografik o'zgarishlar tahlili",                year: '2021 yil 2-son', author: 'Malika Xasanova',  category: 'Demografiya'      },
	{ id: 'journal-11', img: img1, title: "Milliy ta'lim tizimi rivojlanishi",              year: '2023 yil 1-son', author: 'Dilnoza Yusupova', category: "Ta'lim"           },
	{ id: 'journal-12', img: img2, title: "Qishloq xo'jaligi statistikasi",                 year: '2022 yil 3-son', author: 'Jahongir Toshmatov', category: "Qishloq xo'jaligi" },
]

const AUTHORS = [
	'Afzal Pulatov',
	'Dilnoza Yusupova',
	'Jahongir Toshmatov',
	'Malika Xasanova',
]
const CATEGORIES = [
	'Makroiqtisodiyot',
	"Qishloq xo'jaligi",
	"Ta'lim",
	'Demografiya',
	'Sanoat',
]

export { CARDS, JOURNALS, AUTHORS, CATEGORIES }
