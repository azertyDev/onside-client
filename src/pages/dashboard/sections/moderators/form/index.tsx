import { Button, CheckIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import FormikControl from 'components/common/formik/FormikControl';
import { CloseIcon } from 'components/common/icons';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { baseURL } from 'utils/constants';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateModeratorsForm = () => {
    const { params } = useContext(Store);
    const { userInfo } = params;

    const initialValues = {
        name: '',
        surname: '',
        phone: '',
        email: '',
    };

    const onSubmit = async (values: any) => {
        await axiosInstance
            .post(`${baseURL}/moderators`, values, {
                headers: {
                    authorization: `Bearer ${userInfo!.token}`,
                },
            })
            .then(({ data }) => {
                if (data) {
                    showNotification({
                        title: '',
                        message: data.message,
                        color: 'teal',
                        icon: <CheckIcon />,
                    });
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
