import { useParams } from 'react-router-dom'
import PagePlaceholder from '../../components/shared/PagePlaceholder'
import { useMenu } from '../../hooks/useMenu'

/**
 * "O'quv faoliyati" ichki bo'limlari uchun umumiy sahifa — hozircha barchasi
 * bo'sh (kontent tayyor emas). Kelajakda alohida sahifa kerak bo'lsa,
 * router.jsx'da shu path uchun aniq route qo'shilsa, u shu generic route'dan
 * ustun turadi (React Router aniq segmentlarni :section'dan ustun qo'yadi).
 */
const OquvFaoliyatiSection = () => {
	const { section } = useParams()
	const menu = useMenu()
	const link = menu.oquvFaoliyati?.links.find(l => l.path === section)

	return <PagePlaceholder title={link?.name ?? menu.oquvFaoliyati?.title} />
}

export default OquvFaoliyatiSection
