import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Dashboard } from 'src/pages/dashboard';
import { DashboardLayout } from 'components/layouts/DashboardLayout';

require('dayjs/locale/ru');

const DashboardPages: NextPage = (props) => {
    return <Dashboard {...props} />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common', 'home'])),
        },
    };
};

// @ts-ignore:next-line
DashboardPages.getLayout = function getLayout(page: ReactElement) {
    const meta = {
        title: 'Dashboard',
        content: '',
    };
    return <DashboardLayout meta={meta}>{page}</DashboardLayout>;
};

export default DashboardPages;
