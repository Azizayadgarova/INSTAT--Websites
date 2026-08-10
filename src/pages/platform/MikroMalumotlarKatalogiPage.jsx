import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import bgGlow from '@/assets/bgImg/Background (1).png'
import { Button2 } from '../../components/shared/Button2'
import BlurWords from '../../components/shared/BlurWords'
import AsyncBoundary from '../../components/shared/AsyncBoundary'
import { dataReportsApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import {
	DataCard,
	Pagination,
	toPublication,
	isMicroData,
	ITEMS_PER_PAGE,
} from '../../components/NufuzliNashrlar'

const ALL_CATEGORY = 'all'
const SEARCH_DEBOUNCE_MS = 400

const MikroMalumotlarKatalogiPage = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const [searchInput, setSearchInput] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	useEffect(() => {
		const id = setTimeout(() => setDebouncedSearch(searchInput.trim()), SEARCH_DEBOUNCE_MS)
		return () => clearTimeout(id)
	}, [searchInput])

	const [categoryId, setCategoryId] = useState(ALL_CATEGORY)
	const [catOpen, setCatOpen] = useState(false)
	const [page, setPage] = useState(1)

	useEffect(() => {
		setPage(1)
	}, [debouncedSearch, categoryId])

	const { data, loading, error, retry } = useApiResource(
		() => dataReportsApi.getAll({ per_page: 100 }),
		[],
	)

	const items = useMemo(
		() =>
			(data?.items ?? [])
				.filter(report => report.is_active !== false && isMicroData(report))
				.map(report => toPublication(report, lang)),
		[data, lang],
	)

	const categories = useMemo(() => {
		const unique = Array.from(new Set(items.map(i => i.category))).filter(Boolean)
		return [{ id: ALL_CATEGORY, label: t('pages.mikroMalumotlarKatalogiPage.barcha_sohalar', "Barcha sohalar") }, ...unique.map(c => ({ id: c, label: c }))]
	}, [items, t])
	const categoryLabel = categories.find(c => c.id === categoryId)?.label ?? categories[0].label

	const filtered = useMemo(() => {
		return items.filter(i => {
			const matchesCategory = categoryId === ALL_CATEGORY || i.category === categoryId
			const matchesSearch = !debouncedSearch || i.title.toLowerCase().includes(debouncedSearch.toLowerCase())
			return matchesCategory && matchesSearch
		})
	}, [items, categoryId, debouncedSearch])

	const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
	const current = Math.min(page, totalPages)
	const displayed = filtered.slice((current - 1) * ITEMS_PER_PAGE, current * ITEMS_PER_PAGE)

	return (
		<section
			className='px-4 md:px-[60px] lg:px-[120px]'
			style={{
				position: 'relative',
				background: 'rgba(10,15,26,1)',
				width: '100%',
				boxSizing: 'border-box',
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
					position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
					width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
					pointerEvents: 'none', zIndex: 0, opacity: 0.6,
				}}
				loading='lazy'
				decoding='async'
			/>

			<div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				{/* Header */}
				<div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
					<Button2 text={t('pages.mikroMalumotlarKatalogiPage.malumotlar', "Ma'lumotlar")} />

					<BlurWords
						text={t('pages.mikroMalumotlarKatalogiPage.mikromalumotlar_katalogi', "Mikroma'lumotlar katalogi")}
						delay={0.1}
						style={{
							fontFamily: 'var(--font-display)', fontWeight: 600,
							fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.1, color: '#fff',
							display: 'block', textAlign: 'center',
						}}
					/>

					<p style={{
						fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.65,
						color: 'rgba(155,163,185,1)', maxWidth: '480px', margin: 0,
					}}>
						{t('pages.mikroMalumotlarKatalogiPage.statistika_agentligi_tomonidan', "Statistika agentligi tomonidan yig'ilgan individual darajadagi ma'lumotlar to'plamlari bilan ishlang va tadqiqotlaringizni boyiting.")}
					</p>
				</div>

				{/* Filter */}
				<div
					className='flex-col md:flex-row w-full'
					style={{
						display: 'flex', alignItems: 'stretch', gap: '12px',
						maxWidth: '800px', margin: '0 auto 40px', position: 'relative', zIndex: 10,
					}}
				>
					<div style={{
						flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
						height: '56px', padding: '0 18px', borderRadius: '14px',
						background: 'rgba(var(--card-rgb),1)', border: '1px solid rgba(31,37,51,1)',
					}}>
						<svg width='18' height='18' viewBox='0 0 24 24' fill='none' style={{ flexShrink: 0 }}>
							<circle cx='11' cy='11' r='7' stroke='rgba(144,157,162,1)' strokeWidth='2' />
							<path d='M16.5 16.5L21 21' stroke='rgba(144,157,162,1)' strokeWidth='2' strokeLinecap='round' />
						</svg>
						<input
							type='text'
							value={searchInput}
							onChange={e => setSearchInput(e.target.value)}
							placeholder={t('pages.mikroMalumotlarKatalogiPage.malumot_nomi_boyicha_qidirish', "Ma'lumot nomi bo'yicha qidirish...")}
							style={{
								flex: 1, background: 'transparent', border: 'none', outline: 'none',
								color: '#fff', fontSize: '14px', fontFamily: 'var(--font-display)',
							}}
						/>
					</div>

					<div
						style={{
							position: 'relative', minWidth: '220px', height: '56px',
							padding: '0 18px', borderRadius: '14px', cursor: 'pointer',
							background: 'rgba(var(--card-rgb),1)', border: '1px solid rgba(31,37,51,1)',
							display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
						}}
						onClick={() => setCatOpen(p => !p)}
					>
						<span style={{
							fontSize: '14px', color: '#fff', fontWeight: 500, fontFamily: 'var(--font-display)',
							overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
						}}>
							{categoryLabel}
						</span>
						<svg width='18' height='18' viewBox='0 0 24 24' fill='none' style={{ flexShrink: 0, transform: catOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
							<path d='M6 9l6 6 6-6' stroke='white' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
						</svg>
						{catOpen && (
							<div style={{
								position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 200,
								maxHeight: '280px', overflowY: 'auto',
								background: 'rgba(18,22,32,0.95)', backdropFilter: 'blur(16px)',
								WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)',
								borderRadius: '14px', boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
							}}>
								{categories.map(c => (
									<div
										key={c.id}
										onClick={e => { e.stopPropagation(); setCategoryId(c.id); setCatOpen(false) }}
										style={{
											padding: '10px 18px', fontSize: '13px', cursor: 'pointer',
											fontFamily: 'var(--font-display)',
											color: c.id === categoryId ? 'rgba(var(--cyan-rgb),0.9)' : 'rgba(200,205,220,0.75)',
											background: c.id === categoryId ? 'rgba(var(--cyan-rgb),0.06)' : 'transparent',
											borderBottom: '1px solid rgba(255,255,255,0.04)',
										}}
									>
										{c.label}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<AsyncBoundary
					loading={loading}
					error={error}
					onRetry={retry}
					isEmpty={!loading && !error && filtered.length === 0}
					skeleton={
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' style={{ gap: '20px', width: '100%', marginBottom: '48px' }}>
							{Array.from({ length: ITEMS_PER_PAGE }, (_, i) => (
								<div key={`sk${i}`} style={{ minHeight: '198px', borderRadius: '20px', border: '1px solid rgba(31,37,51,1)', background: 'rgba(var(--card-rgb),1)' }} />
							))}
						</div>
					}
				>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' style={{ gap: '20px', width: '100%', marginBottom: '48px' }}>
						{displayed.length > 0 ? displayed.map(item => (
							<DataCard key={item.id} item={item} />
						)) : (
							<div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-display)', fontSize: '16px', color: 'rgba(150,160,180,1)' }}>
								{t('pages.mikroMalumotlarKatalogiPage.bu_qidiruv_boyicha_malumot_topilmadi', "Bu qidiruv bo'yicha ma'lumot topilmadi")}
							</div>
						)}
					</div>

					{filtered.length > 0 && <Pagination page={current} setPage={setPage} total={totalPages} />}
				</AsyncBoundary>
			</div>
		</section>
	)
}

export default MikroMalumotlarKatalogiPage
