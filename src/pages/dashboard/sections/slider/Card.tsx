import { Card, Image, Text, ActionIcon, Group, createStyles } from '@mantine/core';
import { CheckIcon, CloseIcon, DeleteIcon } from 'components/common/icons';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import { useContext } from 'react';
import { IImage } from 'src/interfaces/IImage';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
    card: {
        position: 'relative',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    rating: {
        position: 'absolute',
        top: theme.spacing.xs,
        right: theme.spacing.xs + 2,
        pointerEvents: 'none',
    },

    title: {
        minHeight: 50,
        display: 'block',
        marginTop: theme.spacing.md,
        // marginBottom: theme.spacing.xs / 2,
    },

    action: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        }),
    },

    footer: {
        marginTop: theme.spacing.md,
    },
}));

interface CardProps {
    id: any;
    text: string;
    link: string;
    image: IImage;
    handleEdit: () => void;
}

export const DeleteModal = ({ url, reloadPage = true }: { url: string; reloadPage?: boolean }) => {
    const { reload } = useRouter();
    const { classes, cx } = useStyles();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const handleDelete = async () => {
        await axiosInstance
            .delete(url, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            })
            .then((data) => {
                if (data) {
                    showNotification({
                        title: '',
                        message: data.data.message,
                        color: 'teal',
                        icon: <CheckIcon />,
                        autoClose: 5000,
                    });
                }
                if (data.status === 200) {
                    reloadPage && reload();
                }
            })
            .catch(({ response }) => {
                if (response) {
                    showNotification({
                        title: '',
                        message: response.data.message,
                        color: 'red',
                        icon: <CloseIcon />,
                    });
                }
            });
    };

    const openModal = () => {
        openConfirmModal({
            title: 'Удалить?',
            labels: { confirm: 'Да', cancel: 'Нет' },
            onConfirm: () => handleDelete(),
            confirmProps: {
                variant: 'outline',
                color: 'red',
            },
        });
    };

    return (
        <ActionIcon className={classes.action} onClick={openModal} color='red'>
            <DeleteIcon className='w-6 h-6' />
        </ActionIcon>
    );
};

export const SliderCard = ({ id, text, image, link, handleEdit }: CardProps) => {
    const { classes, cx } = useStyles();
    const linkProps = { href: link, target: '_blank', rel: 'noopener noreferrer' };
    const { params } = useContext(Store);
    const { userInfo } = params;

    return (
        <Card withBorder radius='md' className={cx(classes.card)}>
            <Card.Section>
                <Image src={image.url} height={250} alt={text} />
            </Card.Section>

            <Text
                className={`${classes.title} line-clamp-2`}
                weight={500}
                component='a'
                {...linkProps}
            >
                {text}
            </Text>

            <Group position='right' className={classes.footer}>
                <Group spacing={8}>
                    <ActionIcon className={classes.action} onClick={handleEdit}>
                        <EditIcon className='w-5 h-5' />
                    </ActionIcon>
                    <DeleteModal url={`/sliders/${id}`} />
                </Group>
            </Group>
        </Card>
    );
};
