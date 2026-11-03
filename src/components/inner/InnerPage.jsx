import Seo from '@/components/shared/Seo'

/**
 * Ichki sahifa tanasi: bo'limlar orasida 72px oraliq, yon mundarija chiqmaydi (`data-no-toc`).
 * `title` — brauzer sarlavhasi (SEO).
 */
export default function InnerPage({ title, children }) {
	return (
		<div data-no-toc style={{ display: 'grid', gap: 72, paddingBottom: 40 }}>
			<Seo title={title} />
			{children}
		</div>
	)
}
