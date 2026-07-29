const Skeleton = ({ width = '100%', height = 16, radius = 8, style }) => (
	<span aria-hidden='true' className='instat-skeleton'
		style={{ display: 'block', width, height, borderRadius: radius, ...style }} />
)
export const SkeletonText = ({ lines = 3, gap = 12 }) => (
	<span style={{ display: 'flex', flexDirection: 'column', gap }}>
		{Array.from({ length: lines }).map((_, i) => (
			<Skeleton key={i} height={14} width={i === lines - 1 ? '70%' : '100%'} />
		))}
	</span>
)
export default Skeleton
