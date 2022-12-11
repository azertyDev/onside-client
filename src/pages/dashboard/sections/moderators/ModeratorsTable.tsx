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
    CheckIcon,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { CloseIcon } from 'components/common/icons';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import { LockIcon } from 'components/common/icons/lock_icon/LockIcon';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { IUser } from 'src/interfaces/IUser';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';
import { DeleteModal } from '../slider/Card';

const useStyles = createStyles((theme) => ({
    header: {
        'zIndex': 99999,
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

export const ModeratorsTable = ({
    data,
    handleEdit,
}: {
    data: IUser[];
    handleEdit: (item: IUser) => void;
}) => {
    const { reload } = useRouter();
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const { params } = useContext(Store);
    const { userInfo } = params;

    const handleLock = async (id: number) => {
        await axiosInstance
            .patch(
                `/moderators/active/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${userInfo?.token}` },
                }
            )
            .then((data) => {
                if (data) {
                    showNotification({
                        title: '',
                        message: data.data.message,
                        color: 'teal',
                        icon: <CheckIcon />,
                    });
                }

                if (data.status === 200) {
                    reload();
                }
            })
            .catch(({ response }) => {
                if (response) {
                    showNotification({
                        title: '',
                        message: response.data,
                        color: 'red',
                        icon: <CloseIcon />,
                    });
                }
            });
    };

    const theme = useMantineTheme();
    const rows = data.map((item) => (
        <tr key={item.id}>
            <td>
                <Group spacing='sm'>
                    <Avatar size={30} radius={30} color={`${item.isActive ? 'blue' : 'red'}`} />
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
                    <ActionIcon onClick={() => handleEdit(item)}>
                        <EditIcon />
                    </ActionIcon>
                    <ActionIcon
                        onClick={() => handleLock(item.id!)}
                        color={`${item.isActive ? 'red' : 'blue'}`}
                    >
                        <LockIcon />
                    </ActionIcon>
                    <DeleteModal url={`moderators/${item.id!}`} />
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea sx={{ height: 500 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table sx={{ minWidth: 700 }}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>Ism</th>
                        <th>Familiya</th>
                        <th>Pochtasi</th>
                        <th>Telefoni</th>
                        <th>Rol</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
};
