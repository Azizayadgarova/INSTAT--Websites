import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '@/components/shared/Seo'
import { generateCertificate } from '@/api/certificates.api'

const BTN =
	'rounded-[10px] border border-[#5FA2F0] bg-gradient-to-b from-[#3E8BE6] to-[#2B6FC4] px-6 py-3 text-[16px] text-white'

const CertificateView = ({ id }) => {
	const { t } = useTranslation()
	const [state, setState] = useState({ status: 'loading', url: '', isImage: false })
	const [attempt, setAttempt] = useState(0)

	useEffect(() => {
		const controller = new AbortController()
		let objectUrl = ''
		generateCertificate(id, controller.signal)
			.then(({ blob, url }) => {
				if (blob) objectUrl = URL.createObjectURL(blob)
				setState({ status: 'ready', url: objectUrl || url, isImage: blob ? blob.type.startsWith('image/') : /\.(png|jpe?g|webp)$/i.test(url) })
			})
			.catch(err => {
				if (controller.signal.aborted) return
				setState({ status: err?.status === 404 ? 'notFound' : 'error', url: '', isImage: false })
			})
		return () => {
			controller.abort()
			if (objectUrl) URL.revokeObjectURL(objectUrl)
		}
	}, [id, attempt])

	const { status, url, isImage } = state

	return (
		<div className='mx-auto flex min-h-[70vh] w-full max-w-[1000px] flex-col items-center gap-6 px-4 py-16 text-white'>
			<Seo title={t('pages.certificateDownload.title', 'Sertifikat')} noindex />
			<h1 className='text-center text-[28px] font-semibold md:text-[40px]'>
				{t('pages.certificateDownload.title', 'Sertifikat')}
			</h1>

			{status === 'loading' && (
				<p className='mt-10 text-white/70' role='status'>
					{t('pages.certificateDownload.loading', 'Sertifikat tayyorlanmoqda...')}
				</p>
			)}

			{(status === 'notFound' || status === 'error') && (
				<div className='mt-10 flex flex-col items-center gap-6 text-center'>
					<p className='text-white/70'>
						{status === 'notFound'
							? t('pages.certificateDownload.not_found', 'Sertifikat topilmadi')
							: t('pages.certificateDownload.error', "Sertifikatni yuklab bo'lmadi. Keyinroq qayta urinib ko'ring.")}
					</p>
					<div className='flex gap-4'>
						{status === 'error' && (
							<button type='button' onClick={() => {
								setState({ status: 'loading', url: '', isImage: false })
								setAttempt(a => a + 1)
							}} className={BTN}>
								{t('pages.certificateDownload.retry', 'Qayta urinish')}
							</button>
						)}
						<Link to='/' className={BTN}>{t('common.home')}</Link>
					</div>
				</div>
			)}

			{status === 'ready' && (
				<>
					<a href={url} download={`certificate-${id}`} target='_blank' rel='noopener noreferrer' className={BTN}>
						{t('pages.certificateDownload.download', 'Yuklab olish')}
					</a>
					{isImage ? (
						<img src={url} alt={t('pages.certificateDownload.title', 'Sertifikat')} className='w-full rounded-2xl' />
					) : (
						<iframe
							src={url}
							title={t('pages.certificateDownload.title', 'Sertifikat')}
							className='h-[70vh] w-full rounded-2xl bg-white'
						/>
					)}
				</>
			)}
		</div>
	)
}

// key={id}: id o'zgarsa holat noldan boshlansin
const CertificateDownload = () => {
	const { id } = useParams()
	return <CertificateView key={id} id={id} />
}

export default CertificateDownload
