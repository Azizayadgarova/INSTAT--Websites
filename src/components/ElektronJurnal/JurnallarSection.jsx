import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import bgGlow from '@/assets/bgImg/Background (1).png'
import { AUTHORS, CATEGORIES, JOURNALS } from '@/data/journals.data'
import { Button2 } from '../shared/Button2'
import AnimatedSection from '../shared/AnimatedSection'
import Text from '../shared/Text'
import FilterRow from './FilterRow'
import JournalCard from './JournalCard'
import Pagination from './Pagination'

function JurnallarSection() {
    const {
        t
    } = useTranslation();

    const [page, setPage]           = useState(1)
    const [author, setAuthor]       = useState(AUTHORS[0])
    const [category, setCategory]   = useState(CATEGORIES[0])
    const [authorOpen, setAuthorOpen] = useState(false)
    const [catOpen, setCatOpen]     = useState(false)
    const [filtered, setFiltered]   = useState(JOURNALS)

    const PER_PAGE = 8

    const handleSearch = () => {
		const result = JOURNALS.filter(j => j.author === author && j.category === category)
		setFiltered(result)
		setPage(1)
	}

    const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <section
			style={{
				width: '100%',
				maxWidth: '1440px',
				margin: '0 auto',
				background: 'rgba(var(--bg-rgb),1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '40px 0 100px',
				position: 'relative',
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
				}} loading='lazy' decoding='async' />
            <AnimatedSection style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
					<Button2 text={t('components.jurnallarSection.jurnallar', 'Jurnallar')} />

					<h2
						style={{
							fontFamily: 'var(--font-display)',
							fontWeight: 600,
							fontSize: 'clamp(28px,4vw,48px)',
							lineHeight: 1.1,
							color: '#fff',
							margin: 0,
							letterSpacing: '-0.02em',
						}}
					>{t("components.jurnallarSection.nufuzli_jurnallar_va_songgi")}</h2>

					<p
						style={{
							fontFamily: 'var(--font-display)',
							fontWeight: 400,
							fontSize: '16px',
							lineHeight: '140%',
							color: 'rgba(202,202,206,1)',
							maxWidth: '500px',
							margin: 0,
						}}
					>{t("components.jurnallarSection.platformada_chop_etilayotgan_yetakchi")}</p>
				</div>
			</AnimatedSection>
            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px' }}>
				<FilterRow
					author={author}
					setAuthor={setAuthor}
					authorOpen={authorOpen}
					setAuthorOpen={setAuthorOpen}
					category={category}
					setCategory={setCategory}
					catOpen={catOpen}
					setCatOpen={setCatOpen}
					onSearch={handleSearch}
				/>
			</div>
            <div
				className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center md:justify-items-stretch'
				style={{
					gap: '20px',
					marginBottom: '48px',
					position: 'relative',
					zIndex: 1,
					width: '100%',
					maxWidth: '1200px',
				}}
			>
				{displayed.length > 0 ? displayed.map(j => (
					<JournalCard key={`${j.title}-${j.year}`} j={j} />
				)) : (
					<div style={{
						gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0',
						fontFamily: 'var(--font-display)',
						fontSize: '16px', color: 'rgba(150,160,180,1)',
					}}>{t("components.jurnallarSection.bu_tanlov_boyicha_jurnal")}</div>
				)}
			</div>
            <Pagination page={page} setPage={setPage} total={Math.ceil(filtered.length / PER_PAGE)} />
        </section>
    );
}

export default JurnallarSection
