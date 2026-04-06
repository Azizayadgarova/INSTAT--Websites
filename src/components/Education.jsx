import backgraund from '../assets/Background.png'

import Text from '../components/shared/Text'
const Education = () => {
	return (
		<div
			className='relative py-[60px] w-full bg-[rgba(14,18,27,1)]  font-sans '
			style={{
				backgroundImage: `url(${backgraund})`,
				backgroundRepeat: 'no-repeat',

				backgroundSize: '90% auto',
				backgroundPosition: 'center top',
			}}
		>
	
<Text
	buttonText="Bizning platformalar"
	title="Barcha imkoniyatlar"
	highlight="bir joyda"
	subtitle={
		<>
			Beshta platforma orqali o'qish, tadqiqot qilish, bilim olish va professional <br />
			rivojlanish imkoniyatlari.
		</>
	}
/>
		</div>
	)
}

export default Education
