import { Button, CheckIcon, Select } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Dropzone } from 'components/common/dropzone';
import FormikControl from 'components/common/formik/FormikControl';
import { AddIcon, CloseIcon, DeleteIcon } from 'components/common/icons';
import { FieldArray, Form, Formik, FormikConfig, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { Fragment, useContext, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateFactsForm = () => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const [image, setImage] = useState<File[]>([]);
    const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);

    const initialValues = {
        data: [{ title: '', type: '', link: '', url: '' }],
    };

    const typeData = [
        { label: 'Выберите', value: '' },
        { label: 'Video', value: 'video' },
        { label: 'Image', value: 'image' },
    ];

    const onSubmit = async (values: any, { resetForm }: any) => {
        console.log(values);

        await axiosInstance
            .post(`/facts`, values.data, {
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
                                <div>
                                    {values.data &&
                                        values.data.length > 0 &&
                                        values.data.map((item, index) => (
                                            <Fragment key={index}>
                                                <div className='row items-end' key={index}>
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
                                                    <Button
                                                        size='md'
                                                        type='button'
                                                        variant='outline'
                                                        className='self-end'
                                                        onClick={() => remove(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                </div>
                                                <div className='row mt-6'>
                                                    <FormikControl
                                                        label='Link'
                                                        control='input'
                                                        name={`data.${index}.link`}
                                                    />
                                                    <Dropzone
                                                        setFieldValue={setFieldValue}
                                                        name={`data.${index}.url`}
                                                    />
                                                    <Button
                                                        size='md'
                                                        type='button'
                                                        variant='outline'
                                                        className='self-end'
                                                        onClick={() => push('')}
                                                    >
                                                        Добавить
                                                        <AddIcon className='ml-2' />
                                                    </Button>
                                                </div>
                                            </Fragment>
                                        ))}
                                </div>
                            )}
                        />

                        {/* <InputFile
                            name='file'
                            image={image}
                            setImage={setImage}
                            createObjectURL={createObjectURL}
                            setCreateObjectURL={setCreateObjectURL}
                            setFieldValue={setFieldValue}
                        /> */}

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
