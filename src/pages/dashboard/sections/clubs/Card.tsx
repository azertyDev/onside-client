import { Card, Image, Text, Badge, Group, ActionIcon } from '@mantine/core';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import { IClub } from 'src/interfaces/IClub';
import { DeleteModal } from '../slider/Card';

export const ClubCard = (props: IClub) => {
    return (
        <Card shadow='xs' p='sm' radius='md' withBorder>
            <Card.Section>
                <Image src={`${props.image.url}`} height={250} alt={props.name} />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
                <Text weight={500}>{props.name}</Text>
            </Group>
            <Group position='right'>
                <Group spacing={8}>
                    <ActionIcon>
                        <EditIcon className='w-5 h-5' />
                    </ActionIcon>
                    <DeleteModal url={`/clubs/${props.id}`} />
                </Group>
            </Group>
        </Card>
    );
};
