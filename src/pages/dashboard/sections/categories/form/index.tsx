import { Button, CheckIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import FormikControl from 'components/common/formik/FormikControl';
import { AddIcon, CloseIcon, DeleteIcon } from 'components/common/icons';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { Fragment, useContext } from 'react';
import { baseURL } from 'utils/constants';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateCategoriesForm = () => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const initialValues = {
        name: '',
        menu: {
            name: '',
            subMenu: [
                {
                    name: '',
                },
            ],
        },
    };

    const onSubmit = async (values: any) => {
        await axiosInstance
            .post(`/categories`, values, {
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
                            <FormikControl name='name' control='input' label='Category (1 level)' />
                            <FormikControl
                                name='menu.name'
                                control='input'
                                label='Subcategory (2 level)'
                            />
                            {/* <FieldArray
                                name='menu'
                                render={({ insert, remove, push }) => (
                                    <div className='flex flex-col justify-end'>
                                        {values.menu.length > 0 &&
                                            values.menu.map((item, index) => {
                                                console.log(item);

                                                return (
                                                    <Fragment key={index}>
                                                        <div className='mb-4 flex gap-5'>
                                                            <FormikControl
                                                                type='text'
                                                                control='input'
                                                                className='flex-1'
                                                                label='Subcategory (2 level)'
                                                                name={`menu[${index}].name`}
                                                            />
                                                            <Button
                                                                size='xs'
                                                                type='button'
                                                                variant='outline'
                                                                className='self-end h-[42px]'
                                                                onClick={() => remove(index)}
                                                            >
                                                                <DeleteIcon />
                                                            </Button>
                                                        </div>
                                                    </Fragment>
                                                );
                                            })}
                                        <Button
                                            type='button'
                                            variant='outline'
                                            className='h-[42px]'
                                            onClick={() =>
                                                push({
                                                    name: '',
                                                })
                                            }
                                        >
                                            Добавить
                                            <AddIcon className='ml-2' />
                                        </Button>
                                    </div>
                                )}
                            /> */}
                            <FieldArray
                                name='menu.subMenu'
                                render={({ insert, remove, push }) => (
                                    <div className='flex flex-col justify-end'>
                                        {values.menu.subMenu.length > 0 &&
                                            values.menu.subMenu.map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <div className='mb-4 flex gap-5'>
                                                            <FormikControl
                                                                type='text'
                                                                control='input'
                                                                className='flex-1'
                                                                label='Child category (3 level)'
                                                                name={`menu.subMenu[${index}].name`}
                                                            />
                                                            <Button
                                                                size='xs'
                                                                type='button'
                                                                variant='outline'
                                                                className='self-end h-[42px]'
                                                                onClick={() => remove(index)}
                                                            >
                                                                <DeleteIcon />
                                                            </Button>
                                                        </div>
                                                    </Fragment>
                                                );
                                            })}
                                        <Button
                                            type='button'
                                            variant='outline'
                                            className='h-[42px]'
                                            onClick={() =>
                                                push({
                                                    name: '',
                                                })
                                            }
                                        >
                                            Добавить
                                            <AddIcon className='ml-2' />
                                        </Button>
                                    </div>
                                )}
                            />
                        </div>
                        <div className='row'></div>

                        <Button variant='outline' type='submit' my='lg'>
                            Qabul qilish
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
