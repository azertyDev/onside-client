import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { appWithTranslation } from 'next-i18next';
import { MantineProvider } from '@mantine/core';
import { StoreProvider } from 'utils/Store';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import '../styles/globals.scss';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page: any) => page);
    const layout = getLayout(<Component {...pageProps} />);
    return (
        <>
            <Head>
                <title>Onside dashboard</title>
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
            </Head>
            <StoreProvider>
                <MantineProvider
                    // withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        /** Put your mantine theme override here */
                        colorScheme: 'light',
                    }}
                >
                    <ModalsProvider>
                        <NotificationsProvider>{layout}</NotificationsProvider>
                    </ModalsProvider>
                </MantineProvider>
            </StoreProvider>
        </>
    );
}

// @ts-ignore:next-line
export default appWithTranslation(MyApp);
