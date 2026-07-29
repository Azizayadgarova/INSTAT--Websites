import { useTranslation } from 'react-i18next'
const IshOrinlari = () => {
    const {
        t
    } = useTranslation();

    return <div>{t("pages.ishOrinlari.ishorinlari")}</div>;
}

export default IshOrinlari
