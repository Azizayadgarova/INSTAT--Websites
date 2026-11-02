import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFaqs } from '@/hooks/useFaqs'
import { useInView } from './hooks'

/** Ko'p beriladigan savollar — backend `site-faqs` (module=main), bo'lmasa statik fallback. */
export default function HomeFaq() {
	const { t } = useTranslation()
	const { items } = useFaqs('main')
	const [open, setOpen] = useState(0)
	const [secRef, inView] = useInView({ threshold: 0.12 })
	const [l1, l2 = ''] = t('home.fq_t').split('|')

	return (
		<section id='faq' aria-labelledby='fqTitle' ref={secRef} className={inView ? 'in' : ''}>
			<div className='fq-in'>
				<div className='fq-side'>
					<span className='lab'>{t('home.fq_lab')}</span>
					<h2 id='fqTitle'>
						{l1} <span>{l2}</span>
					</h2>
					<p>{t('home.fq_sub')}</p>
				</div>
				<div className='fq-list'>
					{items.map((q, i) => {
						const isOpen = open === i
						return (
							<div key={q.id ?? i} className={`fq-it${isOpen ? ' open' : ''}`} style={{ '--i': i }}>
								<button
									className='fq-q'
									type='button'
									aria-expanded={isOpen}
									aria-controls={`fqa${i}`}
									id={`fqq${i}`}
									onClick={() => setOpen(isOpen ? -1 : i)}
								>
									<span className='n'>{String(i + 1).padStart(2, '0')}</span>
									<span className='t'>{q.question}</span>
									<span className='pm' aria-hidden='true' />
								</button>
								<div className='fq-a' id={`fqa${i}`} role='region' aria-labelledby={`fqq${i}`}>
									<div>
										<p>{q.answer}</p>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
