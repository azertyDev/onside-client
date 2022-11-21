import { Card, Image, Text, Group, ActionIcon } from '@mantine/core';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import { IFact } from 'src/interfaces/IFact';
import { DeleteModal } from '../slider/Card';

export const FactCard = ({ data, handleUpdate }: { data: IFact; handleUpdate: () => void }) => {
    return (
        <Card shadow='xs' p='sm' radius='md' withBorder>
            <Card.Section>
                <Image src={`${data.url}`} height={250} alt={data.type} />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
                <Text weight={500} component='a' target='_blank' href={data.link}>
                    {data.title}
                </Text>
            </Group>
            <Group position='right'>
                <Group spacing={8}>
                    <ActionIcon onClick={handleUpdate}>
                        <EditIcon className='w-5 h-5' />
                    </ActionIcon>
                    <DeleteModal url={`/facts/${data.id}`} />
                </Group>
            </Group>
        </Card>
    );
};
