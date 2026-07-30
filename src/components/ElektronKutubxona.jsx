import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgGlow from '@/assets/bgImg/Background (1).png'
import BlurWords from './shared/BlurWords'
import { Button2 } from './shared/Button2'
import BookCard from './ElektronKutubxona/BookCard'
import { booksApi } from '@/api/resources.api'
import { pickField, mediaUrl } from '@/utils/siteContent'
import { useApiResource } from '@/hooks/useApiResource'
import { useSiteText } from '@/hooks/useSiteText'
import AsyncBoundary from './shared/AsyncBoundary'
import Skeleton from './shared/Skeleton'

const vp = { once: true, amount: 0.2 }

// Books API ishlamay turganda ko'rsatiladigan statik zaxira ro'yxat (hozircha).
// API tuzalgach avtomatik yana backend'dan olinadi.
const FALLBACK_BOOKS = [
	{ id: 'fb-1', title: "O'zbekiston tarixi", category: 'Tarix', image: '', rating: 4.8, reviews: 120, izoh: 45 },
	{ id: 'fb-2', title: "Ona tili grammatikasi", category: 'Til va adabiyot', image: '', rating: 4.6, reviews: 98, izoh: 32 },
	{ id: 'fb-3', title: "Statistika asoslari", category: 'Iqtisodiyot', image: '', rating: 4.9, reviews: 210, izoh: 76 },
	{ id: 'fb-4', title: "Zamonaviy matematika", category: 'Aniq fanlar', image: '', rating: 4.7, reviews: 150, izoh: 54 },
	{ id: 'fb-5', title: "Demografiya va aholi", category: 'Ijtimoiy fanlar', image: '', rating: 4.5, reviews: 88, izoh: 27 },
	{ id: 'fb-6', title: "Axborot texnologiyalari", category: 'IT', image: '', rating: 4.8, reviews: 175, izoh: 61 },
	{ id: 'fb-7', title: "Iqtisodiy geografiya", category: 'Geografiya', image: '', rating: 4.4, reviews: 64, izoh: 19 },
	{ id: 'fb-8', title: "Milliy hisoblar tizimi", category: 'Iqtisodiyot', image: '', rating: 4.9, reviews: 132, izoh: 48 },
]

/** API'dan kelgan kitobni BookCard kutgan shaklga o'giradi. */
const mapBook = (book, lang) => ({
	id: book.id,
	title: pickField(book, 'name', lang),
	category: pickField(book.category, 'name', lang),
	image: mediaUrl(book.book_thumbnails?.[0]?.file) || mediaUrl(book.image),
	rating: book.comments_count > 0 ? Number((book.stars_sum / book.comments_count).toFixed(1)) : 0,
	reviews: book.comments_count ?? 0,
	izoh: book.orders_count ?? 0,
})

const BooksSkeleton = () => (
	<div
		className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
		style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', padding: '0 24px', gap: '20px' }}
	>
		{[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
			<div key={i} style={{ backgroundColor: 'rgba(var(--card-rgb),1)', borderRadius: '20px', overflow: 'hidden' }}>
				<Skeleton height={267} radius={0} />
				<div style={{ padding: '10px 14px 16px' }}>
					<Skeleton height={14} width='50%' style={{ marginBottom: 10 }} />
					<Skeleton height={16} width='85%' style={{ marginBottom: 8 }} />
					<Skeleton height={12} width='40%' />
				</div>
			</div>
		))}
	</div>
)

const ElektronKutubxona = () => {
    const {
        t, i18n
    } = useTranslation();
    const lang = i18n.resolvedLanguage ?? 'uz'
    const st = useSiteText('library')

    const { data, loading, retry } = useApiResource(
		() => booksApi.getAll({ per_page: 8 }),
		[],
	)
	// API xato bersa yoki bo'sh bo'lsa — statik zaxira (hozircha xatolik ko'rsatilmaydi)
	const apiBooks = (data?.items ?? []).map(b => mapBook(b, lang))
	const books = apiBooks.length ? apiBooks : FALLBACK_BOOKS

    const navigate = useNavigate()
    const bgRef = useRef(null)
    const [bgVisible, setBgVisible] = useState(false)

    useEffect(() => {
		const el = bgRef.current?.parentElement
		if (!el) return
		const observer = new IntersectionObserver(
			([entry]) => setBgVisible(entry.isIntersecting),
			{ threshold: 0.05 },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

    return (
        <section
            style={{
                width: '100%',
                backgroundColor: 'rgba(var(--bg-rgb),1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '40px',
                paddingBottom: '80px',
            }}
        >
            <img
                ref={bgRef}
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
                    opacity: bgVisible ? 1 : 0,
                    transition: 'opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }} loading='lazy' decoding='async' />
            {/* Header */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '20px',
                    maxWidth: '720px',
                    padding: '0 24px',
                    marginBottom: '56px',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Button2 text='Elektron kutubxona' />
                </motion.div>

                <BlurWords
                    text={st('library_title5', 'Kitoblar katalogi')}
                    delay={0.1}
                    step={0.08}
                    className='text-[32px] leading-[40px] md:text-[48px] md:leading-[58px]'
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        color: '#ffffff',
                        display: 'block',
                    }}
                />

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                    className='text-[14px] max-w-[327px] md:text-[16px] md:max-w-160 mx-auto'
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 400,
                        lineHeight: '140%',
                        color: 'rgba(202, 202, 206, 1)',
                        textAlign: 'center',
                        margin: '0 auto',
                    }}
                >{st('library_description5', t("components.elektronKutubxona.platformamizdagi_barcha_elektron_kitobla"))}</motion.p>
            </div>
            {/* Books grid */}
            <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <AsyncBoundary
                    loading={loading}
                    error={null}
                    onRetry={retry}
                    isEmpty={false}
                    skeleton={<BooksSkeleton />}
                >
                    <div
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                        style={{
                            width: '100%',
                            maxWidth: '1200px',
                            padding: '0 24px',
                            gap: '20px',
                        }}
                    >
                        {books.map((book, i) => (
                            <BookCard key={book.id} book={book} index={i} />
                        ))}
                    </div>
                </AsyncBoundary>
            </div>
            {/* Barchasini ko'rish */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                style={{ position: 'relative', zIndex: 1, marginTop: '40px' }}
            >
                <button style={{
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
                onClick={() => navigate('/platform/raqamli-kutubxona')}
                >{t("components.elektronKutubxona.barchasini_korish")}</button>
            </motion.div>
        </section>
    );
}

export default ElektronKutubxona
