import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Login } from 'src/pages/login';
import { Layout } from 'components/layouts/Layout';

const LoginPage: NextPage = (props) => {
    return <Login />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common', 'home'])),
        },
    };
};

// @ts-ignore:next-line
LoginPage.getLayout = function getLayout(page: ReactElement) {
    const meta = {
        title: 'Login page',
        content: '',
    };
    return <Layout meta={meta}>{page}</Layout>;
};

export default LoginPage;
