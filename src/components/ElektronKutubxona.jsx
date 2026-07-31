import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgGlow from '@/assets/bgImg/Background (1).png'
import BlurWords from './shared/BlurWords'
import { Button2 } from './shared/Button2'
import BookCard from './ElektronKutubxona/BookCard'
import { books } from '../data/books.data'
import { booksApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { useSectionText } from '@/hooks/useSectionText'
import { pickField } from '@/utils/siteContent'

const vp = { once: true, amount: 0.2 }

const BOOKS_LIMIT = 8

// /books/ muqova rasmini bermaydi — statik kitoblardagi rasmlar navbat bilan
// o'rin egallaydi (MikroMalumotlar'dagi PLACEHOLDER_IMAGES bilan bir xil yondashuv).
const COVER_PLACEHOLDERS = books.map(b => b.image)

/**
 * Book (backend: /books/) -> BookCard shakli.
 * Reyting, sharh va izoh soni endpointda yo'q, shuning uchun `undefined` qoladi
 * — BookCard bunday maydonlarni umuman chizmaydi (soxta raqam ko'rsatilmasin).
 */
const toBook = (book, i, lang) => ({
	id: book.id,
	title: pickField(book, 'name', lang),
	category: pickField(book.category ?? {}, 'name', lang),
	image: book.book_thumbnails?.length ? import.meta.env.VITE_API_STORAGE_URL + "/" + book.book_thumbnails[0]?.file : COVER_PLACEHOLDERS[i % COVER_PLACEHOLDERS.length],
    stars_sum: book.stars_sum,
    comments_count: book.comments_count,
})

const ElektronKutubxona = () => {
    const {
        t, i18n
    } = useTranslation();

    const lang = i18n.resolvedLanguage ?? 'uz'
    const st = useSectionText('library')
    const navigate = useNavigate()
    const bgRef = useRef(null)
    const [bgVisible, setBgVisible] = useState(false)

    const { data, loading } = useApiResource(
		() => booksApi.getAll({ per_page: BOOKS_LIMIT }),
		[],
	)

    const apiBooks = useMemo(
		() =>
			(data?.items ?? [])
				.filter(b => b.is_active !== false)
				.map((b, i) => toBook(b, i, lang)),
		[data, lang],
	)

    // API bo'sh yoki xato qaytarsa statik katalog ko'rsatiladi (docs/API.md:
    // kontent fallback) — bo'lim hech qachon bo'sh qolmaydi.
    const displayed = apiBooks.length ? apiBooks : books

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
                    className='text-[14px] max-w-[327px] md:text-[16px] md:max-w-none'
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 400,
                        lineHeight: '140%',
                        color: 'rgba(202, 202, 206, 1)',
                        textAlign: 'center',
                        margin: 0,
                    }}
                >{st('library_description5', t("components.elektronKutubxona.platformamizdagi_barcha_elektron_kitobla"))}</motion.p>
            </div>
            {/* Books grid */}
            <div
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: '1200px',
                    padding: '0 24px',
                    gap: '20px',
                }}
            >
                {loading
                    ? Array.from({ length: BOOKS_LIMIT }, (_, i) => (
                        <div
                            key={`sk${i}`}
                            style={{
                                height: '360px',
                                borderRadius: '20px',
                                backgroundColor: 'rgba(var(--card-rgb),1)',
                                boxShadow: '0px 1px 5px 0px rgba(29, 36, 45, 0.5)',
                            }}
                        />
                    ))
                    : displayed.map((book, i) => (
                        <BookCard key={book.id} book={book} index={i} />
                    ))}
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
