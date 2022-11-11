import { Badge, Card, Group, Image, Text } from '@mantine/core';
import React from 'react';
import { IMatchCenter } from 'src/interfaces/IMatchCenter';
import dayjs from 'dayjs';

export const MatchCard = (props: IMatchCenter) => {
    let date = dayjs(props.date).locale('ru').format('YYYY-MMMM-DD HH:mm');

    return (
        <Card shadow='sm' p='lg' radius='md' withBorder>
            {/* <Card.Section component='a' href='https://mantine.dev/'>
                <Image src='/assets/img/match.jpeg' height={160} alt='Norway' />
            </Card.Section> */}
            <Text>Хозяева:{props.host}</Text>

            <Text>Гости:{props.guest}</Text>

            <Text size='sm' color='blue' my='sm'>
                {date}
            </Text>
        </Card>
    );
};
