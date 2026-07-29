import { useTranslation } from 'react-i18next'

/**
 * Data fayllardagi (src/data/*) matnlarni joriy tilga o'giradi.
 *
 * Data fayllar o'zbekcha matnni saqlab qoladi — u fallback bo'lib xizmat qiladi.
 * Tarjimalar src/i18n/<lang>.json ichida `data.<collection>.<id>.<field>` kalitida.
 * Tarjima topilmasa, o'zbekcha matn ko'rsatiladi (hech qachon bo'sh joy qolmaydi).
 *
 *   const dt = useDataText('jobs')
 *   <h3>{dt(job, 'title')}</h3>
 */
export const useDataText = collection => {
	const { t } = useTranslation()
	return (item, field) => t(`data.${collection}.${item.id}.${field}`, item[field] ?? '')
}

export default useDataText
