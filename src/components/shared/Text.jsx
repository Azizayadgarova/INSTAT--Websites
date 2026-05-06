import { Button } from '../shared/Button'
import { Button2 } from '../shared/Button2'

const Text = ({
	buttonText,
	title,
	highlight,
	subtitle,
	buttonType = 'button1',
	highlightColor,
	titleStyle,
	subtitleStyle,
}) => {
	const renderButton = () => {
		if (buttonType === 'button2') {
			return <Button2 text={buttonText} />
		}
		return <Button text={buttonText} />
	}

	return (
		<div className='z-30 flex flex-col items-center'>
			{renderButton()}

			<div className='text-center '>
				<h1 className='text_font pt-[15px] text-[rgba(188,188,188,1)]  leading-[1.1]' style={titleStyle}>
					{title}
					{highlight ? (
						<>
							<br />
							<span style={highlightColor ? { color: highlightColor } : undefined} className={highlightColor ? undefined : 'text-[rgba(0,230,252,1)]'}>{highlight}</span>
						</>
					) : null}
				</h1>

				<p className='text-[rgba(188,188,188,1)] mt-[24px] text-[18px] font-inter' style={subtitleStyle}>
					{subtitle}
				</p>
			</div>
		</div>
	)
}

export default Text
