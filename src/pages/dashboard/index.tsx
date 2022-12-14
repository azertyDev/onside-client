import { createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { Categories } from './sections/categories';
import { Championships } from './sections/championship';
import { Channels } from './sections/channels';
import { Clubs } from './sections/clubs';
import { Facts } from './sections/facts';
import { Matches } from './sections/matches';
import { Moderators } from './sections/moderators';
import { News } from './sections/news';
import { Slider } from './sections/slider';
import { VideoNews } from './sections/video_news';

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
            case 'championship':
                return <Championships />;
            case 'moderators':
                return <Moderators />;
            case 'slider':
                return <Slider />;
            case 'facts':
                return <Facts />;
            case 'video_news':
                return <VideoNews />;
            case 'channels':
                return <Channels />;
        }
    };

    return <div className={classes.wrapper}>{getTermPage()}</div>;
};
