import { useTranslation } from 'react-i18next'
import {
	siteCorruptionDocsApi,
	siteCorruptionVideosApi,
	siteCorruptionWorksApi,
} from '@/api/siteContent.api'
import Block from '@/components/home/Block'
import AntiCorruption from '@/components/inner/AntiCorruption'
import InnerPage from '@/components/inner/InnerPage'
import DocList from '@/components/shared/DocList'
import { useSiteData } from '@/hooks/useSiteData'
import { useSiteList } from '@/hooks/useSiteList'
import { pickLangLabel, pickPath, toDoc, toVideo } from '@/utils/siteContent'

/**
 * Komissiya tarkibi va vazifalari — yangi dizaynda statik (AntiCorruption, prototip: page.html).
 * Backend'dan keladigan qo'shimcha materiallar (ishonch telefoni rasmi, ishlar, hujjatlar, videolar)
 * pastda alohida bo'limlar sifatida chiqadi — faqat ma'lumot bo'lganda.
 */
const QarshiKurash = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: kv } = useSiteData(d => d.byModuleKey.corruption ?? {})
	const phoneRecord = kv?.corruption_phone
	const attachment = pickPath(phoneRecord)

	const { items: works } = useSiteList('site-corruption-works', siteCorruptionWorksApi, toDoc)
	const { items: docs } = useSiteList('site-corruption-docs', siteCorruptionDocsApi, toDoc)
	const { items: videos } = useSiteList('site-corruption-videos', siteCorruptionVideosApi, toVideo)

	// 01-02 — statik bo'limlar; qo'shimcha bo'limlar 03 dan boshlab ketma-ket raqamlanadi
	let n = 2
	const next = () => String(++n).padStart(2, '0')

	return (
		<InnerPage title={t('menu.about.qarshi-kurash')}>
			<AntiCorruption />

			{attachment && (
				<Block n={next()} title={pickLangLabel(phoneRecord, lang) || undefined}>
					<img src={attachment} alt={pickLangLabel(phoneRecord, lang)} loading='lazy' decoding='async' style={{ maxWidth: '100%', borderRadius: 18 }} />
				</Block>
			)}

			{works.length > 0 && (
				<Block n={next()} title={t('pages.qarshiKurash.works')}>
					<DocList items={works} />
				</Block>
			)}

			{docs.length > 0 && (
				<Block n={next()} title={t('pages.qarshiKurash.docs')}>
					<DocList items={docs} />
				</Block>
			)}

			{videos.length > 0 && (
				<Block n={next()} title={t('pages.qarshiKurash.videos')}>
					<ul style={{ display: 'grid', gap: 12, listStyle: 'none', margin: 0, padding: 0 }}>
						{videos.map(video => (
							<li
								key={video.id}
								style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '18px 22px' }}
							>
								<p style={{ color: 'var(--white)', fontSize: 15, lineHeight: 1.6 }}>{video.label}</p>
								{/* `link` to'liq URL bo'lgandagina havola — backendda hozir test qiymati bor */}
								{/^https?:\/\//i.test(video.link) && (
									<a className='btn btn-g' href={video.link} target='_blank' rel='noopener noreferrer' style={{ marginTop: 12 }}>
										{t('common.watch')}
									</a>
								)}
							</li>
						))}
					</ul>
				</Block>
			)}
		</InnerPage>
	)
}
export default QarshiKurash
