import { FC } from 'react';
import { IClub } from 'src/interfaces/IClub';
import { DeleteModal } from '../slider/Card';
import { Card, Image, Text, Group, ActionIcon } from '@mantine/core';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';

type ClubCard = {
    data: IClub;
    url: string;
    handleEdit: () => void;
};

export const ClubCard: FC<ClubCard> = (props) => {
    const { data, url } = props;
    return (
        <Card shadow='xs' p='sm' radius='md' withBorder>
            <Card.Section>
                <Image src={`${data.image.url}`} height={250} alt={data.name} fit='contain' />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
                <Text weight={500} component='a' target='_blank' href={data.link} className='line-clamp-2'>
                    {data.name}
                </Text>
            </Group>
            <Group position='right'>
                <Group spacing={8}>
                    <ActionIcon onClick={props.handleEdit}>
                        <EditIcon className='w-5 h-5' />
                    </ActionIcon>
                    <DeleteModal url={url} />
                </Group>
            </Group>
        </Card>
    );
};
