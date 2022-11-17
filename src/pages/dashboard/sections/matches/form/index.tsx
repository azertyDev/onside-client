import { Button, CheckIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import FormikControl from 'components/common/formik/FormikControl';
import { CloseIcon } from 'components/common/icons';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateMatchForm = () => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const initialValues = {
        host: '',
        guest: '',
        publishedAt: '',
        date: '',
    };

    const onSubmit = async (values: any, { resetForm }: any) => {
        const { publishedAt, date, ...rest } = values;

        const body = {
            ...rest,
            publishedAt: publishedAt.replace('T', ' '),
            date: date.replace('T', ' '),
        };

        await axiosInstance
            .post(`/matches`, body, {
                headers: {
                    authorization: `Bearer ${userInfo!.token}`,
                },
            })
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
                        message: response.data.message,
                        color: 'red',
                        icon: <CloseIcon />,
                    });
                }
            });
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <div className='row'>
                            <FormikControl name='host' control='input' label='host' />
                            <FormikControl name='guest' control='input' label='guest' />
                        </div>
                        <div className='row'>
                            <FormikControl
                                name='publishedAt'
                                control='dateTime'
                                label='publishedAt'
                            />

                            <FormikControl name='date' control='dateTime' label='date' />
                        </div>
                        <Button variant='outline' type='submit' my='lg' size='md' className='w-fit'>
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
