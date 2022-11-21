import { Button, Select } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FileUploader } from 'components/common/fileUploader';
import FormikControl from 'components/common/formik/FormikControl';
import { CheckIcon, CloseIcon } from 'components/common/icons';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { IFact } from 'src/interfaces/IFact';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const UpdateFactForm = ({ currentFact }: { currentFact: IFact }) => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const initialValues = {
        title: currentFact?.title ?? '',
        type: currentFact?.type ?? '',
        link: currentFact?.link ?? '',
        url: currentFact?.url ?? '',
    };

    const typeData = [
        { label: 'Video', value: 'video' },
        { label: 'Image', value: 'image' },
    ];

    const onSubmit = async (values: any, { resetForm }: any) => {
        await axiosInstance({
            url: `/facts/${currentFact.id}`,
            data: values,
            method: 'PATCH',
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
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <div className='grid grid-cols-2 gap-10 md:grid-cols-1'>
                            <div className='flex flex-col gap-8 md:gap-4'>
                                <FormikControl name='title' control='input' label='Title' />
                                <Select
                                    size='md'
                                    name='type'
                                    label='Type'
                                    data={typeData}
                                    onChange={(e) => setFieldValue(`type`, e)}
                                    value={values.type}
                                    placeholder='video or image'
                                />
                                <FormikControl label='Link' control='input' name='link' />
                            </div>
                            <div className='flex justify-center gap-10 flex-col'>
                                <FileUploader
                                    currentPreview={values?.url}
                                    setFieldValue={setFieldValue}
                                    name='url'
                                />
                            </div>
                        </div>

                        <Button
                            variant='outline'
                            type='submit'
                            my='lg'
                            size='md'
                            disabled={!!currentFact}
                        >
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
