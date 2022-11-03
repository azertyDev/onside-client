import Image from 'next/image';
import { Button, CustomHead, LangSwitcher, NextLink } from 'components/common';
import { LogoutIcon, MagnifyIcon } from 'components/common/icons';
import { dashboardMenu } from 'src/services/common_data';
import { useContext } from 'react';
import { Store } from 'utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import s from './index.module.scss';

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
            <CustomHead {...meta} />
            <div className={`${s.section}`}>
                <div className={s.sidebar}>
                    <NextLink href='/' className={s.logo}>
                        <Image src='/assets/icons/logo-dark.svg' layout='fill' alt='logo' />
                    </NextLink>

                    <ul>
                        {dashboardMenu.map((menu) => {
                            return (
                                <li
                                    key={menu.slug}
                                    className={
                                        `${menu.slug}` === router.query.slug![0] ? s.active : ''
                                    }
                                >
                                    <NextLink href={`/dashboard/${menu.slug}`}>
                                        {menu.icon}
                                        {menu.title}
                                    </NextLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className='w-full'>
                    <div className={s.header}>
                        <div className={s.toolsWrapper}>
                            {/* <div className={s.inputWrapper}>
                            <input type='text' placeholder='Поиск' className={s.searchInput} />
                            <MagnifyIcon className={s.searchIcon} />
                        </div> */}
                            <Button
                                variant='secondary'
                                className='md:w-full'
                                size='sm'
                                onClick={logoutClickHandler}
                            >
                                Выйти
                                <LogoutIcon />
                            </Button>
                            {/* <LangSwitcher /> */}
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </>
    );
};
