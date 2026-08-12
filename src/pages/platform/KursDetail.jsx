import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { coursesApi, courseFeaturesApi, courseBlocksApi, courseBlockLessonsApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { pickField } from '@/utils/siteContent'
import { Button2 } from '@/components/shared/Button2'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Skeleton, { SkeletonText } from '@/components/shared/Skeleton'
import StarIcon from '@/assets/Star.png'
import ClockIcon from '@/assets/icons/time-line.png'
import DeviceIcon from '@/assets/icons/device-line.png'

const STARS = [0, 1, 2, 3, 4]

const getPerks = t => [
	t('pages.kursDetail.tugatish_sertifikati', 'Tugatish sertifikati'),
	t('pages.kursDetail.barcha_materiallarga_umrbod_kirish', 'Barcha materiallarga umrbod kirish'),
	t('pages.kursDetail.oz_fikringizni_shaffof_qoldirish', "O'z fikringizni shaffof qoldirish"),
	t('pages.kursDetail.qollab_quvvatlash_xizmati', "Qo'llab-quvvatlash xizmati"),
]

const getTabs = t => [
	{ key: 'haqida', label: t('pages.kursDetail.kurs_haqida', 'Kurs haqida') },
	{ key: 'reja', label: t('pages.kursDetail.oquv_reja', "O'quv reja") },
	// { key: 'izohlar', label: 'Izohlar' },
	// { key: 'bitiruvchilar', label: 'Bitiruvchilar' },
]

const CheckIcon = () => (
	<svg width='20' height='20' viewBox='0 0 20 20' fill='none' style={{ flexShrink: 0 }}>
		<circle cx='10' cy='10' r='10' fill='rgba(var(--blue-rgb),1)' />
		<path d='M6 10.3l2.4 2.4L14 7' stroke='#fff' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const formatDuration = (seconds, t) => {
	const total = Math.max(0, Math.round(seconds || 0))
	const h = Math.floor(total / 3600)
	const m = Math.floor((total % 3600) / 60)
	const s = total % 60
	const soat = t('components.coursesSection.soat')
	const daqiqa = t('components.coursesSection.daqiqa')
	const soniya = t('components.coursesSection.soniya')
	if (h > 0) return m > 0 ? `${h} ${soat} ${m} ${daqiqa}` : `${h} ${soat}`
	if (m > 0) return s > 0 ? `${m} ${daqiqa} ${s} ${soniya}` : `${m} ${daqiqa}`
	return `${s} ${soniya}`
}

const PlayIcon = () => (
	<div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
		<svg width='9' height='9' viewBox='0 0 10 10' fill='none'>
			<path d='M1 0.5L9 5L1 9.5V0.5Z' fill='#fff' />
		</svg>
	</div>
)

const CourseSyllabus = ({ courseId, lang, t }) => {
	const { data: blocksData, loading, error, retry } = useApiResource(
		() => courseBlocksApi.getByCourse(courseId),
		[courseId],
	)
	const blocks = blocksData ?? []
	const [openBlock, setOpenBlock] = useState(null)
	const [lessonsByBlock, setLessonsByBlock] = useState({})
	const [loadingBlock, setLoadingBlock] = useState(null)

	const toggleBlock = async blockId => {
		if (openBlock === blockId) {
			setOpenBlock(null)
			return
		}
		setOpenBlock(blockId)
		if (!lessonsByBlock[blockId]) {
			setLoadingBlock(blockId)
			try {
				const lessons = await courseBlockLessonsApi.getByBlock(courseId, blockId)
				setLessonsByBlock(prev => ({ ...prev, [blockId]: lessons }))
			} finally {
				setLoadingBlock(null)
			}
		}
	}

	return (
		<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={!loading && !error && blocks.length === 0}>
			<div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
				{blocks.map((block, i) => {
					const isOpen = openBlock === block.id
					const blockTitle = pickField(block, 'text', lang)
					const lessons = lessonsByBlock[block.id] ?? []
					return (
						<div key={block.id} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
							<button
								onClick={() => toggleBlock(block.id)}
								style={{
									width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
									padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
									<span style={{ color: '#fff', display: 'inline-block', transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform .2s', fontSize: '12px' }}>▾</span>
									<span style={{ color: '#fff', fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-display)' }}>{blockTitle}</span>
								</div>
								<span style={{ color: '#BCBCBC', fontSize: '13px', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
									{formatDuration(block.total_duration, t)}
								</span>
							</button>

							{isOpen && (
								<div style={{ background: 'rgba(255,255,255,0.03)' }}>
									{loadingBlock === block.id ? (
										<div style={{ padding: '14px 18px 14px 40px' }}><SkeletonText lines={2} /></div>
									) : lessons.length === 0 ? (
										<p style={{ padding: '14px 18px 14px 40px', color: 'rgba(150,160,180,1)', fontSize: '13px', fontFamily: 'var(--font-display)' }}>
											{t('common.comingSoonHint')}
										</p>
									) : (
										lessons.map(lesson => (
											<div
												key={lesson.id}
												style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px 12px 40px' }}
											>
												<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
													<PlayIcon />
													<span style={{ color: 'rgba(202,202,206,1)', fontSize: '13px', fontFamily: 'var(--font-display)' }}>
														{pickField(lesson, 'title', lang)}
													</span>
												</div>
												<span style={{ color: '#8a94a6', fontSize: '13px', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
													{formatDuration(lesson.duration, t)}
												</span>
											</div>
										))
									)}
								</div>
							)}
						</div>
					)
				})}
			</div>
		</AsyncBoundary>
	)
}

const InfoStat = ({ icon, children }) => (
	<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
		<img src={icon} alt='' className='w-4 h-4' loading='lazy' decoding='async' />
		<span style={{ color: '#BCBCBC', fontSize: '14px', fontFamily: 'var(--font-display)' }}>{children}</span>
	</div>
)

const DetailSkeleton = () => (
	<div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
		<Skeleton width={160} height={28} radius={100} style={{ marginBottom: 24 }} />
		<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: 22, padding: 24, marginBottom: 24 }}>
			<Skeleton height={220} radius={16} />
		</div>
		<Skeleton height={200} radius={22} />
	</div>
)

const KursDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const [tab, setTab] = useState('haqida')
	const [expanded, setExpanded] = useState(false)

	const { data: course, loading, error, retry } = useApiResource(
		() => coursesApi.getById(id),
		[id],
	)
	const { data: features } = useApiResource(
		() => courseFeaturesApi.getByCourse(id),
		[id],
	)
	const learnPoints = (features ?? []).map(f => ({ id: f.id, text: pickField(f, 'text', lang) })).filter(f => f.text)
	const PERKS = getPerks(t)
	const TABS = getTabs(t)

	const title = course ? pickField(course, 'name', lang) : ''
	const description = course ? pickField(course, 'description', lang) : ''
	const durationLabel = course?.total_duration ? formatDuration(course.total_duration, t) : ''
	const priceLabel = course && Number(course.price) > 0
		? `${Number(course.price).toLocaleString('uz-UZ')} ${t('components.coursesSection.uzs', "so'm")}`
		: t('components.coursesSection.0_uzs')
	const rating = useMemo(() => {
		if (!course?.ratings_count) return 0
		return course.rating_sum / course.ratings_count
	}, [course])
	const filledStars = Math.round(rating)

	const handleStart = () => window.open(import.meta.env.VITE_API_CABINET_URL, '_blank')

	return (
		<section style={{ width: '100%', background: 'rgba(var(--bg-rgb),1)', minHeight: '100vh', padding: '24px 16px 100px' }}>
			<div style={{ maxWidth: '1100px', margin: '0 auto' }}>
				<button
					onClick={() => navigate('/platform/onlayn-talim')}
					style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginBottom: '24px', display: 'inline-block' }}
				>
					<Button2 text={t('pages.kursDetail.kurslar_katalogi', 'Kurslar katalogi')} />
				</button>

				<AsyncBoundary loading={loading} error={error} onRetry={retry} skeleton={<DetailSkeleton />}>
					{course && (
						<>
							{/* Asosiy kurs kartasi */}
							<div
								className='flex flex-col md:flex-row'
								style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '20px', gap: '24px', marginBottom: '24px' }}
							>
								<div className='w-full md:w-[280px]' style={{ borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
									<img src={course.thumbnail} alt={title} className='w-full h-[200px] md:h-full object-cover' loading='lazy' decoding='async' />
								</div>

								<div className='flex-1'>
									<h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 500, fontFamily: 'var(--font-display)', marginBottom: '14px' }}>
										{t('pages.kursDetail.nima_olasiz', 'Nima olasiz')}
									</h2>
									<ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
										{PERKS.map(perk => (
											<li key={perk} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
												<CheckIcon />
												<span style={{ color: 'rgba(202,202,206,1)', fontSize: '14px', fontFamily: 'var(--font-display)' }}>{perk}</span>
											</li>
										))}
									</ul>
								</div>

								<div className='flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4'>
									<div style={{ color: '#fff', fontSize: '28px', fontWeight: 600, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
										{priceLabel}
									</div>
									<button
										onClick={handleStart}
										style={{
											padding: '12px 24px',
											borderRadius: '12px',
											background: 'rgba(var(--blue-rgb),1)',
											color: '#fff',
											fontWeight: 600,
											fontSize: '14px',
											border: 'none',
											cursor: 'pointer',
											whiteSpace: 'nowrap',
											fontFamily: 'var(--font-display)',
										}}
									>
										{t('pages.kursDetail.kursni_boshlash', 'Kursni boshlash')}
									</button>
								</div>
							</div>

							{/* Kurs ma'lumotlari */}
							<div style={{ marginBottom: '24px' }}>
								<p style={{ color: 'rgba(150,160,180,1)', fontSize: '13px', fontFamily: 'var(--font-display)', marginBottom: '10px' }}>
									{t('pages.kursDetail.kurs_malumotlari', "Kurs ma'lumotlari")}
								</p>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
										<div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
											{STARS.map(starIdx => (
												<img
													key={starIdx}
													src={StarIcon}
													alt=''
													className='w-4 h-4'
													loading='lazy'
													decoding='async'
													style={{ opacity: starIdx < filledStars ? 1 : 0.25 }}
												/>
											))}
										</div>
										{course.ratings_count > 0 && (
											<>
												<span style={{ color: '#fff', fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-display)' }}>{rating.toFixed(1)}</span>
												<span style={{ color: '#BCBCBC', fontSize: '14px', fontFamily: 'var(--font-display)' }}>({course.ratings_count})</span>
											</>
										)}
									</div>
									{!!course.lessons_count && <InfoStat icon={DeviceIcon}>{course.lessons_count} {t('pages.kursDetail.ta_darslar', 'ta darslar')}</InfoStat>}
									{!!durationLabel && <InfoStat icon={ClockIcon}>{t('pages.kursDetail.davomiyligi', 'Davomiyligi')}: {durationLabel}</InfoStat>}
									{!!course.tests_count && <InfoStat icon={DeviceIcon}>{course.tests_count} {t('pages.kursDetail.ta_test_savollari', 'ta test savollari')}</InfoStat>}
								</div>
							</div>

							{/* Tavsif + Tabs */}
							<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '24px', marginBottom: '24px' }}>
								<h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
									{title}
								</h1>

								<div
									className='flex flex-wrap'
									style={{ gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}
								>
									{TABS.map(tb => (
										<button
											key={tb.key}
											onClick={() => setTab(tb.key)}
											style={{
												padding: '8px 16px',
												borderRadius: '10px',
												fontSize: '13px',
												fontWeight: 500,
												fontFamily: 'var(--font-display)',
												border: 'none',
												cursor: 'pointer',
												whiteSpace: 'nowrap',
												background: tab === tb.key ? 'rgba(var(--blue-rgb),1)' : 'rgba(255,255,255,0.04)',
												color: tab === tb.key ? '#fff' : 'rgba(202,202,206,1)',
												transition: 'background .2s, color .2s',
											}}
										>
											{tb.label}
										</button>
									))}
								</div>

								{tab === 'haqida' ? (
									description ? (
										<>
											<div style={{ maxHeight: expanded ? 'none' : '140px', overflow: 'hidden', position: 'relative' }}>
												<RichContent html={description} />
											</div>
											<button
												onClick={() => setExpanded(e => !e)}
												style={{
													display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px',
													background: 'none', border: 'none', cursor: 'pointer', padding: 0,
													color: 'rgba(var(--cyan-rgb),1)', fontSize: '14px', fontFamily: 'var(--font-display)',
												}}
											>
												{expanded ? t('pages.kursDetail.qisqartirish', 'Qisqartirish') : t('pages.kursDetail.batafsil_korish', "Batafsil ko'rish")}
												<span style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
											</button>
										</>
									) : (
										<p style={{ color: 'rgba(150,160,180,1)', fontSize: '14px', fontFamily: 'var(--font-display)' }}>
											{t('common.comingSoonHint')}
										</p>
									)
								) : tab === 'reja' ? (
									<CourseSyllabus courseId={id} lang={lang} t={t} />
								) : (
									<p style={{ color: 'rgba(150,160,180,1)', fontSize: '14px', fontFamily: 'var(--font-display)' }}>
										{t('common.comingSoonHint')}
									</p>
								)}
							</div>

							{/* Nimalarni o'rganasiz */}
							{learnPoints.length > 0 && (
								<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '24px' }}>
									<h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '18px' }}>
										{t('pages.kursDetail.nimalarni_organasiz', "Nimalarni o'rganasiz!")}
									</h2>
									<div className='grid grid-cols-1 md:grid-cols-2' style={{ gap: '14px' }}>
										{learnPoints.map(point => (
											<div key={point.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
												<CheckIcon />
												<span style={{ color: 'rgba(202,202,206,1)', fontSize: '14px', fontFamily: 'var(--font-display)' }}>{point.text}</span>
											</div>
										))}
									</div>
								</div>
							)}
						</>
					)}
				</AsyncBoundary>
			</div>
		</section>
	)
}

export default KursDetail
