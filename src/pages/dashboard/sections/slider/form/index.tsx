import { Button } from '@mantine/core';
import InputFile from 'components/common/fileUpload/inputFile';
import FormikControl from 'components/common/formik/FormikControl';
import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { Store } from 'utils/Store';
import { showNotification } from '@mantine/notifications';
import { baseURL } from 'utils/constants';
import { useRouter } from 'next/router';
import { Dropzone } from 'components/common/dropzone';

export const CreateSlidersForm = (props: any) => {
    const { reload } = useRouter();
    const { editCurrent } = props;

    const { params } = useContext(Store);
    const { userInfo } = params;

    const [image, setImage] = useState<File[]>([]);
    const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);

    const initialValues = {
        text: editCurrent?.text ?? '',
        link: editCurrent?.link ?? '',
        image: editCurrent?.image ?? '',
    };

    const onSubmit = async (values: any) => {
        console.log(values);

        const body = new FormData();

        body.append('text', values.text);
        body.append('link', values.link);
        body.append('image', editCurrent ? values.image.url : values.image[0]);

        await fetch(`${baseURL}/sliders${editCurrent ? `/${editCurrent.id}` : ''}`, {
            headers: {
                authorization: `Bearer ${userInfo!.token}`,
            },
            method: editCurrent ? 'PATCH' : 'POST',
            body,
        })
            .then((data: any) => {
                console.log(data);

                if (data) {
                    showNotification({
                        title: '',
                        message: data.statusText,
                    });
                }

                if (data.status === 200) {
                    reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <div className='row'>
                            <FormikControl name='text' control='input' label='text' />
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

                        {/* <Dropzone
                            id='image'
                            name='image'
                            images={values.image}
                            setFieldValue={setFieldValue}
                        /> */}

                        <Button variant='outline' type='submit' my='lg'>
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
