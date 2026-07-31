import { useTranslation } from 'react-i18next'
import PagBtn from './PagBtn'

function Pagination({ page, setPage, total }) {
    const {
        t
    } = useTranslation();

    const getPages = () => {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
		if (page <= 5) return [1, 2, 3, 4, 5, '...', total]
		if (page >= total - 4)
			return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
		return [1, '...', page - 1, page, page + 1, '...', total]
	}
    return (
        <div
			className='justify-center md:justify-between'
			style={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				maxWidth: '1224px',
				position: 'relative',
				zIndex: 1,
			}}
		>
            <span
				className='hidden md:inline'
				style={{
					fontFamily: 'var(--font-display)',
					fontSize: '14px',
					color: 'rgba(100,110,130,1)',
					minWidth: '60px',
				}}
			>{t("components.pagination.sahifa")}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				<span className='hidden md:contents'>
					<PagBtn nav onClick={() => setPage(1)}>«</PagBtn>
				</span>
				<PagBtn nav onClick={() => setPage(p => Math.max(1, p - 1))}>
					‹
				</PagBtn>
				{getPages().map((p, i) =>
					p === '...' ? (
						<span
							key={`d${i}`}
							style={{
								width: '36px',
								height: '36px',
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'rgba(100,110,130,1)',
								fontSize: '14px',
								fontFamily: 'var(--font-display)',
							}}
						>
							...
						</span>
					) : (
						<PagBtn key={p} active={p === page} onClick={() => setPage(p)}>
							{p}
						</PagBtn>
					),
				)}
				<PagBtn nav onClick={() => setPage(p => Math.min(total, p + 1))}>
					›
				</PagBtn>
				<span className='hidden md:contents'>
					<PagBtn nav onClick={() => setPage(total)}>»</PagBtn>
				</span>
			</div>
            <button
				className='hidden md:flex'
				onClick={() => setPage(total)}
				style={{
					fontFamily: 'var(--font-display)',
					fontSize: '14px',
					color: 'rgba(150,160,180,1)',
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					alignItems: 'center',
					gap: '4px',
					minWidth: '60px',
					justifyContent: 'flex-end',
					padding: 0,
				}}
			>{t("components.pagination.barchasini_korish")}<span>›</span>
			</button>
        </div>
    );
}

export default Pagination
