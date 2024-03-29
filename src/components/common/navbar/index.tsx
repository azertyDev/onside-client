import { Button, createStyles, Navbar as MantineNavbar } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ISuperUser } from 'src/interfaces/IUser';
import { NextLink } from '../next_link';

interface INavbarProps {
    userInfo: ISuperUser | null;
    logout: () => void;
    menu: {
        id: number;
        title: string;
        link: string;
    }[];
}

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            'display': 'flex',
            'alignItems': 'center',
            'textDecoration': 'none',
            'fontSize': theme.fontSizes.sm,
            'color': theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            'padding': `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            'borderRadius': theme.radius.sm,
            'fontWeight': 500,

            '&:hover': {
                backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            ...theme.fn.focusStyles(),
            'display': 'flex',
            'alignItems': 'center',
            'textDecoration': 'none',
            'fontSize': theme.fontSizes.sm,
            'color': theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            'padding': `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            'borderRadius': theme.radius.sm,
            'fontWeight': 500,

            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                    .background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                },
            },
        },
    };
});

const Navbar = ({ menu, logout, userInfo }: INavbarProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const slug = (router.query.slug as string[]) || [];
    const [opened, setOpened] = useState(false);

    const Menu = menu.map((item) => {
        return (
            <NextLink
                key={item.id}
                href={`/dashboard/${item.link}`}
                className={slug[0] === item.link ? classes.linkActive : classes.link}
            >
                {item.title}
            </NextLink>
        );
    });

    return (
        <MantineNavbar width={{ sm: 200, md: 300 }} p='md' hiddenBreakpoint='sm' hidden={!opened}>
            <MantineNavbar.Section grow>
                {userInfo?.user.role === 'MODERATOR' ? (
                    <>
                        <NextLink
                            href={`/dashboard/news`}
                            className={slug[0] === 'news' ? classes.linkActive : classes.link}
                        >
                            Yangiliklar
                        </NextLink>
                        <NextLink
                            href={`/dashboard/video_news`}
                            className={slug[0] === 'video_news' ? classes.linkActive : classes.link}
                        >
                            Video yangiliklar
                        </NextLink>
                    </>
                ) : (
                    Menu
                )}
            </MantineNavbar.Section>
            <MantineNavbar.Section className={classes.footer}>
                <Button
                    onClick={logout}
                    variant='outline'
                    size='md'
                    fullWidth
                    uppercase
                    className=''
                >
                    Chiqish
                </Button>
            </MantineNavbar.Section>
        </MantineNavbar>
    );
};

export default Navbar;
