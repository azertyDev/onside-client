import { Form, Formik } from 'formik';
import { Button, NumberInput, Select } from '@mantine/core';
import FormikControl from 'components/common/formik/FormikControl';
import { StarIcon } from 'components/common/icons/star_icon/StarIcon';
import Rich_text from 'components/common/rich_text';
import { useContext, useEffect, useState } from 'react';
import { Store } from 'utils/Store';
import { showNotification } from '@mantine/notifications';
import { baseURL } from 'utils/constants';
import { axiosInstance } from 'utils/instance';
import { IUser } from 'src/interfaces/IUser';
import { useRouter } from 'next/router';
import { INews } from 'src/interfaces/INews';
import { FileUploader } from 'components/common/fileUploader';

export enum NewsType {
    Common = 'COMMON',
    Interview = 'INTERVIEW',
    Blog = 'BLOG',
    Sport = 'SPORT',
    Photo = 'PHOTO',
    Video = 'VIDEO',
}

interface IOptions {
    label: string;
    value: any;
    group?: string;
}

export const CreateVideoNewsForm = ({ currentNews }: { currentNews: INews }) => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;
    // console.log(currentNews);

    const categoriesArray: IOptions[] = [];
    const subCategoriesArray: IOptions[] = [];
    const subCategoriesTypeArray: IOptions[] = [];

    const [categories, setCategories] = useState<IOptions[]>(categoriesArray);
    const [subCategories, setSubCategories] = useState<IOptions[]>(subCategoriesArray);
    const [subCategoriesType, setSubCategoriesType] = useState<IOptions[]>(subCategoriesTypeArray);
    const [richText, setRichText] = useState(
        currentNews ? currentNews?.editorText : '<p>asdasd</p>'
    );

    const [moderators, setModerators] = useState<IUser[]>([]);

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
                    });

                    i.menu?.map((j: any) => {
                        subCategoriesArray.push({
                            value: j.id,
                            label: j.name,
                            group: i.name,
                        });

                        j.menu?.map((e: any) => {
                            subCategoriesTypeArray.push({
                                value: e.id,
                                label: e.name,
                                group: j.name,
                            });
                        });
                    });
                });

                setCategories([...categoriesArray]);
                setSubCategories([...subCategoriesArray]);
                setSubCategoriesType([...subCategoriesTypeArray]);
            })
            .catch((error) => {
                console.log('Categories fetch error: ', error);
            });
    };

    const newsTypes = [
        { label: 'COMMON', value: 'COMMON' },
        { label: 'INTERVIEW', value: 'INTERVIEW' },
        { label: 'BLOG', value: 'BLOG' },
        { label: 'SPORT', value: 'SPORT' },
        { label: 'PHOTO', value: 'PHOTO' },
        { label: 'VIDEO', value: 'VIDEO' },
    ];

    // const initialValues = {
    //     categoryId: currentNews?.categoryId ?? '',
    //     subCategoryId: currentNews?.subCategoryId ?? '',
    //     subCategoryTypeId: currentNews?.subCategoryTypeId ?? '',
    //     text: currentNews?.text ?? '',
    //     authorId: currentNews?.authorId ?? '',
    //     nameLink: currentNews?.nameLink ?? '',
    //     link: currentNews?.link ?? '',
    //     type: currentNews?.type ?? '',
    //     amountRating: currentNews?.amountRating ?? '',
    //     rating: currentNews?.rating ?? '',
    //     editorText: currentNews?.editorText ?? '',
    //     image: currentNews?.image ?? '',
    //     publishedAt: currentNews?.publishedAt ?? '',
    // };

    const initialValues = {
        categoryId: '',
        subCategoryId: '',
        subCategoryTypeId: '',
        text: '',
        authorId: '',
        nameLink: '',
        link: '',
        type: '',
        amountRating: 0,
        rating: 0.0,
        editorText: '',
        image: {
            url: '',
        },
        video: {
            url: '',
        },
        publishedAt: '',
    };

    const onSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
        const { publishedAt, subCategoryTypeId, amountRating, image, rating, video, ...rest } =
            values;

        const data = {
            publishedAt: publishedAt.replace('T', ' '),
            subCategoryTypeId: subCategoryTypeId === '' ? null : subCategoryTypeId,
            amountRating: amountRating === '' ? null : amountRating,
            rating: rating === '' ? null : rating,
            video: video.url === '' ? null : video,
            image: image.url === '' ? null : image,
            ...rest,
        };

        await axiosInstance({
            data: data,
            url: `${baseURL}/news${currentNews ? `/${currentNews.id}` : ''}`,
            method: currentNews ? 'PATCH' : 'POST',
            headers: {
                'authorization': `Bearer ${userInfo!.token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((data) => {
                // console.log(data.data);

                if (data) {
                    showNotification({
                        title: '',
                        message: data.data.message,
                    });
                }

                if (data.status === 200) {
                    // reload();
                }
            })
            .catch(({ response }) => {
                if (response) {
                    showNotification({
                        title: '',
                        message: response.data.message,
                        color: 'red',
                    });
                }
            });
    };

    const handleRichText = (setFieldValue: any, value: any) => {
        setRichText(value);
        setFieldValue('editorText', richText);
    };

    useEffect(() => {
        fetchCategories();
        fetchModerators();
    }, []);

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
            {({ values, setFieldValue }) => {
                console.log(typeof String(values));
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <FormikControl
                            name='text'
                            control='input'
                            label='Sarlavha'
                            placeholder='Matnni kiriting'
                        />
                        <div className='row'>
                            <Select
                                size='md'
                                name='authorId'
                                label='Muallif'
                                data={authorsData}
                                onChange={(e) => setFieldValue('authorId', e)}
                                value={values.authorId}
                                placeholder='Tanlang'
                            />
                            <Select
                                size='md'
                                name='type'
                                label='Yangilik turi'
                                data={newsTypes}
                                onChange={(e) => setFieldValue('type', e)}
                                value={values.type}
                                placeholder='Tanlang'
                            />
                            <FormikControl
                                name='publishedAt'
                                control='dateTime'
                                label='Chop etish vaqti'
                            />
                        </div>
                        <div>
                            <label htmlFor='editorText' className='mb-4'>
                                Matn tahriri
                            </label>
                            <Rich_text
                                value={richText!}
                                placeholder='Izoh'
                                className='editorTex mt-1'
                                onChange={(value) => handleRichText(setFieldValue, value)}
                            />
                        </div>
                        <div className='row'>
                            <Select
                                size='md'
                                name='categoryId'
                                data={categories}
                                placeholder='Tanlang'
                                label='Sport turi kategoriyasi'
                                value={values.categoryId}
                                onChange={(e) => setFieldValue('categoryId', e)}
                            />
                            <Select
                                size='md'
                                label='Subcategory'
                                name='subCategoryId'
                                data={subCategories}
                                placeholder='Tanlang'
                                value={values.subCategoryId}
                                onChange={(e) => setFieldValue('subCategoryId', e)}
                            />
                            <Select
                                size='md'
                                name='subCategoryTypeId'
                                label='Subcategory type'
                                data={subCategoriesType}
                                onChange={(e) => setFieldValue('subCategoryTypeId', e)}
                                value={values.subCategoryTypeId}
                                placeholder='Tanlang'
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
                                label='Baholaganlar soni'
                                defaultValue={0}
                                name='amountRating'
                                value={values.amountRating}
                                onChange={(val) => setFieldValue('amountRating', val)}
                                min={0}
                            />
                        </div>

                        <div className='row'>
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
