import { ActionIcon, Button, createStyles } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';
import FormikControl from '../formik/FormikControl';
import { CheckIcon, CloseIcon } from '../icons';
import { EditIcon } from '../icons/edit_icon/EditIcon';

const useStyles = createStyles((theme) => ({
    action: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        }),
    },
}));

export const UpdateModal = ({
    url,
    reloadPage = true,
    data,
}: {
    url: string;
    reloadPage?: boolean;
    data: any;
}) => {
    const { reload } = useRouter();
    const { classes, cx } = useStyles();
    const { params } = useContext(Store);
    const { userInfo } = params;

    // const [values, setValues] = useState({
    //     id: data.id,
    //     name: data.name,
    // });

    // const handleChange = (e: any) => {
    //     const {
    //         target: { value },
    //     } = e;

    //     console.log('state: ', values);
    //     console.log('value: ', value);

    //     setValues({ id: data.id, name: value });
    // };

    const initialValues = {
        id: data.id,
        name: data.name,
    };

    const onSubmit = async (values: any) => {
        await axiosInstance
            .put(url, values, {
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

    return (
        <>
            <ActionIcon
                color='blue'
                className={classes.action}
                onClick={() => {
                    openModal({
                        // withCloseButton: false,
                        children: (
                            <>
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={onSubmit}
                                    enableReinitialize
                                >
                                    {({ values, setFieldValue }) => {
                                        return (
                                            <Form className='grid gap-8 sm:gap-5'>
                                                <div className=''>
                                                    <FormikControl
                                                        name='name'
                                                        control='input'
                                                        label='Kategoriya'
                                                    />
                                                </div>

                                                <Button size='md' variant='outline' type='submit'>
                                                    Qabul qilish
                                                </Button>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </>
                        ),
                    });
                }}
            >
                <EditIcon className='w-6 h-6' />
            </ActionIcon>
        </>
    );
};
