# Qolgan ishlar

## 1. Kontent — yagona katta bo'shliq
12 ta sahifa hali `PagePlaceholder` ("tez kunda") ko'rsatadi va `noindex` bilan belgilangan
(bo'sh sahifa indekslanmasin). Matn tayyor bo'lganda `PagePlaceholder` ni almashtiring:

- `src/pages/Axborot/` — 7 ta
- `src/pages/IlmFan/` — 2 ta
- `src/pages/matbuot/` — 3 ta

## 2. O'rinbosar ma'lumotlar
- `src/config/contacts.js` — telefon, e-mail, manzil, ijtimoiy tarmoq havolalari hozircha
  o'rinbosar. HAQIQIY ma'lumot bilan to'ldiring (faqat shu fayl — Navbar, Footer va
  Tuzilma shundan o'qiydi).
- `src/components/BoshIshStatistika.jsx` — statistika yorliqlari "Ever wondered" deb turibdi
  (shablon qoldig'i). Haqiqiy matn bilan almashtiring.
- `src/data/books.data.js`, `courses.data.js` — muqova rasmlari Unsplash'dan olingan
  (tashqi havola). O'z rasmlaringizga o'tkazing.

## 3. Animatsiya kutubxonalari (ixtiyoriy)
`gsap` (114 KB) faqat 2 ta komponentda ishlatiladi: `Testimonial` va `HeroZoom` — ikkalasi ham
cheksiz marquee tween'lari uchun (`gsap.utils.unitize`, `getTweensOf`). Ularni `framer-motion`ga
ko'chirish mumkin, shunda bitta kutubxona qoladi. Hozir zarar yo'q: `gsap` alohida chunk'da va
faqat o'sha komponentlar yuklanganda tortiladi.

## 4. Kelajakdagi matnlar uchun qoida
Yangi matn qo'shsangiz, uni JSX ga to'g'ridan-to'g'ri YOZMANG:
- UI matni → `src/i18n/uz.json` + `t('...')`
- Kontent (kurs, kitob, vakansiya...) → `src/data/*.js` + `useDataText`

`npm test` uch tilning to'liqligini tekshiradi — ru/en tarjimasi tushib qolsa, CI yiqiladi.
