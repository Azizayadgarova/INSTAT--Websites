import { useTranslation } from 'react-i18next'
import {
	siteCorruptionDocsApi,
	siteCorruptionVideosApi,
	siteCorruptionWorksApi,
} from '@/api/siteContent.api'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import DocList from '@/components/shared/DocList'
import RichContent from '@/components/shared/RichContent'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useSiteData } from '@/hooks/useSiteData'
import { useSiteList } from '@/hooks/useSiteList'
import { pickLang, pickPath, toDoc, toVideo } from '@/utils/siteContent'

const Person = ({ role, name }) =>
	name ? (
		<div style={{ background: 'rgba(var(--card-rgb),1)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14, padding: '18px 22px' }}>
			<p style={{ color: 'rgba(var(--muted-rgb),1)', fontSize: 13, margin: '0 0 6px' }}>{role}</p>
			<p style={{ color: '#fff', fontSize: 16, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{name}</p>
		</div>
	) : null

const Heading = ({ children }) => (
	<h2 style={{ color: '#fff', fontSize: 20, fontWeight: 600, margin: '32px 0 14px' }}>{children}</h2>
)

/** Bo'lim faqat ma'lumot kelganda ko'rinadi — bo'sh sarlavha chiqmasin. */
const Block = ({ title, items, children }) =>
	items.length > 0 ? (
		<>
			<Heading>{title}</Heading>
			{children}
		</>
	) : null

const QarshiKurash = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: kv, loading, error, retry } = useSiteData(d => d.byModuleKey.corruption ?? {})

	const val = key => pickLang(kv?.[key], lang)
	const attachment = pickPath(kv?.corruption_phone)

	// Uch alohida endpoint — site-data'dagi matnlarga qo'shimcha ro'yxatlar.
	// Bo'sh qaytsa tegishli bo'lim umuman ko'rsatilmaydi (Block).
	const { items: works } = useSiteList('site-corruption-works', siteCorruptionWorksApi, toDoc)
	const { items: docs } = useSiteList('site-corruption-docs', siteCorruptionDocsApi, toDoc)
	const { items: videos } = useSiteList('site-corruption-videos', siteCorruptionVideosApi, toVideo)

	return (
		<section>
			<Seo title={t('menu.about.qarshi-kurash')} />
			<AsyncBoundary loading={loading} error={error} onRetry={retry}
				isEmpty={
					(!kv || Object.keys(kv).length === 0) &&
					works.length === 0 && docs.length === 0 && videos.length === 0
				}
				skeleton={<SkeletonText lines={6} />}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
					<Person role={kv?.corruption_chairman?.label} name={val('corruption_chairman')} />
					<Person role={kv?.corruption_deputy_chairman?.label} name={val('corruption_deputy_chairman')} />
					<Person role={kv?.corruption_secretary?.label} name={val('corruption_secretary')} />
				</div>
				{val('corruption_tasks') && (
					<>
						<h2 style={{ color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
							{kv?.corruption_tasks?.label}
						</h2>
						<RichContent html={val('corruption_tasks')} />
					</>
				)}
				{attachment && (
					<img src={attachment} alt={kv?.corruption_phone?.label ?? ''} loading='lazy' decoding='async'
						style={{ maxWidth: '100%', borderRadius: 12, marginTop: 24 }} />
				)}

				<Block title={t('pages.qarshiKurash.works')} items={works}>
					<DocList items={works} />
				</Block>

				<Block title={t('pages.qarshiKurash.docs')} items={docs}>
					<DocList items={docs} />
				</Block>

				<Block title={t('pages.qarshiKurash.videos')} items={videos}>
					<ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', margin: 0, padding: 0 }}>
						{videos.map(video => (
							<li key={video.id}
								style={{ background: 'rgba(var(--card-rgb),1)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14, padding: '18px 22px' }}>
								<p style={{ color: '#fff', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{video.label}</p>
								{/* `link` to'liq URL bo'lgandagina havola — backendda hozir test qiymati bor */}
								{/^https?:\/\//i.test(video.link) && (
									<a href={video.link} target='_blank' rel='noopener noreferrer'
										style={{ display: 'inline-block', marginTop: 12, padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(var(--blue-rgb),0.4)', background: 'rgba(var(--blue-rgb),0.1)', color: '#fff', textDecoration: 'none', fontSize: 14 }}>
										{t('common.watch')}
									</a>
								)}
							</li>
						))}
					</ul>
				</Block>
			</AsyncBoundary>
		</section>
	)
}
export default QarshiKurash
