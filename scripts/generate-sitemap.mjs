/**
 * sitemap.xml ni marshrutlardan avtomatik yasaydi.
 * Ishga tushirish: npm run sitemap  (build'dan oldin avtomatik chaqiriladi)
 */
import { writeFileSync } from 'node:fs'
import { allRoutes } from '../src/config/menuConfig.js'

const SITE = process.env.VITE_SITE_URL ?? 'https://instat.uz'
const today = new Date().toISOString().slice(0, 10)

const urls = allRoutes
	.map(
		route => `  <url>
    <loc>${SITE}${route === '/' ? '' : route}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
	)
	.join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync('public/sitemap.xml', xml)
console.log(`sitemap.xml yaratildi — ${allRoutes.length} ta URL`)
