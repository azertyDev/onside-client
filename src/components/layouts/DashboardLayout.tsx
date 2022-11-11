import { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { Store } from 'utils/Store';
import { useRouter } from 'next/router';
import { AppShell } from '@mantine/core';
import { Header, menu } from 'components/header';
import { Navbar } from 'components/common/navbar';

export const DashboardLayout = ({ children, meta }: any) => {
    const { dispatch } = useContext(Store);
    const router = useRouter();

    const logoutClickHandler = () => {
        dispatch({
            type: 'ADMIN_LOGOUT',
        });
        Cookies.remove('userInfo');
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
                navbar={<Navbar menu={menu} logout={logoutClickHandler} />}
                header={<Header logout={logoutClickHandler} />}
            >
                {children}
            </AppShell>
        </>
    );
};
