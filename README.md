# INSTAT — Raqamli ta'lim platformasi

O'zbekiston Respublikasi Milliy Statistika Qo'mitasi instituti sayti.
React 18 + Vite 5 + Tailwind CSS v4.

## Ishga tushirish

```bash
nvm use              # Node 22 (.nvmrc)
npm ci
cp .env.example .env.local   # API manzilini to'ldiring
npm run dev
```

## Skriptlar

| Buyruq | Vazifasi |
|---|---|
| `npm run dev` | Dev server (HMR) |
| `npm run build` | `sitemap.xml` generatsiyasi + prod build → `dist/` |
| `npm run preview` | Prod build'ni lokal ko'rish |
| `npm run lint` | ESLint (CI'da majburiy) |
| `npm test` | Vitest smoke testlari |
| `npm run sitemap` | `public/sitemap.xml` ni marshrutlardan qayta yasash |

## Muhit o'zgaruvchilari

| O'zgaruvchi | Tavsif |
|---|---|
| `VITE_API_URL` | Backend API manzili (`src/api/axios.js`) |
| `VITE_SITE_URL` | Kanonik domen — SEO meta va sitemap uchun |

Prod qiymatlari GitHub → Settings → Variables/Secrets orqali beriladi.

## Struktura

```
src/
├── api/          axios instansiyasi + endpointlar (env orqali sozlanadi)
├── app/          router.jsx — routes + createBrowserRouter
├── components/
│   └── shared/   Seo, ErrorBoundary, SectionShell, PagePlaceholder,
│                 LanguageSwitcher, LazyLoad, ...
├── config/       menuConfig (marshrutlar), contacts
├── data/         statik kontent (kurslar, kitoblar, ...)
├── hooks/        useMenu, useIntersectionObserver, useHeroPhase
├── i18n/         uz / ru / en tarjimalari
├── layouts/      MainLayout, SecondLayout, SidebarLayout
├── pages/        marshrut sahifalari
└── styles/       index.css — Tailwind v4 (@theme) + dizayn tokenlari
```

## Ko'p tillilik (uz / ru / en)

Ikki xil matn bor va ikkalasi ham tarjima qilinadi:

**1. UI matni** — tugmalar, sarlavhalar, menyu. `src/i18n/{uz,ru,en}.json` ichida,
komponentda `const { t } = useTranslation()` orqali:

```jsx
<h2>{t('components.faqSection.savollar')}</h2>
```

**2. Kontent** — kurslar, kitoblar, vakansiyalar, FAQ, jurnallar. Struktura `src/data/*.js`
da (o'zbekcha matn = fallback), tarjimalar i18n ichida `data.<to'plam>.<id>.<maydon>` kalitida:

```jsx
const dt = useDataText('jobs')
<h3>{dt(job, 'title')}</h3>   // tarjima yo'q bo'lsa — o'zbekchasi ko'rinadi
```

Til `localStorage` da saqlanadi, `<html lang>` avtomatik yangilanadi.
`npm test` uch tilning to'liqligini tekshiradi.

## Muhim qoidalar

- **Matn qo'shganda** — uni to'g'ridan-to'g'ri JSX ga yozmang, `src/i18n/*.json` ga kalit qo'shib `t('...')` bilan chiqaring.
- **Rasm qo'shganda** — WebP formatida, kengligi ≤1920px. Barcha `<img>` da `alt` bo'lishi shart.
- **Yangi sahifa** — `src/app/router.jsx` ga `lazy()` bilan qo'shing, `<Seo />` komponentini ishlating, marshrutni `src/config/menuConfig.js` ga yozing (sitemap avtomatik yangilanadi).
- **Tailwind v4** — `tailwind.config.js` YO'Q. Konfiguratsiya `src/styles/index.css` ichidagi `@theme` blokida.

## Deploy

`main` ga push → GitHub Actions: `lint` → `build` → serverga relizni yuklash →
symlink'ni atomik almashtirish (`/var/www/current`). Nginx `root /var/www/current`
va SPA fallback (`try_files $uri /index.html`) bilan sozlangan bo'lishi kerak.

## Qolgan ishlar

`TODO-alt.md` va `TODO.md` fayllariga qarang.
