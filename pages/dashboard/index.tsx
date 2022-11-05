import type { GetServerSidePropsContext, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "components/layouts/Layout";
import { Home } from "src/pages/home";

const DashboardPage: NextPage = (props: any) => {
    return <Home />;
};

interface IHomeProps {}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const lang = context.locale;

    return {
        props: {
            ...(await serverSideTranslations(lang as string, [
                "common",
                "home",
            ])),
        },
    };
}

// @ts-ignore:next-line
DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default DashboardPage;
