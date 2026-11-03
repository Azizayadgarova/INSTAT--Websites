import { useTranslation } from 'react-i18next'
import ExecutionTable from '@/components/inner/ExecutionTable'
import InnerPage from '@/components/inner/InnerPage'

const DasturBajarilishi = () => {
	const { t } = useTranslation()
	return (
		<InnerPage title={t('menu.oquvFaoliyati.dastur-bajarilishi')}>
			<ExecutionTable />
		</InnerPage>
	)
}

export default DasturBajarilishi
