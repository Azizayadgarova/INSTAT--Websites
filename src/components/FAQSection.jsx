import { useTranslation } from 'react-i18next'
import { memo, useState } from 'react'
import AnimatedSection from './shared/AnimatedSection'
import SectionBackground from './shared/SectionBackground'
import Text from './shared/Text'

import { useFaqs } from '@/hooks/useFaqs'

const FaqCard = memo(({ item, realIndex, isOpen, onToggle, delay, platformStyle }) => {
	return (
		<AnimatedSection delay={delay}>
			<div
				id="faq"
				className={`${platformStyle ? '' : 'faq-card'} relative overflow-hidden ${isOpen ? 'shadow-[0_10px_30px_rgba(0,0,0,0.4)]' : ''}`}
				style={
					platformStyle
						? {
								background: 'linear-gradient(180deg, #0E121B 0%, #181B25 24%)',
								border: '1px solid rgba(31, 37, 51, 1)',
								borderRadius: '12px',
							}
						: undefined
				}
			>
				<button
					onClick={() => onToggle(realIndex)}
					aria-expanded={isOpen}
					className='w-full p-6 flex items-center justify-between gap-4 text-left'
				>
					<span
						className={`text-[15px] sm:text-[17px] md:text-[20px] font-medium transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}
					>
						{item.question}
					</span>

					<div
						className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-45 text-[#4FC3F7]' : 'text-white'}`}
					>
						<svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v12M6 12h12' />
						</svg>
					</div>
				</button>

				<div
					className='overflow-hidden transition-all duration-300 ease-in-out'
					style={{
						maxHeight: isOpen ? '600px' : '0px',
						opacity: isOpen ? 1 : 0,
						transform: isOpen ? 'translateY(0px)' : 'translateY(-10px)',
					}}
				>
					<div className='px-5 pb-6 text-gray-400 text-[16px] leading-relaxed pt-4'>
						{item.answer}
					</div>
				</div>
			</div>
		</AnimatedSection>
	)
})

/**
 * @param {string} [module] - /api/site-faqs `module` maydoni: qaysi sahifaning
 *   savollari ko'rsatilsin (education | library | articles | micro_data |
 *   vacancies). Berilmasa — barcha modullar (bosh sahifa uchun).
 */
const FAQSection = ({ hideParticles = false, platformStyle = false, module }) => {
    const {
        t
    } = useTranslation();

    const [openIndex, setOpenIndex] = useState(null)
    const { items } = useFaqs(module)

    const toggleFAQ = index => setOpenIndex(prev => (prev === index ? null : index))

    const leftItems = items.filter((_, i) => i % 2 === 0)
    const rightItems = items.filter((_, i) => i % 2 !== 0)

    return (
        <div className='relative overflow-hidden bg-[rgba(var(--bg-rgb),1)]' style={{ contentVisibility: 'auto', containIntrinsicSize: '0 900px' }}>
            <SectionBackground hideParticles={hideParticles} />
            <div className='relative z-10 text-white pt-[40px] pb-[60px] flex flex-col items-center'>
				<div className='w-full max-w-[1200px] mx-auto px-6'>
					<AnimatedSection className='text-center mb-10'>
						<Text
							buttonText='FAQ'
							buttonType={platformStyle ? 'button2' : 'button1'}
							title={
								platformStyle ? (
									'Foydalanuvchilardan izohlar'
								) : (
									<>{t("components.fAQSection.kop_beriladigan")}{' '}
										<span className='text-[rgba(var(--cyan-rgb),1)]'>{t("components.fAQSection.savollar")}</span>
									</>
								)
							}
							titleStyle={platformStyle ? { color: '#fff', fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' } : undefined}
							subtitleStyle={platformStyle ? { color: 'rgba(202,202,206,1)' } : undefined}
							highlight=''
							subtitle={
								<>{t("components.fAQSection.platforma_va_onlayn_kurslar")}<br />{t("components.fAQSection.eng_kop_beriladigan_savollarga")}</>
							}
						/>
					</AnimatedSection>
				</div>

				<div className='w-full max-w-[1200px] mx-auto px-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
						<div className='flex flex-col gap-6'>
							{leftItems.map((item, i) => (
								<FaqCard
									key={item.id}
									item={item}
									realIndex={i * 2}
									isOpen={openIndex === i * 2}
									onToggle={toggleFAQ}
									delay={i * 0.08}
									platformStyle={platformStyle}
								/>
							))}
						</div>

						<div className='flex flex-col gap-6'>
							{rightItems.map((item, i) => (
								<FaqCard
									key={item.id}
									item={item}
									realIndex={i * 2 + 1}
									isOpen={openIndex === i * 2 + 1}
									onToggle={toggleFAQ}
									delay={i * 0.08 + 0.04}
									platformStyle={platformStyle}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
        </div>
    );
}

export default FAQSection
