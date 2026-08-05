import {useTranslation} from 'react-i18next'
import {useDataText} from '@/hooks/useDataText'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'

const vp = {once: true, amount: 0.2}

const BookCard = ({book, index}) => {
    const dt = useDataText('books')
    const navigate = useNavigate()
    const {
        t
    } = useTranslation();

    return (
        <motion.div
            initial={{opacity: 0, y: 32}}
            whileInView={{opacity: 1, y: 0}}
            viewport={vp}
            transition={{duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.08}}
            onClick={() => navigate(`/platform/kitob/${book.id}`)}
            style={{
                backgroundColor: 'rgba(var(--card-rgb),1)',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0px 1px 5px 0px rgba(29, 36, 45, 0.5)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            whileHover={{y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.4)'}}
        >
            {/* Image area */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '267px',
                backgroundColor: 'rgba(31, 37, 51, 1)',
                flexShrink: 0,
            }}>
                {/* Top dots */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                }}>
                    <div style={{
                        width: '18px',
                        height: '3px',
                        borderRadius: '2px',
                        backgroundColor: 'rgba(255,255,255,0.15)'
                    }}/>
                    <div style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.15)'
                    }}/>
                    <div style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.15)'
                    }}/>
                </div>

                {/* Book cover */}
                <img
                    src={book.image}
                    alt={dt(book, 'title')}
                    loading='lazy'
                    style={{
                        position: 'absolute',
                        top: '47px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '176px',
                        height: '220px',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: '0px',
                    }}
                />
            </div>
            {/* Info */}
            <div style={{padding: '10px 14px 16px'}}>
                {/* Reyting/izoh soni API'da yo'q — bo'lsa ko'rsatiladi, bo'lmasa qator chizilmaydi */}
                {(book.stars_sum) ? (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                    }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                            {book.stars_sum && (
                                <>
                                    <span style={{fontSize: '13px'}}>⭐</span>
                                    <span style={{
                                        color: '#fff',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        fontFamily: 'var(--font-inter)'
                                    }}>
                                        {(book.stars_sum / book.comments_count).toFixed(1)}
                                    </span>
                                </>
                            )}
                            {book.comments_count && (
                                <span style={{
                                    color: 'rgba(144,157,162,1)',
                                    fontSize: '12px',
                                    fontFamily: 'var(--font-inter)'
                                }}>
                                    ({book.comments_count})
                                </span>
                            )}
                        </div>
                        {book.comments_count && (
                            <span style={{
                                color: 'rgba(144,157,162,1)',
                                fontSize: '12px',
                                fontFamily: 'var(--font-inter)'
                            }}>
                                {book.izoh}{t("components.bookCard.ta_izoh")}</span>
                        )}
                    </div>
                ): ''}

                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '22px',
                    color: '#ffffff',
                    margin: '0 0 4px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {dt(book, 'title')}
                </h3>

                <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: 'rgba(144,157,162,1)',
                    margin: 0,
                }}>
                    {dt(book, 'category')}
                </p>
            </div>
        </motion.div>
    );
}

export default BookCard
