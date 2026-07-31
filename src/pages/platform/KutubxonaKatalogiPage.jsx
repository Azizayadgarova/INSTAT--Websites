import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import bgGlow from '@/assets/bgImg/Background (1).png'
import BlurWords from '../../components/shared/BlurWords'
import { Button2 } from '../../components/shared/Button2'
import BookCard from '../../components/ElektronKutubxona/BookCard'
import AsyncBoundary from '../../components/shared/AsyncBoundary'
import { booksApi, categoriesApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { pickField } from '@/utils/siteContent'
import { toBook } from '@/utils/bookMapper'

const vp = { once: true, amount: 0.2 }
const PER_PAGE = 12
const SEARCH_DEBOUNCE_MS = 400
const ALL_CATEGORY = 'all'
// /categories/ turli modullar uchun umumiy — faqat kutubxona kategoriyalari kerak.
const LIBRARY_CATEGORY_TYPE = 'library'

function PagBtn({ children, onClick, active, nav }) {
	return (
		<button
			onClick={onClick}
			style={{
				width: '36px', height: '36px', borderRadius: '8px',
				border: 'none',
				background: nav ? 'transparent' : active ? 'rgba(var(--blue-rgb),1)' : 'rgba(var(--card-rgb),1)',
				color: active ? '#fff' : 'rgba(150,160,180,1)',
				fontSize: '14px', fontWeight: active ? 600 : 400,
				cursor: 'pointer', fontFamily: 'var(--font-display)',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				flexShrink: 0,
				transition: 'background .2s',
			}}
			onMouseEnter={e => { if (!active && !nav) e.currentTarget.style.background = 'rgba(var(--blue-rgb),0.25)' }}
			onMouseLeave={e => { if (!active && !nav) e.currentTarget.style.background = 'rgba(var(--card-rgb),1)' }}
		>
			{children}
		</button>
	)
}

function Pagination({ page, setPage, total, t }) {
	const getPages = () => {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
		if (page <= 5) return [1, 2, 3, 4, 5, '...', total]
		if (page >= total - 4) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
		return [1, '...', page - 1, page, page + 1, '...', total]
	}
	return (
		<div style={{
			display: 'flex', alignItems: 'center', justifyContent: 'center',
			flexWrap: 'wrap', gap: '16px', width: '100%', maxWidth: '1224px',
			position: 'relative', zIndex: 1, marginTop: '8px',
		}}>
			<span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'rgba(100,110,130,1)' }}>
				{t('components.kutubxonaKatalogi.sahifa')}
			</span>
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
				<PagBtn nav onClick={() => setPage(1)}>«</PagBtn>
				<PagBtn nav onClick={() => setPage(p => Math.max(1, p - 1))}>‹</PagBtn>
				{getPages().map((p, i) =>
					p === '...' ? (
						<span key={`d${i}`} style={{ width: '36px', height: '36px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(100,110,130,1)', fontSize: '14px', fontFamily: 'var(--font-display)' }}>...</span>
					) : (
						<PagBtn key={p} active={p === page} onClick={() => setPage(p)}>{p}</PagBtn>
					),
				)}
				<PagBtn nav onClick={() => setPage(p => Math.min(total, p + 1))}>›</PagBtn>
				<PagBtn nav onClick={() => setPage(total)}>»</PagBtn>
			</div>
		</div>
	)
}

function FilterBar({ search, setSearch, categoryId, setCategoryId, categoryLabel, categories, catOpen, setCatOpen, t }) {
	return (
		<div
			className='flex-col md:flex-row w-[327px] md:w-full'
			style={{
				display: 'flex', alignItems: 'stretch', gap: '12px',
				maxWidth: '800px', margin: '0 auto 40px', position: 'relative', zIndex: 10,
			}}
		>
			{/* Search */}
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
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder={t('components.kutubxonaKatalogi.qidirish_placeholder')}
					style={{
						flex: 1, background: 'transparent', border: 'none', outline: 'none',
						color: '#fff', fontSize: '14px', fontFamily: 'var(--font-display)',
					}}
				/>
			</div>

			{/* Category dropdown */}
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
	)
}

const KutubxonaKatalogiPage = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	// Qidiruv debounce qilinadi — har harfda emas, yozish to'xtagach so'rov ketadi.
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

	// Kategoriyalar ro'yxati — /categories/ dan bir marta olinadi (faqat "library" turi)
	const { data: categoriesData } = useApiResource(
		() => categoriesApi.getAll({ per_page: 100 }),
		[],
	)
	const libraryCategories = useMemo(
		() =>
			(categoriesData?.items ?? [])
				.filter(c => c.type === LIBRARY_CATEGORY_TYPE)
				.map(c => ({ id: c.id, label: pickField(c, 'name', lang) })),
		[categoriesData, lang],
	)
	const categories = useMemo(
		() => [{ id: ALL_CATEGORY, label: t('components.kutubxonaKatalogi.barcha_kategoriyalar') }, ...libraryCategories],
		[libraryCategories, t],
	)
	const categoryLabel = categories.find(c => c.id === categoryId)?.label ?? categories[0].label

	const fetchBooks = async () => {
		const params = { search: debouncedSearch, page }
		if (categoryId !== ALL_CATEGORY) params.category = categoryId
		const res = await booksApi.getAll(params)
		return {
			items: (res.items ?? []).filter(b => b.is_active !== false),
			meta: res.meta,
		}
	}

	const { data, loading, error, retry } = useApiResource(fetchBooks, [debouncedSearch, categoryId, page])

	const displayed = useMemo(
		() => (data?.items ?? []).map((b, i) => toBook(b, i, lang)),
		[data, lang],
	)
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
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={vp}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				>
					<Button2 text={t('components.kutubxonaKatalogi.badge')} />
				</motion.div>

				<BlurWords
					text={t('components.kutubxonaKatalogi.sarlavha')}
					delay={0.1}
					step={0.08}
					className='text-[32px] leading-[40px] md:text-[48px] md:leading-[58px]'
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 600,
						color: '#ffffff',
						display: 'block',
					}}
				/>

				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={vp}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
					className='text-[14px] max-w-[327px] md:text-[16px] md:max-w-none'
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 400,
						lineHeight: '140%',
						color: 'rgba(202, 202, 206, 1)',
						textAlign: 'center',
						margin: 0,
					}}
				>
					{t('components.kutubxonaKatalogi.tavsif')}
				</motion.p>
			</div>

			<FilterBar
				search={searchInput}
				setSearch={setSearchInput}
				categoryId={categoryId}
				setCategoryId={setCategoryId}
				categoryLabel={categoryLabel}
				categories={categories}
				catOpen={catOpen}
				setCatOpen={setCatOpen}
				t={t}
			/>

			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				skeleton={
					<div
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
						style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', padding: '0 24px', gap: '20px', marginBottom: '48px' }}
					>
						{Array.from({ length: PER_PAGE }, (_, i) => (
							<div key={`sk${i}`} style={{ height: '360px', borderRadius: '20px', backgroundColor: 'rgba(var(--card-rgb),1)', boxShadow: '0px 1px 5px 0px rgba(29, 36, 45, 0.5)' }} />
						))}
					</div>
				}
			>
				<div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
					style={{
						position: 'relative',
						zIndex: 1,
						width: '100%',
						maxWidth: '1200px',
						padding: '0 24px',
						gap: '20px',
						marginBottom: '48px',
					}}
				>
					{displayed.length > 0 ? (
						displayed.map((book, i) => <BookCard key={book.id} book={book} index={i} />)
					) : (
						<div
							style={{
								gridColumn: '1 / -1',
								textAlign: 'center',
								padding: '60px 0',
								fontFamily: 'var(--font-display)',
								fontSize: '16px',
								color: 'rgba(150,160,180,1)',
							}}
						>
							{t('components.kutubxonaKatalogi.topilmadi')}
						</div>
					)}
				</div>

				{totalCount > 0 && <Pagination page={page} setPage={setPage} total={totalPages} t={t} />}
			</AsyncBoundary>
		</section>
	)
}

export default KutubxonaKatalogiPage
