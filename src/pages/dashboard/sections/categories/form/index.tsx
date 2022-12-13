import { Button, CheckIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import FormikControl from 'components/common/formik/FormikControl';
import { AddIcon, CloseIcon, DeleteIcon } from 'components/common/icons';
import { FieldArray, Form, Formik } from 'formik';
import { Fragment, useContext } from 'react';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateCategoriesForm = () => {
    const { params } = useContext(Store);
    const { userInfo } = params;

    const initialValues = {
        name: '',
        menu: [{ name: '' }],
        subMenu: [
            {
                name: '',
            },
        ],
    };

    const onSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
        const { menu, subMenu, ...rest } = values;

        const data = {
            menu: menu.map((item: any) => {
                if (item.name === '') {
                    console.log('empty string');
                }

                // item.name ?? null;
            }),
            subMenu: subMenu.name === '' ? null : subMenu.name,
            ...rest,
        };

        // console.log('data: ', data);

        await axiosInstance
            .post(`/categories`, data, {
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
                    resetForm();
                    // reload();
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
                            <FormikControl
                                name='name'
                                control='input'
                                label='Kategoriya'
                                className='leading-6'
                            />
                            <FieldArray
                                name='menu'
                                render={({ insert, remove, push }) => (
                                    <div className='flex flex-col'>
                                        <label className='leading-6'>Kategoriya 2 (menu)</label>
                                        {values.menu.length > 0 &&
                                            values.menu.map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <div className='mb-4 flex gap-5'>
                                                            <FormikControl
                                                                type='text'
                                                                control='input'
                                                                className='flex-1'
                                                                // label={
                                                                //     <span className='pl-1'>
                                                                //         {index + 1}
                                                                //     </span>
                                                                // }
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
                            />

                            <FieldArray
                                name='subMenu'
                                render={({ insert, remove, push }) => (
                                    <div className='flex flex-col'>
                                        <div className='leading-6'>Kategoriya 3 (subMenu)</div>
                                        {values.subMenu.length > 0 &&
                                            values.subMenu.map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <div className='mb-4 flex gap-5'>
                                                            <FormikControl
                                                                type='text'
                                                                control='input'
                                                                className='flex-1'
                                                                // label={
                                                                //     <span className='pl-1'>
                                                                //         {index + 1}
                                                                //     </span>
                                                                // }
                                                                name={`subMenu[${index}].name`}
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
