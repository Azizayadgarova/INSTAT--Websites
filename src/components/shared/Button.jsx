const variants = {
	dark: 'bg-[rgb(22,32,49)] border-[rgb(33,44,61)] text-[rgba(244,244,245,1)]',
	light: 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.04)] text-white',
}

export const Button = ({ text, variant = 'dark' }) => {
	return (
		<span className={`text-[12px] leading-[20px] md:text-base md:leading-normal px-[15px] py-[5px] rounded-[100px] font-inter border-[1px] ${variants[variant]}`}>
			{text}
		</span>
	)
}
