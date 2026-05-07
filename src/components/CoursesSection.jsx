import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import bg from '@/assets/bgImg/Background (1).png'
import StarIcon from '@/assets/Star.png'
import ClockIcon from '@/assets/icons/time-line.png'
import { Button2 } from './shared/Button2'
import { courses } from '../data/courses.data'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useNavigate } from 'react-router-dom'

const CoursesSection = () => {
	const [sectionRef, bgVisible] = useIntersectionObserver(0.05)
	const navigate = useNavigate()

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
				}}
			/>

			<div className='relative z-10 text-center px-6 mx-auto max-w-4xl mb-16'>
				<div className='mb-6'>
					<Button2 text='Kurslar katalogi' />
				</div>

				<h2
					style={{
						fontFamily: '"Inter Display", Inter, sans-serif',
						fontWeight: 600,
						fontSize: '48px',
						lineHeight: '58px',
						textAlign: 'center',
						color: 'rgba(255, 255, 255, 1)',
						marginBottom: '16px',
					}}
				>
					Maqsadingizga mos
					<br /> onlayn kursni tanlang
				</h2>

				<p
					style={{
						fontFamily: '"Inter Display", Inter, sans-serif',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '140%',
						textAlign: 'center',
						color: 'rgba(255, 255, 255, 1)',
					}}
				>
					Boshlang'ichdan professional darajagacha <br />
					bo'lgan zamonaviy onlayn kurslar
				</p>
			</div>

			<div className='relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-24 items-stretch'>
				{courses.map((course, i) => (
					<motion.div
						key={course.id}
						initial={{ opacity: 0, y: 48, scale: 0.94, filter: 'blur(10px)' }}
						whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
						viewport={{ once: true, amount: 0.1 }}
						transition={{ duration: 0.65, delay: i * 0.08 }}
						whileHover={{ y: -10, scale: 1.02 }}
						className='group bg-[#161B26] rounded-[22px] p-4 flex flex-col'
					>
						<div className='aspect-16/10 mb-4 overflow-hidden rounded-2xl shrink-0'>
							<motion.img
								src={course.image}
								alt={course.title}
								loading='lazy'
								className='w-full h-full object-cover'
								whileHover={{ scale: 1.08 }}
							/>
						</div>

						<div className='flex items-start justify-between gap-2 mb-4 flex-1'>
							<h3 className='text-white font-normal text-[16px] leading-[140%] line-clamp-2 overflow-hidden'>
								{course.title}
							</h3>
							<div className='flex items-center gap-0.5 shrink-0'>
								{[...Array(5)].map((_, starIdx) => (
									<img key={starIdx} src={StarIcon} alt='star' className='w-4 h-4' />
								))}
							</div>
						</div>

						<div className='flex items-center justify-between mt-auto'>
							<div className='flex items-center gap-1.5'>
								<img src={ClockIcon} alt='clock' className='w-4 h-4' />
								<span className='text-[#BCBCBC] text-sm font-light'>
									{course.hours} soat
								</span>
							</div>
							<div className='text-[#3b82f6] text-[24px] font-semibold leading-[120%] text-right'>
								0 UZS
							</div>
						</div>
					</motion.div>
				))}
			</div>

			<div className='relative z-10 flex justify-center mt-10 mb-0'>
				<button
					onClick={() => navigate('/platform/onlayn-talim')}
					style={{
						width: '124px',
						height: '48px',
						borderRadius: '12px',
						padding: '14px',
						background: 'rgba(43, 117, 204, 1)',
						outline: '1px solid rgba(28, 84, 148, 1)',
						boxShadow:
							'0px 2px 6px 0px rgba(255, 255, 255, 0.25) inset, 0px -2px 4px 0px rgba(14, 18, 27, 0.3) inset, 0px 16px 24px -8px rgba(14, 18, 27, 0.1)',
						fontWeight: 600,
						fontSize: '16px',
						color: '#fff',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						whiteSpace: 'nowrap',
					}}
				>
					Barcha kurslar
				</button>
			</div>
		</section>
	)
}

export default CoursesSection