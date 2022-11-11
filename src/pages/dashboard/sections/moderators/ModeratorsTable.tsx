import {
    createStyles,
    Table,
    ScrollArea,
    useMantineTheme,
    Group,
    Avatar,
    Text,
    Badge,
    ActionIcon,
} from '@mantine/core';
import { DeleteIcon } from 'components/common/icons';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import { useState } from 'react';
import { IUser } from 'src/interfaces/IUser';

const useStyles = createStyles((theme) => ({
    header: {
        'position': 'sticky',
        'top': 0,
        'backgroundColor': theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        'transition': 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
            }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

const jobColors: Record<string, string> = {
    admin: 'red',
    moderator: 'blue',
};

export const ModeratorsTable = ({ data }: { data: IUser[] }) => {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const theme = useMantineTheme();
    const rows = data.map((item) => (
        <tr key={item.id}>
            <td>
                <Group spacing='sm'>
                    <Avatar size={30} radius={30} />
                    <Text size='sm' weight={500}>
                        {item.name}
                    </Text>
                </Group>
            </td>

            <td>
                <Group spacing='sm'>
                    <Text size='sm' weight={500}>
                        {item.surname}
                    </Text>
                </Group>
            </td>

            <td>{item.email}</td>
            <td>
                <Text size='sm' color='dimmed'>
                    {item.phone}
                </Text>
            </td>
            <td>
                <Badge
                    color={jobColors[item.role.toLowerCase()]}
                    variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
                >
                    {item.role}
                </Badge>
            </td>
            <td>
                <Group spacing='sm' position='right'>
                    <ActionIcon>
                        <EditIcon />
                    </ActionIcon>
                    <ActionIcon color='red'>
                        <DeleteIcon className='fill-black' />
                    </ActionIcon>
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea sx={{ height: 500 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table sx={{ minWidth: 700 }}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Почта</th>
                        <th>Телефон</th>
                        <th>Роль</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
};
