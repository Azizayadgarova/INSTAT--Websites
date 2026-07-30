import DOMPurify from 'dompurify'
import { useMemo } from 'react'

const looksLikeHtml = s => typeof s === 'string' && /<\/?[a-z][\s\S]*>/i.test(s)

// Backend HTML ko'pincha Word/Quill'dan nusxalangan inline ranglar bilan keladi
// (masalan color: rgb(0, 0, 0)) — bu qorong'i mavzuda o'qib bo'lmaydi. Sayt
// mavzusi ranglarni boshqarishi uchun inline color/background ni olib tashlaymiz.
DOMPurify.addHook('afterSanitizeAttributes', node => {
	if (node.style) {
		node.style.removeProperty('color')
		node.style.removeProperty('background')
		node.style.removeProperty('background-color')
		if (node.getAttribute('style') === '') node.removeAttribute('style')
	}
})

const RichContent = ({ html, className, style }) => {
	const clean = useMemo(() => (html ? DOMPurify.sanitize(html, { USE_PROFILES: { html: true } }) : ''), [html])
	if (!html) return null
	if (!looksLikeHtml(html)) return <p className={className} style={style}>{html}</p>
	return (
		<div className={`instat-rich ${className ?? ''}`} style={style}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: clean }} />
	)
}
export default RichContent
