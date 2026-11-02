import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { POSTGRADUATE } from '@/data/postgraduate.data'
import './postgraduate.css'

const PHOTOS = import.meta.glob('/src/assets/postgraduate/*', { eager: true, import: 'default' })
const photoOf = file => PHOTOS[`/src/assets/postgraduate/${file}`]

const pad = n => String(n).padStart(2, '0')

/** Bitta tadqiqotchi kartasi; "Batafsil" — to'liq mavzu, ixtisoslik va ilmiy rahbarni ochadi. */
const Card = ({ person, index }) => {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const detailId = useId()
	const photo = photoOf(person.photo)

	return (
		<li className={`pgc ${person.degree === 'DSc' ? 'dsc' : 'phd'}${open ? ' open' : ''}`}>
			<span className='pgc-n' aria-hidden='true'>
				{pad(index + 1)}
			</span>
			<div className={`pgc-ph${photo ? '' : ' no'}`}>
				{photo ? <img src={photo} alt={person.name} width='96' height='132' loading='lazy' decoding='async' /> : person.name[0]}
			</div>
			<div className='pgc-b'>
				<h3 className='pgc-name'>{person.name}</h3>
				<div className='pgc-tags'>
					<span className='pgc-deg'>{person.degree}</span>
					<span className='pgc-sp' title={`${person.code} · ${person.field}`}>
						{person.code} · {person.field}
					</span>
				</div>
				<p className='pgc-t'>{person.topic}</p>
				{open && (
					<dl className='pgc-dl' id={detailId}>
						<div>
							<dt>{t('postgrad.supervisor')}</dt>
							<dd>{person.supervisor}</dd>
						</div>
						<div>
							<dt>{t('postgrad.specialty')}</dt>
							<dd>
								{person.code} · {person.field}
							</dd>
						</div>
					</dl>
				)}
				<button type='button' className='pgc-more' aria-expanded={open} aria-controls={open ? detailId : undefined} onClick={() => setOpen(o => !o)}>
					{open ? `${t('postgrad.less')} −` : `${t('postgrad.more')} +`}
				</button>
			</div>
		</li>
	)
}

/**
 * "Oliy ta'limdan keyingi ta'lim" sahifasi: doktorant, tayanch doktorant va stajyor tadqiqotchilar
 * kurslar bo'yicha guruhlangan kartalar sifatida. Ma'lumot statik — @/data/postgraduate.data.
 */
export default function PostgraduateList() {
	const { t } = useTranslation()
	const courses = [...new Set(POSTGRADUATE.map(p => p.course))].sort((a, b) => a - b)

	return (
		<div className='pgl'>
			<p className='pgl-intro'>
				{t('postgrad.intro')}
				<b>{t('postgrad.info')}</b>
			</p>
			{courses.map(course => {
				const people = POSTGRADUATE.filter(p => p.course === course)
				return (
					<section key={course}>
						<div className='pgl-head'>
							<h2 data-n={people.length}>{t('postgrad.course', { n: course })}</h2>
							<i />
						</div>
						<ul className='pgl-grid'>
							{people.map((p, i) => (
								<Card key={p.name} person={p} index={i} />
							))}
						</ul>
					</section>
				)
			})}
		</div>
	)
}
