import { Button, CheckIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import FormikControl from 'components/common/formik/FormikControl';
import { CloseIcon } from 'components/common/icons';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { IUser } from 'src/interfaces/IUser';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateModeratorsForm = ({ current }: { current: IUser | undefined }) => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const initialValues = {
        name: current?.name ?? '',
        surname: current?.surname ?? '',
        phone: current?.phone ?? '',
        email: current?.email ?? '',
    };

    const onSubmit = async (values: any) => {
        await axiosInstance({
            method: current ? 'PATCH' : 'POST',
            url: current ? `/moderators/info/${current.id}` : '/moderators',
            data: values,
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
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <div className='row'>
                            <FormikControl name='name' control='input' label='name' />
                            <FormikControl name='surname' control='input' label='surname' />
                        </div>
                        <div className='row'>
                            <FormikControl name='email' control='input' label='email' />
                            <FormikControl name='phone' control='input' label='phone' />
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
