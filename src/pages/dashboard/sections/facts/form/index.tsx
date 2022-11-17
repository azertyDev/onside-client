import { Button, CheckIcon, Select } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Dropzone } from 'components/common/dropzone';
import InputFile from 'components/common/fileUpload/inputFile';
import FormikControl from 'components/common/formik/FormikControl';
import { CloseIcon } from 'components/common/icons';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateFactsForm = () => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const [image, setImage] = useState<File[]>([]);
    const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);

    const initialValues = {
        type: '',
        link: '',
        file: '',
    };

    const typeData = [
        { label: 'Выберите', value: '' },
        { label: 'Video', value: 'video' },
        { label: 'Image', value: 'image' },
    ];

    const onSubmit = async (values: any) => {
        const { file, ...rest } = values;
        console.log(values);

        const body = {
            file: image[0],
            ...rest,
        };

        await axiosInstance
            .post(`/facts`, body, {
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
                            <Select
                                size='md'
                                name='type'
                                label='Type'
                                data={typeData}
                                onChange={(e) => setFieldValue('type', e)}
                                value={values.type}
                                placeholder='video or image'
                            />
                            <FormikControl name='link' control='input' label='Link' />
                        </div>

                        <InputFile
                            name='file'
                            image={image}
                            setImage={setImage}
                            createObjectURL={createObjectURL}
                            setCreateObjectURL={setCreateObjectURL}
                            setFieldValue={setFieldValue}
                        />

                        {/* <Dropzone setFieldValue={setFieldValue} /> */}

                        <Button variant='outline' type='submit' my='lg' size='md'>
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
