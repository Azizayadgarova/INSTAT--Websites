import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDataText } from '@/hooks/useDataText'
import bgGlow from '@/assets/bgImg/Background (1).png'
import { useMemo, useState } from 'react'
import { Button2 } from './shared/Button2'
import AnimatedSection from './shared/AnimatedSection'
import { dataReportsApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { useSectionText } from '@/hooks/useSectionText'
import { pickField } from '@/utils/siteContent'

import { ALL_DATA } from '@/data/publications.data'

export const ITEMS_PER_PAGE = 8

const UZ_MONTHS = [
	'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
	'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
]

/** created_at -> "2025 yil mart" (ru/en uchun tizim formati) */
const formatPublished = (iso, lang) => {
	if (!iso) return ''
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	if (lang === 'uz') return `${d.getFullYear()} yil ${UZ_MONTHS[d.getMonth()]}`
	return d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
		year: 'numeric',
		month: 'long',
	})
}

/** options[].date_from/date_to -> "2015 — 2024" (bir xil yil bo'lsa bitta yil) */
const yearsRange = report => {
	const years = (report.options ?? [])
		.flatMap(o => [o.date_from, o.date_to])
		.map(d => Number(String(d ?? '').slice(0, 4)))
		.filter(y => y > 1900)
	if (!years.length) return ''
	const from = Math.min(...years)
	const to = Math.max(...years)
	return from === to ? String(from) : `${from} — ${to}`
}

/**
 * Data report (backend: /data-reports/) -> kartochka shakli.
 * Endpoint `name`, `category` (nomi tilga qarab) va `options` (sana oralig'i)
 * beradi — maketdagi `location` uchun mos maydon yo'q, shuning uchun u qatori
 * bo'sh qoladi va ko'rsatilmaydi.
 */
export const toPublication = (report, lang) => ({
	id: report.id,
	title: pickField(report, 'name', lang),
	category: pickField(report.category ?? {}, 'name', lang),
	location: '',
	years: yearsRange(report),
	published: formatPublished(report.created_at, lang),
})

// Bu bo'lim mikro-ma'lumotlar sahifasida turadi: kategoriyasi boshqa turga
// tegishli hisobotlar chiqmasin. Turi ko'rsatilmagan yozuvlar qoldiriladi.
export const isMicroData = report => {
	const type = report.category?.type
	return !type || type === 'micro-data'
}

export function IconPin() {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 24 24'
			fill='none'
			style={{ flexShrink: 0 }}
		>
			<path
				d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'
				stroke='white'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<circle cx='12' cy='9' r='2.5' stroke='white' strokeWidth='1.8' />
		</svg>
	)
}

function IconClock() {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 24 24'
			fill='none'
			style={{ flexShrink: 0 }}
		>
			<circle cx='12' cy='12' r='9' stroke='white' strokeWidth='1.8' />
			<path
				d='M12 7v5l3 3'
				stroke='white'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

function IconEdit() {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 24 24'
			fill='none'
			style={{ flexShrink: 0 }}
		>
			<path
				d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5'
				stroke='white'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M17.5 2.5a2.121 2.121 0 013 3L12 14l-4 1 1-4 8.5-8.5z'
				stroke='white'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export function DataCard({ item }) {
	const dt = useDataText('publications')
	const navigate = useNavigate()
	const [hov, setHov] = useState(false)

	return (
		<div
			onClick={() => navigate(`/platform/nashr/${item.id}`)}
			onMouseEnter={() => setHov(true)}
			onMouseLeave={() => setHov(false)}
			style={{
				background: hov ? 'rgba(30,36,50,1)' : 'rgba(var(--card-rgb),1)',
				border: `1px solid ${hov ? 'rgba(var(--blue-rgb),0.35)' : 'rgba(31,37,51,1)'}`,
				borderRadius: '20px',
				padding: '18px 20px',
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				width: '100%',
				minHeight: '198px',
				height: '100%',
				boxSizing: 'border-box',
				transition:
					'background 0.22s, border-color 0.22s, transform 0.22s, box-shadow 0.22s',
				transform: hov ? 'translateY(-3px)' : 'none',
				boxShadow: hov
					? '0 12px 40px rgba(0,0,0,0.4)'
					: '0px 1px 5px 0px rgba(29,36,45,0.2)',
			}}
		>
			<div style={{ height: '82px', overflow: 'hidden' }}>
				<h3
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 500,
						fontSize: '20px',
						lineHeight: 1.35,
						color: '#FFFFFF',
						margin: '0 0 6px',
						minHeight: '54px',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{dt(item, 'title')}
				</h3>
				<span
					style={{
						fontFamily: 'var(--font-display)',
						fontSize: '16px',
						fontWeight: 400,
						color: 'rgba(var(--text-rgb),1)',
					}}
				>
					{dt(item, 'category')}
				</span>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
				{[
					{ icon: <IconPin />, text: dt(item, 'location') },
					{ icon: <IconClock />, text: item.years },
					{ icon: <IconEdit />, text: dt(item, 'published') },
				]
					.filter(row => row.text)
					.map((row, i) => (
						<div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
							{row.icon}
							<span
								style={{
									fontFamily: 'var(--font-display)',
									fontSize: '14px',
									color: 'rgba(255,255,255,1)',
								}}
							>
								{row.text}
							</span>
						</div>
					))}
			</div>
		</div>
	)
}

export function PagBtn({ children, onClick, active, nav }) {
	return (
		<button
			onClick={onClick}
			style={{
				width: '36px',
				height: '36px',
				borderRadius: '8px',
				border: 'none',
				background: nav
					? 'transparent'
					: active
						? 'rgba(var(--blue-rgb),1)'
						: 'rgba(var(--card-rgb),1)',
				color: active ? '#fff' : 'rgba(150,160,180,1)',
				fontSize: '14px',
				fontWeight: active ? 600 : 400,
				cursor: 'pointer',
				fontFamily: 'var(--font-display)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'background 0.2s',
			}}
			onMouseEnter={e => {
				if (!active && !nav)
					e.currentTarget.style.background = 'rgba(var(--blue-rgb),0.25)'
			}}
			onMouseLeave={e => {
				if (!active && !nav)
					e.currentTarget.style.background = 'rgba(var(--card-rgb),1)'
			}}
		>
			{children}
		</button>
	)
}

export function Pagination({ page, setPage, total }) {
    const {
        t
    } = useTranslation();

    const getPages = () => {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
		if (page <= 4) return [1, 2, 3, 4, 5, '...', total]
		if (page >= total - 3)
			return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
		return [1, '...', page - 1, page, page + 1, '...', total]
	}

    return (
        <div
			className='justify-center md:justify-between'
			style={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				maxWidth: '1200px',
			}}
		>
            <span
				className='hidden md:inline'
				style={{
					fontFamily: 'var(--font-display)',
					fontSize: '14px',
					color: 'rgba(100,110,130,1)',
					minWidth: '60px',
				}}
			>{t("components.nufuzliNashrlar.sahifa")}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
				<span className='hidden md:contents'>
					<PagBtn nav onClick={() => setPage(1)}>«</PagBtn>
				</span>
				<PagBtn nav onClick={() => setPage(p => Math.max(1, p - 1))}>
					‹
				</PagBtn>
				{getPages().map((p, i) =>
					p === '...' ? (
						<span
							key={`d${i}`}
							style={{
								width: '36px',
								height: '36px',
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'rgba(100,110,130,1)',
								fontSize: '14px',
							}}
						>
							...
						</span>
					) : (
						<PagBtn key={p} active={p === page} onClick={() => setPage(p)}>
							{p}
						</PagBtn>
					),
				)}
				<PagBtn nav onClick={() => setPage(p => Math.min(total, p + 1))}>
					›
				</PagBtn>
				<span className='hidden md:contents'>
					<PagBtn nav onClick={() => setPage(total)}>»</PagBtn>
				</span>
			</div>
            <button
				className='hidden md:flex'
				onClick={() => setPage(total)}
				style={{
					fontFamily: 'var(--font-display)',
					fontSize: '14px',
					color: 'rgba(150,160,180,1)',
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					alignItems: 'center',
					gap: '4px',
					minWidth: '120px',
					justifyContent: 'flex-end',
					padding: 0,
				}}
			>{t("components.nufuzliNashrlar.barchasini_korish")}<span>›</span>
			</button>
        </div>
    );
}

export default function NufuzliNashrlar() {
    const {
        t, i18n
    } = useTranslation();
    const lang = i18n.resolvedLanguage ?? 'uz'

    const st = useSectionText('micro_data')
    const navigate = useNavigate()

    // Backend `per_page`ni e'tiborsiz qoldiradi (javobda doim per_page: 16),
    // shuning uchun ro'yxat bir marta olinadi.
    const { data, loading } = useApiResource(() => dataReportsApi.getAll({ per_page: 100 }), [])

    const apiItems = useMemo(
		() =>
			(data?.items ?? [])
				.filter(report => report.is_active !== false && isMicroData(report))
				.map(report => toPublication(report, lang)),
		[data, lang],
	)

    // Backendda hali hisobot yo'q yoki so'rov muvaffaqiyatsiz — statik ro'yxat
    // ko'rsatiladi (docs/API.md: kontent fallback), bo'lim bo'sh qolmasin.
    const isFallback = !loading && apiItems.length === 0
    const source = isFallback ? ALL_DATA : apiItems

    // Bosh sahifada filtr/pagination yo'q — faqat birinchi hisobotlar ko'rsatiladi,
    // to'liq ro'yxat filtr va pagination bilan /platform/mikro-malumotlar-katalogi'da.
    const displayed = source.slice(0, ITEMS_PER_PAGE)

    return (
        <section
			className='px-4 md:px-[60px] lg:px-[120px] pt-10 pb-[100px]'
			style={{
				position: 'relative',
				background: 'rgba(10,15,26,1)',
				width: '100%',
				boxSizing: 'border-box',
				overflow: 'hidden',
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
					pointerEvents: 'none',
					zIndex: 0,
					opacity: 0.6,
				}} loading='lazy' decoding='async' />
            <div
				style={{
					maxWidth: '1200px',
					margin: '0 auto',
					position: 'relative',
					zIndex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* Header */}
				<AnimatedSection style={{ marginBottom: '52px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
						<Button2 text='Jurnallar' />

						<h2
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 600,
								fontSize: 'clamp(28px,4vw,48px)',
								color: '#fff',
								margin: 0,
								letterSpacing: '-0.02em',
							}}
						>{st('micro_data_title5', t("components.nufuzliNashrlar.nufuzli_jurnallar_va_songgi"))}</h2>

						<p
							style={{
								fontFamily: 'Inter,sans-serif',
								fontSize: '15px',
								lineHeight: 1.65,
								color: 'rgba(155,163,185,1)',
								maxWidth: '480px',
								margin: 0,
							}}
						>{st('micro_data_description5', t("components.nufuzliNashrlar.platformada_chop_etilayotgan_yetakchi"))}</p>
					</div>
				</AnimatedSection>

				{/* Grid */}
				<div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
					style={{
						gap: '20px',
						width: '100%',
						marginBottom: '48px',
					}}
				>
					{loading
						? Array.from({ length: ITEMS_PER_PAGE }, (_, i) => (
								<div
									key={`sk${i}`}
									style={{
										minHeight: '198px',
										borderRadius: '20px',
										border: '1px solid rgba(31,37,51,1)',
										background: 'rgba(var(--card-rgb),1)',
									}}
								/>
							))
						: displayed.map(item => <DataCard key={item.id} item={item} />)}
				</div>

				{/* Barchasi */}
				<button
					onClick={() => navigate('/platform/mikro-malumotlar-katalogi')}
					style={{
						height: '48px',
						padding: '0 28px',
						borderRadius: '12px',
						background: 'rgba(var(--blue-rgb),1)',
						border: '1px solid transparent',
						outline: '1px solid rgba(28, 84, 148, 1)',
						boxShadow: '0px 2px 6px 0px rgba(255,255,255,0.25) inset, 0px -2px 4px 0px rgba(var(--bg-rgb),0.3) inset, 0px 16px 24px -8px rgba(var(--bg-rgb),0.1)',
						fontFamily: 'var(--font-display)',
						fontWeight: 600,
						fontSize: '16px',
						color: '#fff',
						cursor: 'pointer',
						whiteSpace: 'nowrap',
					}}
				>
					Barchasi
				</button>
			</div>
        </section>
    );
}
