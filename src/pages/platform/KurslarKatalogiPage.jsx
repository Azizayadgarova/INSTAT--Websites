import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgGlow from '@/assets/bgImg/Background (1).png'
import StarIcon from '@/assets/Star.png'
import ClockIcon from '@/assets/icons/time-line.png'
import BlurWords from '../../components/shared/BlurWords'
import { Button2 } from '../../components/shared/Button2'
import AsyncBoundary from '../../components/shared/AsyncBoundary'
import { coursesApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { pickField } from '@/utils/siteContent'

const vp = { once: true, amount: 0.2 }
const STARS = [0, 1, 2, 3, 4]
const SEARCH_DEBOUNCE_MS = 400

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
				{t('components.kurslarKatalogi.sahifa')}
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

function SearchBar({ search, setSearch, t }) {
	return (
		<div style={{
			display: 'flex', alignItems: 'center', gap: '10px',
			height: '56px', padding: '0 18px', borderRadius: '14px',
			background: 'rgba(var(--card-rgb),1)', border: '1px solid rgba(31,37,51,1)',
			width: '100%', maxWidth: '520px', margin: '0 auto 40px',
			position: 'relative', zIndex: 10,
		}}>
			<svg width='18' height='18' viewBox='0 0 24 24' fill='none' style={{ flexShrink: 0 }}>
				<circle cx='11' cy='11' r='7' stroke='rgba(144,157,162,1)' strokeWidth='2' />
				<path d='M16.5 16.5L21 21' stroke='rgba(144,157,162,1)' strokeWidth='2' strokeLinecap='round' />
			</svg>
			<input
				type='text'
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder={t('components.kurslarKatalogi.qidirish_placeholder')}
				style={{
					flex: 1, background: 'transparent', border: 'none', outline: 'none',
					color: '#fff', fontSize: '14px', fontFamily: 'var(--font-display)',
				}}
			/>
		</div>
	)
}

const CourseCard = ({ course, i, lang, t, navigate }) => {
	const title = pickField(course, 'name', lang)
	const totalSeconds = Math.max(0, Math.round(course.total_duration || 0))
	const durationValue = totalSeconds >= 3600
		? Math.round(totalSeconds / 3600)
		: totalSeconds >= 60
			? Math.round(totalSeconds / 60)
			: totalSeconds
	const durationUnit = totalSeconds >= 3600 ? 'soat' : totalSeconds >= 60 ? 'daqiqa' : 'soniya'
	const priceLabel = Number(course.price) > 0
		? `${Number(course.price).toLocaleString('uz-UZ')} ${t('components.coursesSection.uzs', "so'm")}`
		: t('components.coursesSection.0_uzs')
	const rating = course.ratings_count > 0 ? course.rating_sum / course.ratings_count : 0
	const filledStars = Math.round(rating)

	return (
		<motion.div
			initial={{ opacity: 0, y: 32, scale: 0.96 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, amount: 0.1 }}
			transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
			whileHover={{ y: -10, scale: 1.02 }}
			onClick={() => navigate(`/platform/kurs/${course.id}`)}
			className='group bg-[#161B26] rounded-[22px] p-4 flex flex-col cursor-pointer'
		>
			<div className='aspect-16/10 mb-4 overflow-hidden rounded-2xl shrink-0'>
				<motion.img
					src={course.thumbnail}
					alt={title}
					loading='lazy'
					className='w-full h-full object-cover'
					whileHover={{ scale: 1.08 }}
				/>
			</div>
			<div className='flex items-start justify-between gap-2 mb-4 flex-1'>
				<h3 className='text-white font-normal text-[16px] leading-[140%] line-clamp-2 overflow-hidden'>
					{title}
				</h3>
				<div className='flex items-center gap-0.5 shrink-0'>
					{STARS.map(starIdx => (
						<img
							key={starIdx}
							src={StarIcon}
							alt='star'
							className='w-4 h-4'
							loading='lazy'
							decoding='async'
							style={{ opacity: starIdx < filledStars ? 1 : 0.25 }}
						/>
					))}
				</div>
			</div>
			<div className='flex items-center justify-between mt-auto'>
				<div className='flex items-center gap-1.5'>
					<img src={ClockIcon} alt='clock' className='w-4 h-4' loading='lazy' decoding='async' />
					<span className='text-[#BCBCBC] text-sm font-light'>
						{durationValue}{t(`components.coursesSection.${durationUnit}`)}</span>
				</div>
				<div className='text-[#3b82f6] text-[24px] font-semibold leading-[120%] text-right'>{priceLabel}</div>
			</div>
		</motion.div>
	)
}

const KurslarKatalogiPage = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const navigate = useNavigate()

	// Qidiruv debounce qilinadi — har harfda emas, yozish to'xtagach so'rov ketadi.
	const [searchInput, setSearchInput] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	useEffect(() => {
		const id = setTimeout(() => setDebouncedSearch(searchInput.trim()), SEARCH_DEBOUNCE_MS)
		return () => clearTimeout(id)
	}, [searchInput])

	const [page, setPage] = useState(1)
	useEffect(() => {
		setPage(1)
	}, [debouncedSearch])

	const fetchCourses = async () => {
		const res = await coursesApi.getAll({ search: debouncedSearch, page })
		return {
			items: res.items ?? [],
			meta: res.meta,
		}
	}

	const { data, loading, error, retry } = useApiResource(fetchCourses, [debouncedSearch, page])

	const courses = data?.items ?? []
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
					<Button2 text={t('components.kurslarKatalogi.badge')} />
				</motion.div>

				<BlurWords
					text={t('components.kurslarKatalogi.sarlavha')}
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
					{t('components.kurslarKatalogi.tavsif')}
				</motion.p>
			</div>

			<SearchBar search={searchInput} setSearch={setSearchInput} t={t} />

			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				skeleton={
					<div
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
						style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', padding: '0 24px', gap: '20px', marginBottom: '48px' }}
					>
						{Array.from({ length: 6 }, (_, i) => (
							<div key={`sk${i}`} style={{ height: '320px', borderRadius: '22px', backgroundColor: 'rgba(var(--card-rgb),1)', boxShadow: '0px 1px 5px 0px rgba(29, 36, 45, 0.5)' }} />
						))}
					</div>
				}
			>
				<div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
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
					{courses.length > 0 ? (
						courses.map((course, i) => (
							<CourseCard key={course.id} course={course} i={i} lang={lang} t={t} navigate={navigate} />
						))
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
							{t('components.kurslarKatalogi.topilmadi')}
						</div>
					)}
				</div>

				{totalCount > 0 && <Pagination page={page} setPage={setPage} total={totalPages} t={t} />}
			</AsyncBoundary>
		</section>
	)
}

export default KurslarKatalogiPage
