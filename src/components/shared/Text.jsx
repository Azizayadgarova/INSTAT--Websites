import { Button } from '../shared/Button'

const Text = ({ buttonText, title, highlight, subtitle }) => {
	return (
		<div className=' z-30 flex flex-col items-center'>
			<div className=''>
				<Button text={buttonText} />
			</div>
			<div className='text-center mt-[24px]'>
				<h1 className='text_font pt-[15px] text-[rgba(188,188,188,1)]'>
					{title}
					<br />
					<span className='text-[rgba(0,230,252,1)] '>{highlight}</span>
				</h1>
				<p className='text-[rgba(188,188,188,1)] mt-[24px] text-[18px] font-inter'>{subtitle}</p>
			</div>
		</div>
	)
}

export default Text
