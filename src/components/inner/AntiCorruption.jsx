import { useTranslation } from 'react-i18next'

import Block from '@/components/home/Block'
import { ANTI_CORRUPTION, COMMISSION_COLORS, COMMISSION_PHOTOS } from '@/data/antiCorruption.data'
import { IconShield, TASK_ICONS } from './icons'
import { pageImg } from './pageImg'

/**
 * "Korrupsiyaga qarshi kurashish": idoraviy komissiya tarkibi (rasmli kartalar) va asosiy vazifalari.
 * Prototip: INSTAT/page.html (`p03`). Matnlar statik — @/data/antiCorruption.data.
 */
export default function AntiCorruption() {
	const { i18n } = useTranslation()
	const c = ANTI_CORRUPTION[i18n.resolvedLanguage] ?? ANTI_CORRUPTION.uz

	return (
		<>
			<Block n='01' title={c.s[0]}>
				<div className='cm'>
					{c.M.map((m, i) => {
						const photo = pageImg(COMMISSION_PHOTOS[i])
						return (
							<article className='cmc' style={{ '--c': COMMISSION_COLORS[i] }} key={m[1]}>
								<div className='ph'>
									{photo ? (
										<img src={photo} alt={m[1]} loading='lazy' />
									) : (
										<span className='ini'>{m[1].split(' ')[1]?.replace(/\./g, '').slice(0, 2) ?? m[1][0]}</span>
									)}
									<span className='n'>{`0${i + 1}`}</span>
									<span className='rl'>
										<i />
										{m[0]}
									</span>
								</div>
								<div className='in'>
									<span className='rl2'>{m[0]}</span>
									<h3>{m[1]}</h3>
									<p>{m[2]}</p>
								</div>
							</article>
						)
					})}
				</div>
			</Block>
			<Block n='02' title={c.s[1]}>
				<div className='ac-tk'>
					{c.T.map((t, i) => (
						<div className='ac-t' key={t}>
							<span className='ic'>
								{TASK_ICONS[i]}
								<b>{`0${i + 1}`}</b>
							</span>
							{/* Matn statik (data fayldan), <em> belgilari bilan */}
							<p dangerouslySetInnerHTML={{ __html: t }} />
						</div>
					))}
					<div className='ac-ban'>
						<span className='sh'>
							<IconShield />
						</span>
						<div>
							<b>{c.bn[0]}</b>
							<span>{c.bn[1]}</span>
						</div>
					</div>
				</div>
			</Block>
		</>
	)
}
