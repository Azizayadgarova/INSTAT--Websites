import img1 from '@/assets/kutubxona1.png'
import img2 from '@/assets/kutubxona2.png'
import img3 from '@/assets/kutubxona3.png'
import img4 from '@/assets/kutubxona4.png'
import img5 from '@/assets/kutubxona5.png'
import img6 from '@/assets/image1.png'
import img7 from '@/assets/image2.png'
import img8 from '@/assets/image3.png'
import img9 from '@/assets/image4.png'

/**
 * Yangiliklar sahifasi uchun DEMO kontent (maketni ko'rish uchun).
 *
 * DIQQAT: bu haqiqiy yangilik emas — backend `/api/site-posts/items/all/`
 * hozircha bo'sh massiv qaytargani uchun maket ko'rinmay qolmasin deb qo'yilgan.
 * @/pages/matbuot/Yangiliklar faqat `import.meta.env.DEV` da ishlatadi, ya'ni
 * prod build'da bu ro'yxat umuman ko'rinmaydi. Admin panelidan birinchi post
 * kiritilishi bilan API ma'lumoti avtomatik ustun bo'ladi.
 *
 * Shakl — @/utils/siteContent dagi toPost() natijasi bilan bir xil.
 */
const BODY = `
<p>Institut faoliyati O'zbekiston Respublikasi Prezidentining 2025-yil 13-martdagi "Milliy statistika tizimi mutaxassislari malakasini oshirish hamda sohaga raqamli texnologiyalarni joriy etishni yanada jadallashtirish orqali yuqori samaradorlikka erishish chora-tadbirlari to'g'risida" PQ-103-son qaroriga muvofiq yuritiladi.</p>
<p>Platformada tinglovchilar uchun onlayn kurslar, raqamli kutubxona, elektron jurnal va mikroma'lumotlar bazasi yagona tizimga birlashtirilgan. Har bir kurs yakunida tinglovchiga rasmiy sertifikat beriladi.</p>
<p>Institut xalqaro tashkilotlar bilan hamkorlikda statistika sohasidagi ilg'or metodologiyalarni o'rganish va joriy etish bo'yicha muntazam seminar-treninglar tashkil etib bormoqda.</p>
`.trim()

const TITLES = [
	"Platformadagi eng so'nggi yangilanishlar, yangi kurslar va muhim e'lonlardan xabardor bo'ling",
	"Platformamizdagi eng qiziqarli yangiliklar va foydali yangilanishlar bilan tanishing",
	"Ta'lim jarayonidagi yangiliklar va foydali imkoniyatlarni birinchi bo'lib biling",
	'Kurslar, tadbirlar, tanlovlar va yangi loyihalar haqida dolzarb axborot',
	"Statistika sohasidagi malaka oshirish dasturlari yangi o'quv yiliga tayyor",
	"Raqamli kutubxona fondi yangi ilmiy nashrlar bilan to'ldirildi",
	'Elektron jurnalning navbatdagi soni chop etildi',
	"Mikroma'lumotlar bazasidan foydalanish tartibi soddalashtirildi",
	'Xalqaro hamkorlar bilan qo‘shma seminarlar jadvali e’lon qilindi',
]

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9]

export const DEMO_POSTS = TITLES.map((title, i) => ({
	id: `demo-${i + 1}`,
	title,
	body: BODY,
	thumbnail: IMAGES[i % IMAGES.length],
	// Eng yangisi ro'yxat boshida turishi uchun sanalar kamayib boradi
	createdAt: new Date(2026, 0, 23 - i, 10, 0, 0).toISOString(),
}))

export default DEMO_POSTS
