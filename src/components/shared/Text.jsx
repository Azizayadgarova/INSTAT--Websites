import { Button } from '../shared/Button'

const Text = ({
	buttonText,
	title,
	highlight,
	subtitle,
	buttonType = 'button1',
	highlightColor,
	titleStyle,
	titleClassName = '',
	subtitleStyle,
}) => {
	const variant = buttonType === 'button2' ? 'light' : 'dark'
	const { fontSize: _fs, lineHeight: _lh, ...restTitleStyle } = titleStyle || {}

	return (
		<div className='z-30 flex flex-col items-center px-4 sm:px-6 lg:px-0'>
			<Button text={buttonText} variant={variant} />

			<div className='text-center'>
				<h1 className={`text_font pt-[15px] text-white md:text-[rgba(188,188,188,1)] ${titleClassName}`} style={restTitleStyle}>
					{title}
					{highlight ? (
						<>
							<br />
							<span style={highlightColor ? { color: highlightColor } : undefined} className={`block mt-2 md:mt-0 md:inline ${highlightColor ? '' : 'text-[rgba(0,230,252,1)]'}`}>{highlight}</span>
						</>
					) : null}
				</h1>

				<p className='text-[rgba(202,202,206,1)] md:text-[rgba(188,188,188,1)] mt-6 text-[14px] leading-[140%] md:text-[18px] md:leading-normal font-inter max-w-[260px] md:max-w-none mx-auto' style={subtitleStyle}>
					{subtitle}
				</p>
			</div>
		</div>
	)
}

export default Text
