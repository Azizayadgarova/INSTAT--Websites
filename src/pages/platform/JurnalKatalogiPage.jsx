import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import bgGlow from '@/assets/bgImg/Background (1).png'
import { Button2 } from '../../components/shared/Button2'
import AsyncBoundary from '../../components/shared/AsyncBoundary'
import { editionsApi, journalSectionsApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { useSiteList } from '@/hooks/useSiteList'
import { toEdition } from '@/utils/siteContent'
import {
	FilterBar,
	Pagination,
	JournalCard,
	COVERS,
	SECTIONS_FALLBACK,
	ALL_SECTION,
	toSection,
	SEARCH_DEBOUNCE_MS,
} from '../../components/ElektronJurnal'

const JurnalKatalogiPage = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	// Qidiruv debounce qilinadi — har harfda emas, yozish to'xtagach so'rov ketadi.
	const [searchInput, setSearchInput] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	useEffect(() => {
		const id = setTimeout(() => setDebouncedSearch(searchInput.trim()), SEARCH_DEBOUNCE_MS)
		return () => clearTimeout(id)
	}, [searchInput])

	const [sectionId, setSectionId] = useState(ALL_SECTION)
	const [sectionOpen, setSectionOpen] = useState(false)
	const [page, setPage] = useState(1)

	useEffect(() => {
		setPage(1)
	}, [debouncedSearch, sectionId])

	// Bo'limlar ro'yxati — /journal-sections/items/all/ dan bir marta olinadi
	const { items: sectionItems } = useSiteList('journal-sections', journalSectionsApi, toSection, SECTIONS_FALLBACK)
	const sections = useMemo(
		() => [{ id: ALL_SECTION, name: t('pages.jurnalKatalogiPage.barcha_bolimlar', "Barcha bo'limlar") }, ...sectionItems],
		[sectionItems, t],
	)
	const sectionLabel = sections.find(s => s.id === sectionId)?.name ?? sections[0].name

	// Nashrlar — /editions/items/active/ (sahifalangan), qidiruv backendga uzatiladi
	const fetchEditions = async () => {
		const params = { search: debouncedSearch, page }
		if (sectionId !== ALL_SECTION) params.journal_section = sectionId
		const res = await editionsApi.getAll(params)
		return {
			items: res.items ?? [],
			meta: res.meta,
		}
	}
	const { data, loading, error, retry } = useApiResource(fetchEditions, [debouncedSearch, sectionId, page])

	// `thumbnail` majburiy emas — bo'sh bo'lsa maketdagi rasmlar navbatma-navbat
	const displayed = (data?.items ?? []).map((e, i) => {
		const j = toEdition(e)
		return { ...j, img: j.img || COVERS[i % COVERS.length] }
	})
	const totalPages = Math.max(1, data?.meta?.last_page ?? 1)
	const totalCount = data?.meta?.total ?? 0

	return (
		<section
			style={{
				width: '100%',
				backgroundColor: 'rgba(var(--bg-rgb),1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				position: 'relative',
				overflow: 'hidden',
				paddingTop: '140px',
				paddingBottom: '100px',
			}}
		>
			<img
				src={bgGlow}
				alt=''
				aria-hidden='true'
				style={{
					position: 'absolute',
					top: 0,
					left: '50%',
					transform: 'translateX(-50%)',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center top',
					zIndex: 0,
					pointerEvents: 'none',
				}}
				loading='lazy'
				decoding='async'
			/>

			{/* Header */}
			<div
				style={{
					position: 'relative',
					zIndex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					gap: '20px',
					maxWidth: '720px',
					padding: '0 24px',
					marginBottom: '40px',
				}}
			>
				<Button2 text={t('pages.jurnalKatalogiPage.jurnallar', 'Jurnallar')} />

				<h1
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 600,
						fontSize: 'clamp(28px,4vw,48px)',
						lineHeight: 1.1,
						color: '#fff',
						margin: 0,
						letterSpacing: '-0.02em',
					}}
				>
					{t('pages.jurnalKatalogiPage.nufuzli_jurnallar_va_songgi_nashrlar', "Nufuzli jurnallar va so'nggi nashrlar")}
				</h1>

				<p
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '140%',
						color: 'rgba(202,202,206,1)',
						maxWidth: '500px',
						margin: 0,
					}}
				>
					{t('pages.jurnalKatalogiPage.platformada_chop_etilayotgan_yetakchi', 'Platformada chop etilayotgan yetakchi ilmiy jurnallar hamda ularning eng yangi sonlari bilan tanishing.')}
				</p>
			</div>

			<div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px' }}>
				<FilterBar
					search={searchInput}
					setSearch={setSearchInput}
					sectionId={sectionId}
					setSectionId={setSectionId}
					sectionLabel={sectionLabel}
					sections={sections}
					sectionOpen={sectionOpen}
					setSectionOpen={setSectionOpen}
				/>
			</div>

			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				skeleton={
					<div
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center md:justify-items-stretch'
						style={{ gap: '20px', marginBottom: '48px', position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px' }}
					>
						{Array.from({ length: 8 }, (_, i) => (
							<div key={`sk${i}`} style={{ width: '100%', maxWidth: '282px', height: '454px', borderRadius: '20px', backgroundColor: 'rgba(22,27,38,1)' }} />
						))}
					</div>
				}
			>
				<div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center md:justify-items-stretch'
					style={{
						gap: '20px',
						marginBottom: '48px',
						position: 'relative',
						zIndex: 1,
						width: '100%',
						maxWidth: '1200px',
					}}
				>
					{displayed.length > 0 ? displayed.map(j => (
						<JournalCard key={j.id} j={j} onClick={() => navigate(`/platform/jurnal/${j.id}`)} />
					)) : (
						<div style={{
							gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0',
							fontFamily: 'var(--font-display)',
							fontSize: '16px', color: 'rgba(150,160,180,1)',
						}}>
							{t('pages.jurnalKatalogiPage.bu_qidiruv_boyicha_jurnal_topilmadi', "Bu qidiruv bo'yicha jurnal topilmadi")}
						</div>
					)}
				</div>

				{totalCount > 0 && <Pagination page={page} setPage={setPage} total={totalPages} />}
			</AsyncBoundary>
		</section>
	)
}

export default JurnalKatalogiPage
