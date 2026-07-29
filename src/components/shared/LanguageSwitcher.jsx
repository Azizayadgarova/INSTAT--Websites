import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../../i18n'

const LanguageSwitcher = ({ compact = false }) => {
	const { i18n, t } = useTranslation()
	const current = i18n.resolvedLanguage

	return (
		<div
			role='group'
			aria-label={t('common.language')}
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 2,
				padding: 2,
				borderRadius: 999,
				background: 'rgba(var(--blue-rgb),0.08)',
				border: '1px solid rgba(255,255,255,0.08)',
			}}
		>
			{LANGUAGES.map(({ code, label }) => {
				const active = current === code
				return (
					<button
						key={code}
						type='button'
						lang={code}
						aria-pressed={active}
						onClick={() => i18n.changeLanguage(code)}
						style={{
							padding: compact ? '4px 8px' : '6px 12px',
							borderRadius: 999,
							border: 'none',
							cursor: 'pointer',
							fontSize: 13,
							fontWeight: active ? 600 : 500,
							lineHeight: 1.2,
							color: active ? '#fff' : 'rgba(var(--muted-rgb),1)',
							background: active ? 'rgba(var(--blue-rgb),0.85)' : 'transparent',
							transition: 'background .2s, color .2s',
						}}
					>
						{label}
					</button>
				)
			})}
		</div>
	)
}

export default LanguageSwitcher
