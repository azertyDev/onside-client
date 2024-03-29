import { Card, Text, Group, Center, createStyles, ActionIcon, Stack } from '@mantine/core';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import { EyeIcon } from 'components/common/icons/eye_icon/EyeIcon';
import { LikeIcon } from 'components/common/icons/like_icon/LikeIcon';
import { StarIcon } from 'components/common/icons/star_icon/StarIcon';
import { useContext } from 'react';
import { INews } from 'src/interfaces/INews';
import { Store } from 'utils/Store';
import { DeleteModal } from '../slider/Card';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const useStyles = createStyles((theme, _params, getRef) => {
    const image = getRef('image');

    return {
        card: {
            position: 'relative',
            height: 320,
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

            [`&:hover .${image}`]: {
                transform: 'scale(1.03)',
            },
        },

        image: {
            ref: image,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'cover',
            transition: 'transform 500ms ease',
        },

        overlay: {
            position: 'absolute',
            top: '20%',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
        },

        content: {
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 1,
        },

        title: {
            'color': theme.white,
            'marginBottom': 5,
            ':hover': {
                color: theme.colors.red[4],
            },
        },

        bodyText: {
            color: theme.colors.dark[2],
            marginLeft: 7,
        },

        author: {
            color: theme.colors.dark[2],
        },
    };
});

export function ImageCard({
    data,
    url,
    handleEditNews,
}: {
    data: INews;
    url: string;
    handleEditNews: (id: number) => void;
}) {
    const { params } = useContext(Store);
    const { userInfo } = params;
    const { classes } = useStyles();

    const date = dayjs(data.publishedAt).format('YYYY-MM-DD');
    const hour = dayjs(data.publishedAt).tz('Asia/Tashkent').format('HH:mm');

    return (
        <Card
            p='lg'
            shadow='lg'
            className={classes.card}
            radius='md'
            // component='a'
            // href={data.nameLink}
            // target='_blank'
        >
            <div
                className={classes.image}
                style={{
                    backgroundImage: `url(${
                        data.image ? `${data.image.url}` : '/assets/img/placeholder-img.svg'
                    })`,
                    backgroundPosition: 'center',
                }}
            />
            <div className={classes.overlay} />

            <div className={classes.content}>
                <div>
                    <Text
                        size='lg'
                        className={classes.title}
                        weight={500}
                        component='a'
                        target='_blank'
                        href={data.link}
                    >
                        {data.text}
                    </Text>

                    <Group position='apart' spacing={0}>
                        <Text size='xs' className={classes.author}>
                            {`${data.author.name} ${data.author.surname}`}
                        </Text>
                        <Stack spacing={0} align='end'>
                            <Text size='xs' className={classes.author}>
                                {date}
                            </Text>
                            <Text size='xs' className={classes.author}>
                                {hour}
                            </Text>
                        </Stack>

                        <div className='flex justify-between w-full'>
                            <Group>
                                <Center>
                                    <StarIcon className='stroke-white h-4 w-4' />
                                    <Text size='sm' className={classes.bodyText}>
                                        {data.rating}
                                    </Text>
                                </Center>
                                <Center>
                                    <LikeIcon className='stroke-white h-4 w-4' />
                                    <Text size='sm' className={classes.bodyText}>
                                        {data.likes}
                                    </Text>
                                </Center>
                                <Center>
                                    <EyeIcon className='stroke-white h-4 w-4' />
                                    <Text size='sm' className={classes.bodyText}>
                                        {data.views}
                                    </Text>
                                </Center>
                            </Group>
                            <Group>
                                <Group spacing={8}>
                                    <ActionIcon onClick={() => handleEditNews(data.id!)}>
                                        <EditIcon className='w-5 h-5' />
                                    </ActionIcon>
                                    {(data.authorId === userInfo?.user.id ||
                                        Boolean(userInfo?.user.isAdmin)) && (
                                        <DeleteModal url={url} />
                                    )}
                                </Group>
                            </Group>
                        </div>
                    </Group>
                </div>
            </div>
        </Card>
    );
}
