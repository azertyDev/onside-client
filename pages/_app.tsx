import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { appWithTranslation } from 'next-i18next';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page: any) => page);
    const layOut = getLayout(<Component {...pageProps} />);
    return layOut;
}

// @ts-ignore:next-line
export default appWithTranslation(MyApp);
