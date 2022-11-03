import { useTranslation } from "next-i18next";

export const Home = (props: any) => {
    const {t} = useTranslation('home');

    return (
        <>
            <h1>{t('home:nav.about_us')}</h1>
        </>
    );
};
