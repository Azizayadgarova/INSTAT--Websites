/**
 * "Oliy ta'lim" sahifasi — tayanch doktorantlar va doktorantlar (DSc) ma'lumoti.
 *
 * Bu ma'lumot ilgari backend (site-data / science / postgraduate) dan buzilgan
 * HTML sifatida kelib, ustunlari bir-biriga yopishib qolgan holda chiqardi.
 * Shu sababli u shu yerda toza, strukturalangan ko'rinishga keltirildi.
 * Backend to'g'ri jadval qaytara boshlasa, bu faylni o'chirib, yana
 * ContentPage'ga qaytish mumkin.
 */

const INSTITUTE = [
	'O‘zbekiston Respublikasi milliy statistika qo‘mitasi',
	'Kadrlar malakasini oshirish va statistik tadqiqotlar instituti',
]

export const postgraduate = {
	institute: INSTITUTE,
	sections: [
		{
			stage: '3-kurs',
			title: '3-kurs tayanch doktorantlar to‘g‘risida ma’lumot',
			groups: [
				{
					type: 'Tayanch doktorantura',
					rows: [
						{
							no: 1,
							name: 'Kamolov Xudoyor Zoirovich',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'Turizm sektorining iqtisodiy rivojlanishini statistik tadqiqoti (Buxoro viloyati misolida)',
							advisor: 'i.f.d., prof. G‘ayibnazarov Baxodir Karimovich',
						},
						{
							no: 2,
							name: 'Yadgarova Nigora Rixsulla qizi',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'Tashqi iqtisodiy faoliyatda kichik biznes subyektlari o‘rnini statistik baholash (O‘zbekiston Respublikasi misolida)',
							advisor: 'i.f.d., prof. G‘ayibnazarov Baxodir Karimovich',
						},
						{
							no: 3,
							name: 'Ajamilova Nigora Asametdinovna',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'O‘zbekistonda kichik biznes va xususiy tadbirkorlik rivojlanishini iqtisodiy statistik tahlili',
							advisor: 'i.f.n., dotsent Jumayev Qurbonmurod Xurramovich',
						},
						{
							no: 4,
							name: 'Abdujalilova Bibisora Bahodir qizi',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'O‘zbekiston Respublikasida tashqi savdo statistikasi ko‘rsatkichlarini takomillashtirish',
							advisor: 'akademik i.f.d., prof. Gulyamov Saidaxror Saidaxmedovich',
						},
						{
							no: 5,
							name: 'Nematova Moxinur Farxod qizi',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'Korporativ boshqaruvda raqamli texnologiyalardan foydalanishni takomillashtirish',
							advisor: 'i.f.d., prof. Kenjabayev Aman Turg‘unovich',
						},
						{
							no: 6,
							name: 'Xoliqova Oydin Olimjonovna',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'Xizmatlar sohasini statistik tahlilida raqamli texnologiyalardan foydalanishni takomillashtirish',
							advisor: 't.f.n., dotsent Xayitmatov O‘ktam Turg‘unovich',
						},
						{
							no: 7,
							name: 'Yusupov Nizomiddin Ro‘zimurod o‘g‘li',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'Qishloq xo‘jaligini statistik tahlilida raqamli texnologiyalardan foydalanish usullarini takomillashtirish',
							advisor: 'akademik i.f.d., prof. Gulyamov Saidasror Saidaxmedovich',
						},
						{
							no: 8,
							name: 'Mirziyodova Gulnozaxon Ayubxon qizi',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'Korxona biznes-jarayonlarini raqamli texnologiyalar orqali takomillashtirish',
							advisor: 'akademik i.f.d., prof. Gulyamov Saidaxror Saidaxmedovich',
						},
					],
				},
				{
					type: 'Doktorantura (DSc)',
					rows: [
						{
							no: 11,
							name: 'Nazarov Nazar G‘ulom o‘g‘li',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'O‘zbekiston Respublikasida kichik biznesning iqtisodiy faoliyatini statistik tadqiq qilish uslubiyotini takomillashtirish',
							advisor: 'i.f.d., prof. G‘ayibnazarov Baxodir Karimovich',
						},
					],
				},
			],
		},
		{
			stage: '2-kurs',
			title: '2-kurs tayanch doktorantlar to‘g‘risida ma’lumot',
			groups: [
				{
					type: 'Tayanch doktorantura',
					rows: [
						{
							no: 1,
							name: 'Nematova Gulchehraxon Furqatjon qizi',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'Inson kapitali samaradorligini statistik baholash metodologiyasini takomillashtirish',
							advisor: 'i.f.d. Siddiqov Alisher Juraqulovich',
						},
						{
							no: 2,
							name: 'Nematov Dilshodjon Muxtor o‘g‘li',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'O‘zbekiston Respublikasida turizm klasterlari rivojlanishining statistik tadqiqi',
							advisor: 'i.f.d. (DSc), dots. Qahhorov Otabek Siddiqovich',
						},
						{
							no: 3,
							name: 'Tojiyeva Muxabbatxon Mansurjon qizi',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'Kichik biznes sohasi samaradorligini statistik tadqiqoti (Farg‘ona viloyati misolida)',
							advisor: 'i.f.f.n., dotsent Sunnatov Muxtor Nematovich',
						},
						{
							no: 4,
							name: 'Mambetsapaev Kurbaniyaz Ayniyazovich',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'Ijtimoiy infratuzilmaning rivojlanishini statistik o‘rganish (Qoraqalpog‘iston Respublikasi misolida)',
							advisor: 'i.f.n., k.i.x. Abduvaliev Abdulaziz Abduvaliyev',
						},
						{
							no: 5,
							name: 'Suvonova Munira Tulqin qizi',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'Kichik biznes va xususiy tadbirkorlikning statistik hisobini takomillashtirish',
							advisor: 'i.f.d., prof. Abugapparov Abduxalil',
						},
						{
							no: 6,
							name: 'Begalova Durdona Baxodirovna',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'O‘zbekiston Respublikasi aholisining tabiiy harakatini statistik tadqiq etish',
							advisor: 'i.f.d., prof. Toshmatov Zoyir Xudayberganovich',
						},
						{
							no: 7,
							name: 'Allaniyazova Aysara Muratovna',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'Sovershenstvovaniye statisticheskogo analiza promyshlennoy deyatelnosti metodom indeksov',
							advisor: 'i.f.d., prof. G‘ayibnazarov Bahodir Karimovich',
						},
						{
							no: 8,
							name: 'Jabbarova Diyoraxon Abror qizi',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'O‘zbekiston statistika tizimida katta hajmdagi ma’lumotlar texnologiyalarini qo‘llash',
							advisor: 'i.f.d., prof. Begalov Bahodir Abdusalomovich',
						},
						{
							no: 9,
							name: 'Maxmudov Abbos Sherali o‘g‘li',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'O‘zbekistonda qishloq xo‘jaligida raqamli texnologiyalarni joriy etishning iqtisodiy samaradorligi va istiqbollari',
							advisor: 'akademik i.f.d., prof. Gulyamov Saidasror Saidaxmedovich',
						},
						{
							no: 10,
							name: 'Zokirov Sanjar Zohidjon o‘g‘li',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'Kichik va o‘rta biznes korxonalarida IT infratuzilmani bulutli texnologiyalarga o‘tkazish orqali operatsion xarajatlarni kamaytirish va samaradorlikni oshirish modellarini o‘rganish',
							advisor: 'akademik i.f.d., prof. Gulyamov Saidasror Saidaxmedovich',
						},
						{
							no: 11,
							name: 'Ibragimov Salohiddin Uralbek o‘g‘li',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'Qishloq xo‘jaligida raqamlashtirish jarayonlarining iqtisodiy samaradorligi va agrar sektoridagi rivojlanish yo‘nalishlari',
							advisor: 'i.f.d., prof. Kenjabayev Aman Turg‘unovich',
						},
						{
							no: 12,
							name: 'Dadajonova Madina Ravshan qizi',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'O‘zbekiston statistika tizimida katta hajmdagi ma’lumotlar texnologiyalarini qo‘llash samaradorligi',
							advisor: 'akademik i.f.d., prof. Gulyamov Saidaxror Saidaxmedovich',
						},
						{
							no: 13,
							name: 'Kucharova Shaxlo Sobir qizi',
							spec: '08.00.14 — Iqtisodiyotda axborot tizimlari va texnologiyalari',
							topic: 'Meva–sabzavot yetishtirishda raqamli monitoring tizimlarini joriy qilish orqali sifat va hosildorlikni oshirish',
							advisor: 'akademik i.f.d., prof. Gulyamov Saidaxror Saidaxmedovich',
						},
					],
				},
				{
					type: 'Doktorantura (DSc)',
					rows: [
						{
							no: 14,
							name: 'Yuldashev Eldor Ilxomjonovich',
							spec: '08.00.06 — Ekonometrika va statistika',
							topic: 'O‘zbekiston Respublikasida tashqi savdoning rivojlanish jarayonlarini statistik tadqiq etishning ilmiy-metodologik asoslari',
							advisor: 'i.f.d., prof. G‘ayibnazarov Bahodir Karimovich',
						},
					],
				},
			],
		},
	],
}

export default postgraduate
