function PagBtn({ children, onClick, active, nav }) {
	const base = nav
		? 'transparent'
		: active
			? 'rgba(var(--blue-rgb),1)'
			: 'rgba(var(--card-rgb),1)'
	return (
		<button
			onClick={onClick}
			style={{
				width: '36px',
				height: '36px',
				borderRadius: '8px',
				border: 'none',
				background: base,
				color: active ? '#fff' : 'rgba(150,160,180,1)',
				fontSize: '14px',
				fontWeight: active ? 600 : 400,
				cursor: 'pointer',
				fontFamily: 'var(--font-display)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'background .2s',
			}}
			onMouseEnter={e => {
				if (!active && !nav)
					e.currentTarget.style.background = 'rgba(var(--blue-rgb),0.25)'
			}}
			onMouseLeave={e => {
				if (!active && !nav)
					e.currentTarget.style.background = 'rgba(var(--card-rgb),1)'
			}}
		>
			{children}
		</button>
	)
}

export default PagBtn
