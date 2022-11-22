import {
    createStyles,
    Header as MantineHeader,
    Group,
    Button,
    Divider,
    Burger,
    Drawer,
    ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NextLink } from 'components/common/next_link';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IHeaderProps {
    logout: () => void;
}

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
            .background,
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    linkActive: {
        'display': 'flex',
        'alignItems': 'center',
        'height': '100%',
        'paddingLeft': theme.spacing.md,
        'paddingRight': theme.spacing.md,
        'textDecoration': 'none',
        'fontWeight': 500,
        'fontSize': theme.fontSizes.sm,
        'backgroundColor': theme.colors.orange[6],
        'color': theme.colors.orange[6],

        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                .background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

export const menu = [
    { id: 1, title: 'Новости', link: 'news' },
    // { id: 9, title: 'Видео новости', link: 'video_news' },
    { id: 3, title: 'Категории', link: 'categories' },
    { id: 4, title: 'Матч центр', link: 'match_center' },
    { id: 6, title: 'Модераторы', link: 'moderators' },
    { id: 2, title: 'Слайдер', link: 'slider' },
    { id: 5, title: 'Клубы', link: 'clubs' },
    { id: 8, title: 'Чемпионаты', link: 'championship' },
    { id: 7, title: 'Факты', link: 'facts' },
];

export const Header = ({ logout }: IHeaderProps) => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const router = useRouter();
    const slug = (router.query.slug as string[]) || [];

    const onMenuClick = (link: string) => {
        router.push(`/dashboard/${link}`);
        closeDrawer();
    };

    const headerMenu = menu.map((menu) => {
        return (
            <span
                key={menu.id}
                onClick={() => onMenuClick(menu.link)}
                className={slug[0] === menu.link ? classes.linkActive : classes.link}
            >
                {menu.title}
            </span>
        );
    });

    return (
        <>
            <MantineHeader height={60} px='md' className={classes.header}>
                <Group position='apart' sx={{ height: '100%' }} ml='auto'>
                    <div className='w-[200px] relative h-[40px] m-auto'>
                        <Image
                            src='/assets/img/logo.png'
                            alt='logo'
                            layout='fill'
                            objectFit='contain'
                            priority
                        />
                    </div>
                    <Burger
                        color='#fff'
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        className={`${classes.hiddenDesktop} absolute right-[15px] top-[15px]`}
                    />
                </Group>
            </MantineHeader>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size='100%'
                padding='md'
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx='-md'>
                    <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    {headerMenu}

                    <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
                    <Group position='center' grow pb='xl' px='md' my='xl'>
                        <Button variant='default' onClick={logout}>
                            Log out
                        </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </>
    );
};
