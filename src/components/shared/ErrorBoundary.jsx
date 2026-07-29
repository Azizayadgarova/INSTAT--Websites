import { Component } from 'react'
import i18n from '../../i18n'

/**
 * Bitta komponent yiqilsa butun sayt oq ekran bo‘lib qolmasligi uchun.
 * Router'da `errorElement` sifatida ham, oddiy wrapper sifatida ham ishlatiladi.
 */
class ErrorBoundary extends Component {
	state = { hasError: false }

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		// Bu yerga Sentry/monitoring ulash mumkin
		console.error('[ErrorBoundary]', error, info?.componentStack)
	}

	render() {
		if (!this.state.hasError) return this.props.children

		return (
			<div
				role='alert'
				style={{
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 16,
					padding: 24,
					textAlign: 'center',
					background: 'rgba(var(--bg-rgb),1)',
					fontFamily: 'Inter, sans-serif',
				}}
			>
				<h1 style={{ color: '#fff', fontSize: 28, fontWeight: 600, margin: 0 }}>
					{i18n.t('error.title')}
				</h1>
				<p style={{ color: 'rgba(var(--text-rgb),1)', fontSize: 16, maxWidth: 480, margin: 0 }}>
					{i18n.t('error.text')}
				</p>
				<button
					type='button'
					onClick={() => window.location.reload()}
					style={{
						marginTop: 8,
						padding: '12px 24px',
						borderRadius: 10,
						border: '1px solid #5FA2F0',
						background: 'linear-gradient(180deg,#3E8BE6,#2B6FC4)',
						color: '#fff',
						fontSize: 16,
						cursor: 'pointer',
					}}
				>
					{i18n.t('error.reload')}
				</button>
			</div>
		)
	}
}

export default ErrorBoundary
