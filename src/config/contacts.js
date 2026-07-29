/**
 * Saytdagi YAGONA kontakt manbasi. Navbar, Footer va Tuzilma shu yerdan o'qiydi.
 *
 * ⚠️ TODO: qiymatlar hozircha o'rinbosar. Ilgari kodda shablondan qolgan
 * soxta ma'lumotlar turgan edi (+44 207 112 82 85, hello@lecalc.io,
 * "508 Bridle Avenue Newnan, GA", Hilolmed@gmail.com). Ularni institutning
 * HAQIQIY ma'lumotlari bilan almashtiring — faqat shu fayl tahrirlansa yetarli.
 */
export const contacts = {
	phone: '+998 71 000 00 00',
	phoneHref: 'tel:+998710000000',
	email: 'info@instat.uz',
	emailHref: 'mailto:info@instat.uz',
	fax: '',
	transport: '',
	address: {
		line1: 'Toshkent shahri,',
		line2: '... ko‘chasi, 1-uy',
		get full() {
			return `${this.line1} ${this.line2}`
		},
	},
	social: {
		telegram: 'https://t.me/',
		facebook: 'https://facebook.com/',
		instagram: 'https://instagram.com/',
		twitter: 'https://x.com/',
		youtube: 'https://youtube.com/',
		linkedin: 'https://linkedin.com/',
	},
}

export default contacts
