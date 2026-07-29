import { useTranslation } from 'react-i18next'
import { SkeletonText } from './Skeleton'

const AsyncBoundary = ({
	loading,
	error,
	onRetry,
	isEmpty = false,
	skeleton,
	children,
}) => {
	const { t } = useTranslation()
	if (loading)
		return (
			skeleton ?? (
				<div style={{ padding: '32px 0' }}>
					<SkeletonText lines={5} />
				</div>
			)
		)
	if (error) {
		return (
			<div role='alert' style={{ padding: '40px 0', textAlign: 'center' }}>
				<p style={{ color: 'rgba(var(--text-rgb),1)', marginBottom: 16 }}>
					{t('error.text')}
				</p>
				{onRetry && (
					<button
						type='button'
						onClick={onRetry}
						style={{
							padding: '10px 22px',
							borderRadius: 10,
							border: '1px solid rgba(var(--blue-rgb),0.5)',
							background: 'rgba(var(--blue-rgb),0.12)',
							color: '#fff',
							cursor: 'pointer',
							fontSize: 15,
						}}
					>
						{t('error.reload')}
					</button>
				)}
			</div>
		)
	}
	if (isEmpty) {
		return (
			<div style={{ padding: '40px 0', textAlign: 'center' }}>
				<p style={{ color: 'rgba(var(--muted-rgb),1)' }}>
					{t('common.comingSoonHint')}
				</p>
			</div>
		)
	}
	return children
}
export default AsyncBoundary
