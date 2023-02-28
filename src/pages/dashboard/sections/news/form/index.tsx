import { Store } from 'utils/Store';
import { Form, Formik } from 'formik';
import { baseURL } from 'utils/constants';
import { IUser } from 'src/interfaces/IUser';
import { INews } from 'src/interfaces/INews';
import { axiosInstance } from 'utils/instance';
import Rich_text from 'components/common/rich_text';
import React, { useContext, useEffect, useState } from 'react';
import ISubCategory from 'src/interfaces/ISubCategory';
import ISubCategoryType from 'src/interfaces/ISubCategoryType';
import { Button, NumberInput, Select } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FileUploader } from 'components/common/fileUploader';
import { CheckIcon, CloseIcon } from 'components/common/icons';
import FormikControl from 'components/common/formik/FormikControl';
import { StarIcon } from 'components/common/icons/star_icon/StarIcon';

interface IOptions {
    label: string;
    value: any;
    group?: string;
    menu?: any;
    subMenu?: any;
}

const CreateNewsForm = ({ currentNews }: { currentNews: INews }) => {
    const { params } = useContext(Store);
    const { userInfo } = params;

    const categoriesArray: IOptions[] = [];
    const subCategoriesArray: IOptions[] = [];
    const subCategoriesTypeArray: IOptions[] = [];
    const newsTypes = [
        { label: 'COMMON', value: 'COMMON' },
        { label: 'INTERVIEW', value: 'INTERVIEW' },
        { label: 'BLOG', value: 'BLOG' },
        { label: 'SPORT', value: 'SPORT' },
        { label: 'PHOTO', value: 'PHOTO' },
        { label: 'VIDEO', value: 'VIDEO' },
    ];

    const [moderators, setModerators] = useState<IUser[]>([]);
    const [categories, setCategories] = useState<IOptions[]>(categoriesArray);
    const [subCategories, setSubCategories] = useState<IOptions[]>(subCategoriesArray);
    const [subCategoriesType, setSubCategoriesType] = useState<IOptions[]>(subCategoriesTypeArray);
    const [iframeType, setIframeType] = useState<object>({
        type: '',
    });

    const authorsData = moderators.map((moderator: IUser) => {
        return {
            label: `${moderator.name} ${moderator.surname}`,
            value: `${moderator.id}`,
        };
    });

    const fetchModerators = async () => {
        await axiosInstance
            .get('/moderators', {
                headers: {
                    authorization: `Bearer ${userInfo!.token}`,
                },
            })
            .then(({ data }) => {
                setModerators(data);
            })
            .catch(({ response }) => {
                console.log('Moderators fetch error: ', response);
            });
    };

    const fetchCategories = async () => {
        await axiosInstance
            .get('/categories')
            .then(({ data }) => {
                data?.map((i: any) => {
                    categoriesArray.push({
                        value: i.id,
                        label: i.name,
                        menu: i.menu,
                        subMenu: i.subMenu,
                    });
                });
                setCategories([...categoriesArray]);
            })
            .catch((error) => {
                console.log('Categories fetch error: ', error);
            });
    };

    const iframeTypes = [
        { label: 'Telegram', value: '?embed=1' },
        { label: 'Instagram', value: '/embed' },
    ];

    const initialValues = {
        categoryId: currentNews?.category?.id ?? '',
        subCategoryId: currentNews?.subCategory?.id ?? '',
        subCategoryTypeId: currentNews?.subCategoryType?.id ?? '',
        text: currentNews?.text ?? '',
        authorId: currentNews?.authorId ?? '',
        nameLink: currentNews?.nameLink ?? '',
        link: currentNews?.link ?? '',
        type: currentNews?.type ?? '',
        amountRating: currentNews?.amountRating ?? 0,
        amountViews: currentNews?.views ?? 0,
        rating: currentNews?.rating ?? 0.0,
        editorText: currentNews?.editorText ?? '',
        publishedAt: currentNews?.publishedAt ?? '',
        iframe: {
            url: currentNews?.iframe ? currentNews?.iframe.url : '',
        },
        image: {
            url: currentNews?.image ? currentNews?.image.url : '',
        },
        video: {
            url: currentNews?.video ? currentNews?.video.url : '',
        },
    };

    const handleCategories = (id: any, setFieldValue: any) => {
        setFieldValue('categoryId', id);

        categories?.filter((item) => {
            item.menu?.map((i: ISubCategory) => {
                if (id === i.parentId) {
                    subCategoriesArray.push({
                        value: i.id,
                        label: i.name,
                    });
                    setSubCategories([...subCategoriesArray]);
                }
            });

            item.subMenu?.map((j: ISubCategoryType) => {
                if (id === j.parentId) {
                    subCategoriesTypeArray.push({
                        value: j.id,
                        label: j.name,
                    });
                    setSubCategoriesType([...subCategoriesTypeArray]);
                }
            });
        });
    };

    const onSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
        const {
            publishedAt,
            subCategoryId,
            subCategoryTypeId,
            amountRating,
            image,
            rating,
            iframe,
            video,
            amountViews,
            ...rest
        } = values;

        const data = {
            publishedAt: publishedAt.replace('T', ' '),
            subCategoryTypeId: subCategoryTypeId === '' ? null : subCategoryTypeId,
            subCategoryId: subCategoryTypeId === '' ? null : subCategoryId,
            amountRating: amountRating === '' ? null : amountRating,
            iframe: iframe.url === '' ? null : iframe,
            rating: rating === '' ? null : rating,
            video: video.url === '' ? null : video,
            image: image.url === '' ? null : image,
            amountViews: amountViews === 0 ? 1 : amountViews,
            ...rest,
        };

        await axiosInstance({
            data: data,
            url: `${baseURL}/news${currentNews ? `/${currentNews.id}` : ''}`,
            method: currentNews ? 'PATCH' : 'POST',
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
                    resetForm();
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

    useEffect(() => {
        fetchCategories();
        fetchModerators();
    }, []);

    const showViewsInput = (values: any, setFieldValue: any) => {
        return Boolean(userInfo?.user.isAdmin) ? (
            <NumberInput
                min={0}
                size='md'
                defaultValue={1}
                name='amountViews'
                label='Ko`rishlar soni'
                value={values.amountViews}
                onChange={(val) => setFieldValue('amountViews', val)}
            />
        ) : null;
    };

    const handleIframe = (
        e: string,
        value: string,
        setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void
    ) => {
        setIframeType({ ...iframeType, type: e });
        console.log(iframeType);

        // setFieldValue!('iframe.url', (...value, value.concat('', e)));
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
            {({ values, setFieldValue, ...rest }) => {
                // console.log(values.iframe);

                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <FormikControl
                            name='text'
                            control='input'
                            label='Sarlavha'
                            placeholder='Matnni kiriting'
                        />

                        <div>
                            <label htmlFor='editorText' className='mb-4'>
                                Matn tahriri
                            </label>
                            <Rich_text
                                value={values.editorText}
                                placeholder='Izoh'
                                className='editorText mt-1'
                                onChange={(value) => setFieldValue('editorText', value)}
                            />
                        </div>
                        <div className='row'>
                            <Select
                                size='md'
                                searchable
                                name='authorId'
                                label='Muallif'
                                data={authorsData}
                                onChange={(e) => setFieldValue('authorId', Number(e))}
                                value={String(values.authorId)}
                                placeholder='Tanlang'
                            />
                            <Select
                                size='md'
                                name='type'
                                label='Yangilik turi'
                                data={newsTypes}
                                value={values.type}
                                placeholder='Tanlang'
                                onChange={(e) => setFieldValue('type', e)}
                            />
                            <FormikControl
                                name='publishedAt'
                                control='dateTime'
                                value={values.publishedAt.substring(0, 19)}
                                label='Chop etish vaqti'
                            />
                        </div>

                        <div className='row'>
                            <Select
                                size='md'
                                clearable
                                searchable
                                name='categoryId'
                                data={categories}
                                placeholder='Tanlang'
                                label='Sport turi kategoriyasi'
                                value={values.categoryId as unknown as string}
                                onChange={(e) => handleCategories(e, setFieldValue)}
                            />
                            <Select
                                size='md'
                                clearable
                                searchable
                                label='Subcategory'
                                name='subCategoryId'
                                data={subCategories}
                                placeholder='Tanlang'
                                value={values.subCategoryId as unknown as string}
                                onChange={(e) => setFieldValue('subCategoryId', e)}
                            />
                            <Select
                                size='md'
                                clearable
                                searchable
                                placeholder='Tanlang'
                                name='subCategoryTypeId'
                                label='Subcategory type'
                                data={subCategoriesType}
                                value={values.subCategoryTypeId as string}
                                onChange={(e) => setFieldValue('subCategoryTypeId', e)}
                            />
                        </div>
                        <div className='row'>
                            <FormikControl
                                name='nameLink'
                                control='input'
                                label='Manba nomi'
                                placeholder='Tanlang'
                            />
                            <FormikControl
                                name='link'
                                control='input'
                                label='Manba havolasi'
                                placeholder='www.example.com'
                            />
                            <NumberInput
                                size='md'
                                decimalSeparator=','
                                label='Reyting'
                                defaultValue={0.0}
                                name='rating'
                                precision={2}
                                step={0.5}
                                max={5}
                                value={values.rating}
                                onChange={(val) => setFieldValue('rating', val)}
                                icon={<StarIcon className='w-6 h-6' />}
                                min={0}
                            />
                        </div>

                        <div className='row'>
                            <NumberInput
                                min={0}
                                size='md'
                                defaultValue={0}
                                name='amountRating'
                                label='Baholaganlar soni'
                                value={values.amountRating}
                                onChange={(val) => setFieldValue('amountRating', val)}
                            />
                            {showViewsInput(values, setFieldValue)}
                            <div className='gap-4'>
                                <FormikControl
                                    control='input'
                                    name='iframe.url'
                                    label='Ilova (iframe)'
                                    placeholder='www.example.com'
                                />
                                {/* <Select
                                    size='md'
                                    clearable
                                    label='Turi'
                                    name='iframeType'
                                    placeholder='Tanlang'
                                    data={iframeTypes}
                                    value={iframeType}
                                    // onChange={(e) => setIframeType(e!)}
                                    onChange={(e) =>
                                        handleIframe(e!, values.iframe.url, setFieldValue)
                                    }
                                /> */}
                            </div>
                        </div>

                        <div className='grid grid-cols-2 md:grid-cols-1'>
                            <FileUploader
                                type='IMAGE'
                                name='image.url'
                                preview={values.image.url}
                                setFieldValue={setFieldValue}
                            />
                            <FileUploader
                                type='VIDEO'
                                name='video.url'
                                preview={values.video.url}
                                setFieldValue={setFieldValue}
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

export default CreateNewsForm;
