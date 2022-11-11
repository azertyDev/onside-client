import { createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { Categories } from './sections/categories';
import { Clubs } from './sections/clubs';
import { Matches } from './sections/matches';
import { Moderators } from './sections/moderators';
import { News } from './sections/news';

const useStyles = createStyles((theme) => {
    return {
        wrapper: {
            display: 'flex',
        },
    };
});

export const Dashboard = () => {
    const { classes } = useStyles();
    const { query, ...router } = useRouter();

    const [slug] = query?.slug as string[];

    const getTermPage = () => {
        switch (slug) {
            case 'news':
                return <News />;
            case 'categories':
                return <Categories />;
            case 'match_center':
                return <Matches />;
            case 'clubs':
                return <Clubs />;
            case 'moderators':
                return <Moderators />;
        }
    };

    return <div className={classes.wrapper}>{getTermPage()}</div>;
};
