import { useState } from 'react'
import AnimatedSection from './shared/AnimatedSection'
import SectionBackground from './shared/SectionBackground'
import Text from './shared/Text'

const FAQSection = () => {
	const [openIndex, setOpenIndex] = useState(null)

	const faqData = [
		{
			question: 'What is the AI Scheduling Assistant?',
			answer:
				'The AI Scheduling Assistant is an advanced tool that uses artificial intelligence to manage your appointments, meetings, and schedules effortlessly.',
		},
		{
			question: 'How does the AI Scheduling Assistant work?',
			answer:
				'It analyzes your availability and preferences to suggest the best times for meetings and syncs with your calendars automatically.',
		},
		{
			question: 'Is the AI Scheduling Assistant compatible with my calendar?',
			answer:
				'Yes, our AI Scheduling Assistant seamlessly integrates with popular calendar applications like Google Calendar, Outlook, and Apple Calendar, ensuring your schedules are always in sync.',
		},
		{
			question: 'Can the AI Scheduling Assistant manage tasks as well?',
			answer:
				'Yes, it can prioritize and schedule tasks to maximize productivity.',
		},
		{
			question: 'How secure is my data with the AI Scheduling Assistant?',
			answer:
				'We take your privacy and security seriously. Our AI Scheduling Assistant uses advanced encryption and security protocols to ensure your data is protected at all times.',
		},
		{
			question: 'Can I customize notifications and reminders?',
			answer:
				'Yes, you can fully customize alerts, reminders, and notifications.',
		},
		{
			question: 'How do I start with AI Scheduling?',
			answer: 'Sign up, connect your calendar, and start scheduling instantly.',
		},
		{
			question: 'What are the pricing plans for the AI Scheduling Assistant?',
			answer:
				'We offer flexible plans for individuals, teams, and enterprises.',
		},
	]

	const toggleFAQ = index =>
		setOpenIndex(prev => (prev === index ? null : index))

	const leftItems = faqData.filter((_, i) => i % 2 === 0)
	const rightItems = faqData.filter((_, i) => i % 2 !== 0)

	const renderCard = (item, realIndex, delay = 0) => {
		const isOpen = openIndex === realIndex
		return (
			<AnimatedSection key={realIndex} delay={delay}>
				<div
					className={`faq-card relative overflow-hidden ${isOpen ? 'shadow-[0_10px_30px_rgba(0,0,0,0.4)]' : ''}`}
				>
					<button
						onClick={() => toggleFAQ(realIndex)}
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
							<svg
								className='w-8 h-8'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M12 6v12M6 12h12'
								/>
							</svg>
						</div>
					</button>
					<div
						className='overflow-hidden transition-all duration-300 ease-in-out'
						style={{
							maxHeight: isOpen ? '500px' : '0px',
							opacity: isOpen ? 1 : 0,
						}}
					>
						<div className='px-5 pb-6 text-gray-400 text-[16px] leading-relaxed pt-4'>
							{item.answer}
						</div>
					</div>
				</div>
			</AnimatedSection>
		)
	}

	return (
		<div className='relative overflow-hidden bg-[rgba(14,18,27,1)]'>
			<SectionBackground />
			<style>{`
				.faq-card {
					background-image:
						linear-gradient(180deg, #0E121B 0%, #181B25 24%),
						linear-gradient(0deg, #28446B, #28446B),
						conic-gradient(from 0deg at 50% 50%, #2B75CC 0deg, rgba(43,117,204,0.05) 72deg, rgba(43,117,204,0.05) 288deg, #2B75CC 360deg);
					background-origin: border-box;
					background-clip: padding-box, border-box;
					border: 1px solid transparent;
					border-radius: 12px;
				}
			`}</style>

			<div className='relative z-10 min-h-screen text-white pt-[40px] pb-[100px] flex flex-col items-center'>
				<div className='w-full max-w-[1200px] mx-auto px-6'>
					<AnimatedSection className='text-center mb-10'>
						<Text
							buttonText='FAQ'
							title={
								<>
									Ko'p beriladigan{' '}
									<span className='text-[rgba(0,230,252,1)]'>savollar</span>
								</>
							}
							highlight=''
							subtitle={
								<>
									Platforma va onlayn kurslar bo'yicha <br /> eng ko'p
									beriladigan savollarga javoblar
								</>
							}
						/>
					</AnimatedSection>
				</div>

				<div className='w-full max-w-[1200px] mx-auto px-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
						<div className='flex flex-col gap-6'>
							{leftItems.map((item, i) => renderCard(item, i * 2, i * 0.08))}
						</div>
						<div className='flex flex-col gap-6'>
							{rightItems.map((item, i) =>
								renderCard(item, i * 2 + 1, i * 0.08 + 0.04),
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FAQSection
