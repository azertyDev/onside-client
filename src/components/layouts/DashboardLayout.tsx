import { useContext } from 'react';
import Cookies from 'js-cookie';
import { Store } from 'utils/Store';
import { useRouter } from 'next/router';
import { AppShell } from '@mantine/core';
import { Header, menu } from 'components/header';
import dynamic from 'next/dynamic';

const DynamicNavbar = dynamic(() => import('../common/navbar'), {
    ssr: false,
});

export const DashboardLayout = ({ children, meta }: any) => {
    const { dispatch, params } = useContext(Store);
    const router = useRouter();
    const { userInfo } = params;

    const logoutClickHandler = () => {
        dispatch({
            type: 'ADMIN_LOGOUT',
        });
        Cookies.remove('userInfo');
        Cookies.remove('token');
        router.push('/login');
    };

    return (
        <>
            <AppShell
                styles={{
                    main: {
                        background: '#fafafa',
                    },
                }}
                navbarOffsetBreakpoint='sm'
                navbar={
                    <DynamicNavbar menu={menu} logout={logoutClickHandler} userInfo={userInfo} />
                }
                header={<Header logout={logoutClickHandler} />}
            >
                {children}
            </AppShell>
        </>
    );
};
