import { Button, Select } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FileUploader } from 'components/common/fileUploader';
import FormikControl from 'components/common/formik/FormikControl';
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon } from 'components/common/icons';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateFactsForm = () => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const initialValues = {
        data: [{ title: '', type: '', link: '', url: '' }],
    };

    const typeData = [
        { label: 'Video', value: 'video' },
        { label: 'Image', value: 'image' },
    ];

    const onSubmit = async (values: any, { resetForm }: any) => {
        await axiosInstance({
            url: `/facts`,
            data: values.data,
            method: 'POST',
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <FieldArray
                            name='data'
                            render={({ insert, remove, push }) => (
                                <>
                                    {values.data &&
                                        values.data.length > 0 &&
                                        values.data.map((item, index) => (
                                            <div
                                                key={index}
                                                className='grid grid-cols-2 gap-10 md:grid-cols-1'
                                            >
                                                <div
                                                    className='flex flex-col gap-8 md:gap-4'
                                                    key={index}
                                                >
                                                    <FormikControl
                                                        name={`data.${index}.title`}
                                                        control='input'
                                                        label='Title'
                                                    />
                                                    <Select
                                                        size='md'
                                                        label='Type'
                                                        data={typeData}
                                                        onChange={(e) =>
                                                            setFieldValue(`data.${index}.type`, e)
                                                        }
                                                        name={`data.${index}.type`}
                                                        value={item.type}
                                                        placeholder='video or image'
                                                    />
                                                    <FormikControl
                                                        label='Link'
                                                        control='input'
                                                        name={`data.${index}.link`}
                                                    />
                                                </div>
                                                <div className='flex justify-center gap-10 flex-col'>
                                                    <FileUploader
                                                        // currentPreview={}
                                                        // type={`data.${index}.type`}
                                                        setFieldValue={setFieldValue}
                                                        name={`data.${index}.url`}
                                                    />
                                                    <div className='flex gap-20 justify-center'>
                                                        <Button
                                                            size='md'
                                                            fullWidth
                                                            type='button'
                                                            variant='outline'
                                                            onClick={() => remove(index)}
                                                        >
                                                            <DeleteIcon />
                                                        </Button>
                                                        <Button
                                                            size='md'
                                                            fullWidth
                                                            type='button'
                                                            variant='outline'
                                                            onClick={() => push('')}
                                                        >
                                                            Добавить
                                                            <AddIcon className='ml-2' />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </>
                            )}
                        />

                        <Button variant='outline' type='submit' my='lg' size='md'>
                            Qabul qilish
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
