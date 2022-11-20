import { Card, Image, Text, Badge, Group, ActionIcon } from '@mantine/core';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import { IFact } from 'src/interfaces/IFact';
import { DeleteModal } from '../slider/Card';

export const FactCard = (props: IFact) => {
    return (
        <Card shadow='xs' p='sm' radius='md' withBorder>
            <Card.Section>
                <Image src={`${props.url}`} height={250} alt={props.type} />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
                <Text weight={500} component='a' target='_blank' href={props.link}>
                    {props.title}
                </Text>
            </Group>
            <Group position='right'>
                <Group spacing={8}>
                    <ActionIcon>
                        <EditIcon className='w-5 h-5' />
                    </ActionIcon>
                    <DeleteModal url={`/facts/${props.id}`} />
                </Group>
            </Group>
        </Card>
    );
};
