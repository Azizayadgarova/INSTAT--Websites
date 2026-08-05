import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import bg from '@/assets/bgImg/Background (1).png'

const STARS = [0, 1, 2, 3, 4]
import StarIcon from '@/assets/Star.png'
import ClockIcon from '@/assets/icons/time-line.png'
import { Button2 } from './shared/Button2'
import { coursesApi } from '@/api/resources.api'
import { pickField } from '@/utils/siteContent'
import { useApiResource } from '@/hooks/useApiResource'
import { useSectionText } from '@/hooks/useSectionText'
import AsyncBoundary from './shared/AsyncBoundary'
import Skeleton from './shared/Skeleton'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useNavigate } from 'react-router-dom'

const CoursesSkeleton = () => (
	<div className='relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-24 items-stretch'>
		{[0, 1, 2].map(i => (
			<div key={i} className='bg-[#161B26] rounded-[22px] p-4 flex flex-col'>
				<Skeleton height={180} radius={16} style={{ marginBottom: 16 }} />
				<Skeleton height={16} width='80%' style={{ marginBottom: 12 }} />
				<Skeleton height={14} width='40%' />
			</div>
		))}
	</div>
)

const CoursesSection = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const [sectionRef, bgVisible] = useIntersectionObserver(0.05)
	const navigate = useNavigate()
	const st = useSectionText('education')

	// Faqat faol (is_active) kurslarni ko'rsatamiz, birinchi 6 tasi
	const { data, loading, error, retry } = useApiResource(
		() => coursesApi.getAll({ per_page: 6 }),
		[],
	)
	const courses = (data?.items ?? []).filter(c => c.is_active)

    return (
        <section ref={sectionRef} className='relative w-full bg-[#0E121B] flex flex-col items-center justify-start overflow-hidden pt-10 pb-10'>
            <img
				src={bg}
				alt=''
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
					opacity: bgVisible ? 1 : 0,
					transition: 'opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1)',
				}} loading='lazy' decoding='async' />
            <div className='relative z-10 text-center px-6 mx-auto max-w-4xl mb-16'>
				<div className='mb-6'>
					<Button2 text='Kurslar katalogi' />
				</div>

				<h2
					className='text-[32px] leading-[40px] md:text-[48px] md:leading-[58px] font-semibold text-white text-center mb-4'
					style={{ fontFamily: 'var(--font-display)' }}
				>{st('education_title4',
					<>{t("components.coursesSection.maqsadingizga_mos")}<br />{t("components.coursesSection.onlayn_kursni_tanlang")}</>)}</h2>

				<p
					className='text-[14px] md:text-[16px] leading-[140%] text-center'
					style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'rgba(202,202,206,1)' }}
				>{st('education_description4',
					<>{t("components.coursesSection.boshlangichdan_professional_darajagacha")}<br />{t("components.coursesSection.bolgan_zamonaviy_onlayn_kurslar")}</>)}</p>
			</div>
            <AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={!loading && !error && courses.length === 0} skeleton={<CoursesSkeleton />}>
				<div className='relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-24 items-stretch'>
					{courses.map((course, i) => {
						const title = pickField(course, 'name', lang)
						const hours = course.total_duration ? Math.max(1, Math.round(course.total_duration / 60)) : 0
						const priceLabel = Number(course.price) > 0
							? `${Number(course.price).toLocaleString('uz-UZ')} ${t('components.coursesSection.uzs', "so'm")}`
							: t('components.coursesSection.0_uzs')
						const rating = course.ratings_count > 0 ? course.rating_sum / course.ratings_count : 0
						const filledStars = Math.round(rating)

						return (
							<motion.div
								key={course.id}
								initial={{ opacity: 0, y: 48, scale: 0.94, filter: 'blur(10px)' }}
								whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
								viewport={{ once: true, amount: 0.1 }}
								transition={{ duration: 0.65, delay: i * 0.08 }}
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
											{hours}{t("components.coursesSection.soat")}</span>
									</div>
									<div className='text-[#3b82f6] text-[24px] font-semibold leading-[120%] text-right'>{priceLabel}</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</AsyncBoundary>
            <div className='relative z-10 flex justify-center mt-10 mb-0'>
				<button
					onClick={() => navigate('/platform/onlayn-talim')}
					style={{
						width: '124px',
						height: '48px',
						borderRadius: '12px',
						padding: '14px',
						background: 'rgba(var(--blue-rgb),1)',
						outline: '1px solid rgba(28, 84, 148, 1)',
						boxShadow:
							'0px 2px 6px 0px rgba(255, 255, 255, 0.25) inset, 0px -2px 4px 0px rgba(var(--bg-rgb),0.3) inset, 0px 16px 24px -8px rgba(var(--bg-rgb),0.1)',
						fontWeight: 600,
						fontSize: '16px',
						color: '#fff',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						whiteSpace: 'nowrap',
					}}
				>{t("components.coursesSection.barcha_kurslar")}</button>
			</div>
        </section>
    );
}

export default CoursesSection