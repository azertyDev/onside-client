import { Card, Image, Text, Group, ActionIcon, Center } from '@mantine/core';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import { EyeIcon } from 'components/common/icons/eye_icon/EyeIcon';
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
                    <Center>
                        <EyeIcon className='stroke-white h-4 w-4' />
                        <Text size='sm'>
                            {data.amountViews}
                        </Text>
                    </Center>
                    <ActionIcon onClick={handleUpdate}>
                        <EditIcon className='w-5 h-5' />
                    </ActionIcon>
                    <DeleteModal url={`/facts/${data.id}`} />
                </Group>
            </Group>
        </Card>
    );
};
