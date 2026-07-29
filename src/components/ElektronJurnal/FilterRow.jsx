import { useTranslation } from 'react-i18next'

function FilterRow({
	author,
	setAuthor,
	authorOpen,
	setAuthorOpen,
	category,
	setCategory,
	catOpen,
	setCatOpen,
	onSearch,
	authorOptions = [],
	categoryOptions = [],
}) {
    const {
        t
    } = useTranslation();

    const dropStyle = {
		position: 'absolute',
		top: 'calc(100% + 8px)',
		left: 0,
		zIndex: 200,
		background: 'rgba(18,22,32,0.85)',
		backdropFilter: 'blur(16px)',
		WebkitBackdropFilter: 'blur(16px)',
		border: '1px solid rgba(255,255,255,0.07)',
		borderRadius: '14px',
		overflow: 'hidden',
		boxShadow:
			'0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
	}
    const itemStyle = active => ({
		padding: '10px 18px',
		fontSize: '13px',
		cursor: 'pointer',
		fontFamily: 'var(--font-display)',
		color: active ? 'rgba(var(--cyan-rgb),0.9)' : 'rgba(200,205,220,0.75)',
		background: active ? 'rgba(var(--cyan-rgb),0.06)' : 'transparent',
		borderBottom: '1px solid rgba(255,255,255,0.04)',
		transition: 'background 0.15s, color 0.15s',
	})

    return (
        <div
			className='w-[327px] md:w-full mx-auto md:mx-0'
			style={{
				height: '72px',
				borderRadius: '16px',
				padding: '12px',
				boxSizing: 'border-box',
				gap: '10px',
				background: 'rgba(var(--card-rgb),1)',
				border: '1px solid rgba(31,37,51,1)',
				display: 'flex',
				alignItems: 'center',
				marginBottom: '40px',
				position: 'relative',
				zIndex: 1,
			}}
		>
            {/* Authors */}
            <div
				style={{
					position: 'relative',
					
					padding: '0 16px',
					cursor: 'pointer',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
				onClick={() => {
					setAuthorOpen(p => !p)
					setCatOpen(false)
				}}
			>
				<div
					style={{
						fontSize: '16px',
						color: 'rgba(255, 255, 255, 1)',
						marginBottom: '4px',
						display: 'flex',
						gap: '75px',
						alignItems: 'center',
						fontFamily: 'var(--font-display)',
					}}
				>{"Yil"}{' '}
					<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<path
							d='M6 9l6 6 6-6'
							stroke='white'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
				<div
					style={{
						fontSize: '14px',
						color: 'rgba(202,202,206,1)',
						fontWeight: 500,
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						fontFamily: 'var(--font-display)',
					}}
				>
					{author}
				</div>
				{authorOpen && (
					<div style={{ ...dropStyle, minWidth: '190px' }}>
						{authorOptions.map(a => (
							<div
								key={a}
								style={itemStyle(a === author)}
								onClick={e => {
									e.stopPropagation()
									setAuthor(a)
									setAuthorOpen(false)
								}}
							>
								{a}
							</div>
						))}
					</div>
				)}
			</div>
            <div
				className='hidden md:block'
				style={{
					width: '1px',
					height: '30px',
					background: 'white',
					flexShrink: 0,
				}}
			/>
            {/* Categories */}
            <div
				className='hidden md:flex flex-col justify-center'
				style={{
					position: 'relative',
					flex: 1,
					padding: '0 16px',
					cursor: 'pointer',
					height: '100%',
				}}
				onClick={() => {
					setCatOpen(p => !p)
					setAuthorOpen(false)
				}}
			>
				<div
					style={{
						fontSize: '16px',
						color: 'white',
						marginBottom: '3px',
						fontFamily: 'var(--font-display)',
						display: 'flex',
						alignItems: 'center',
						gap: '46px',
					}}
				>{"Holat"}<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<path
							d='M6 9l6 6 6-6'
							stroke='white'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
				<div
					style={{
						fontSize: '14px',
						color: '#fff',
						fontWeight: 500,
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						fontFamily: 'var(--font-display)',
					}}
				>
					{category}
				</div>
				{catOpen && (
					<div
						style={{ ...dropStyle, minWidth: '210px' }}
					>
						{categoryOptions.map(c => (
							<div
								key={c}
								style={itemStyle(c === category)}
								onClick={e => {
									e.stopPropagation()
									setCategory(c)
									setCatOpen(false)
								}}
							>
								{c}
							</div>
						))}
					</div>
				)}
			</div>
            {/* Search */}
            <div style={{ flexShrink: 0 }}>
				<button
					onClick={onSearch}
					className='h-[48px] rounded-[12px] md:rounded-[10px] px-[14px] md:px-[24px]'
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '4px',
						background: 'rgba(var(--blue-rgb),1)',
						color: '#fff',
						border: '1px solid rgba(255,255,255,0.15)',
						fontSize: '14px',
						fontWeight: 500,
						cursor: 'pointer',
						fontFamily: 'var(--font-display)',
						flexShrink: 0,
					}}
				>
					<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
						<circle cx='11' cy='11' r='7' stroke='white' strokeWidth='2' />
						<path
							d='M16.5 16.5L21 21'
							stroke='white'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>{t("components.filterRow.izlash")}</button>
			</div>
        </div>
    );
}

export default FilterRow
