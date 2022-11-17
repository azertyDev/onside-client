import { Button, CheckIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import InputFile from 'components/common/fileUpload/inputFile';
import FormikControl from 'components/common/formik/FormikControl';
import { CloseIcon } from 'components/common/icons';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { baseURL } from 'utils/constants';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateClubsForm = () => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const [image, setImage] = useState<File[]>([]);
    const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);

    const initialValues = {
        name: '',
        link: '',
        image: '',
    };

    const onSubmit = async (values: any) => {
        const { image, ...rest } = values;

        const body = {
            image: image[0],
            ...rest,
        };

        await axiosInstance
            .post(`/clubs`, body, {
                headers: {
                    'authorization': `Bearer ${userInfo!.token}`,
                    'Content-Type': 'multipart/form-data',
                },
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <div className='row'>
                            <FormikControl name='name' control='input' label='name' />
                            <FormikControl name='link' control='input' label='link' />
                        </div>

                        <InputFile
                            name='image'
                            image={image}
                            setImage={setImage}
                            createObjectURL={createObjectURL}
                            setCreateObjectURL={setCreateObjectURL}
                            setFieldValue={setFieldValue}
                        />

                        <Button variant='outline' type='submit' my='lg' size='md'>
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
