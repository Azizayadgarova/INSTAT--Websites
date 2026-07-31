import DOMPurify from 'dompurify'
import { useMemo } from 'react'

const looksLikeHtml = s => typeof s === 'string' && /<\/?[a-z][\s\S]*>/i.test(s)

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
