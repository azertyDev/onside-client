import { Card, Image, Text, Badge, Group } from '@mantine/core';
import { IClub } from 'src/interfaces/IClub';
import { baseURL } from 'utils/constants';

export const ClubCard = (props: IClub) => {
    return (
        <Card shadow='xs' p='sm' radius='md' withBorder>
            <Card.Section>
                <Image src={`${baseURL}/${props.image.url}`} height={250} alt={props.name} />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
                <Text weight={500}>{props.name}</Text>
            </Group>
        </Card>
    );
};
