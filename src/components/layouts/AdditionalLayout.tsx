import { FC, ReactNode } from 'react';
import { Footer } from 'components/footer';
import { Header } from 'components/header';
import { CustomHead, NextLink } from 'components/common';
import { homeData, workTypes } from 'src/services/common_data';
import s from './index.module.scss';
import { Trans, useTranslation } from 'next-i18next';

type LayoutPropsType = {
    meta?: {
        title: string;
        content: string;
    };
    children: ReactNode;
};

const AdditionalBlock = () => {
    const { t } = useTranslation(['home', 'common']);
    const { additional_info, additional_contacts } = homeData;

    return (
        <div className={`container ${s.footer}`}>
            <div className={s.footer_info}>
                <span>{t(`home:${additional_info.title}`)}</span>
                <ul>
                    {additional_info.points.map(({ id, title }) => {
                        return <li key={id}>{t(`home:${title}`)}</li>;
                    })}
                </ul>
                <div className={s.additional}>{t(`home:${additional_info.additional}`)}</div>

                <div>
                    <Trans
                        t={t}
                        components={{
                            phone: (
                                <NextLink href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} />
                            ),
                            mail: <NextLink href={`mailto:${process.env.NEXT_PUBLIC_MAIL!}`} />,
                        }}
                        i18nKey={`home:${additional_contacts}`}
                    />
                </div>
            </div>
        </div>
    );
};

export const AdditionalLayout: FC<LayoutPropsType> = (props) => {
    return (
        <>
            <CustomHead {...props.meta} />
            <main>
                {props.children}
                <AdditionalBlock />
            </main>
        </>
    );
};
