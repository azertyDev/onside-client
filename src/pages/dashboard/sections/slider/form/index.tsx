import { Button } from '@mantine/core';
import FormikControl from 'components/common/formik/FormikControl';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { Store } from 'utils/Store';
import { showNotification } from '@mantine/notifications';
import { baseURL } from 'utils/constants';
import { useRouter } from 'next/router';
import { FileUploader } from 'components/common/fileUploader';
import { axiosInstance } from 'utils/instance';
import { CheckIcon, CloseIcon } from 'components/common/icons';

export const CreateSlidersForm = (props: any) => {
    const { params } = useContext(Store);
    const { userInfo } = params;
    const { reload } = useRouter();
    const { currentSlide } = props;

    const initialValues = {
        text: currentSlide?.text ?? '',
        link: currentSlide?.link ?? '',
        url: currentSlide?.image.url ?? '',
    };

    const onSubmit = async (values: any) => {
        await axiosInstance({
            url: `${baseURL}/sliders${currentSlide ? `/${currentSlide.id}` : ''}`,
            data: values,
            method: currentSlide ? 'PATCH' : 'POST',
            headers: {
                authorization: `Bearer ${userInfo!.token}`,
                method: currentSlide ? 'PATCH' : 'POST',
            },
        })
            .then((data: any) => {
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
                        autoClose: 5000,
                    });
                }
            });
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <div className='grid grid-cols-2 sm:grid-cols-1 gap-8'>
                            <FormikControl name='text' control='input' label='text' />
                            <FormikControl name='link' control='input' label='link' />
                        </div>

                        <div className='grid place-items-start'>
                            <FileUploader
                                name='url'
                                setFieldValue={setFieldValue}
                                preview={values.url}
                            />
                        </div>

                        <Button variant='outline' type='submit' my='lg'>
                            Qabul qilish
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
