import { Button, NumberInput, Select } from '@mantine/core';
import InputFile from 'components/common/fileUpload/inputFile';
import FormikControl from 'components/common/formik/FormikControl';
import { StarIcon } from 'components/common/icons/star_icon/StarIcon';
import Rich_text from 'components/common/rich_text';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Store } from 'utils/Store';
import { showNotification } from '@mantine/notifications';
import { baseURL } from 'utils/constants';
import { axiosInstance } from 'utils/instance';
import { IUser } from 'src/interfaces/IUser';
import { useRouter } from 'next/router';

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

export const CreateNewsForm = () => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;

    const [richText, setRichText] = useState('');
    const [image, setImage] = useState<File[]>([]);
    const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);

    const dropdown = { label: 'Выберите', value: '', group: '' };
    const categoriesArray: IOptions[] = [];
    const subCategoriesArray: IOptions[] = [];
    const subCategoriesTypeArray: IOptions[] = [];

    const [categories, setCategories] = useState<IOptions[]>(categoriesArray);
    const [subCategories, setSubCategories] = useState<IOptions[]>(subCategoriesArray);
    const [subCategoriesType, setSubCategoriesType] = useState<IOptions[]>(subCategoriesTypeArray);

    categoriesArray.push(dropdown);
    subCategoriesArray.push(dropdown);
    subCategoriesTypeArray.push(dropdown);

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
        { label: 'Выберите', value: '' },
        { label: 'COMMON', value: 'COMMON' },
        { label: 'INTERVIEW', value: 'INTERVIEW' },
        { label: 'BLOG', value: 'BLOG' },
        { label: 'SPORT', value: 'SPORT' },
        { label: 'PHOTO', value: 'PHOTO' },
        { label: 'VIDEO', value: 'VIDEO' },
    ];

    const initialValues = {
        categoryId: '',
        subCategoryId: '',
        subCategoryTypeId: '',
        text: '',
        authorId: '',
        nameLink: '',
        link: '',
        type: '',
        amountRating: '',
        rating: '',
        editorText: '',
        image: '',
        publishedAt: '',
    };

    const onSubmit = async (values: any) => {
        const {
            categoryId,
            subCategoryId,
            subCategoryTypeId,
            text,
            authorId,
            nameLink,
            link,
            type,
            amountRating,
            rating,
            publishedAt,
        } = JSON.parse(JSON.stringify(values));
        console.log(values);

        const body: any = new FormData();

        if (subCategoryTypeId) {
            body.append('subCategoryTypeId', subCategoryTypeId);
        }

        body.append('text', text);
        body.append('amountRating', amountRating);
        body.append('image', image[0]);
        body.append('categoryId', categoryId);
        body.append('subCategoryId', subCategoryId);
        body.append('authorId', authorId);
        body.append('nameLink', nameLink);
        body.append('link', link);
        body.append('type', type);
        body.append('rating', rating);
        body.append('editorText', richText);
        body.append('publishedAt', publishedAt.replace('T', ' '));

        await fetch(`${baseURL}/news`, {
            headers: {
                authorization: `Bearer ${userInfo!.token}`,
            },
            method: 'POST',
            body,
        })
            .then((data: any) => {
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
            .catch((data) => {
                if (data) {
                    showNotification({
                        title: '',
                        message: data.statusText,
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <div className='row'>
                            <FormikControl name='text' control='input' label='Title' />

                            <Select
                                size='md'
                                name='authorId'
                                label='Author'
                                data={authorsData}
                                onChange={(e) => setFieldValue('authorId', e)}
                                value={values.authorId}
                            />
                            <Select
                                size='md'
                                name='type'
                                label='Type'
                                data={newsTypes}
                                onChange={(e) => setFieldValue('type', e)}
                                value={values.type}
                            />
                        </div>
                        <div>
                            <label htmlFor='editorText' className='mb-4'>
                                Editor
                            </label>
                            <Rich_text
                                value={richText!}
                                onChange={(value) => handleRichText(setFieldValue, value)}
                                className='editorTex mt-1'
                                placeholder='Описание'
                            />
                        </div>

                        <div className='row'>
                            <FormikControl name='nameLink' control='input' label='Source name' />
                            <FormikControl name='link' control='input' label='Source link' />
                            <FormikControl
                                name='publishedAt'
                                control='dateTime'
                                label='Publish time'
                            />
                        </div>

                        <div className='row'>
                            <Select
                                size='md'
                                name='categoryId'
                                label='Category'
                                data={categories}
                                onChange={(e) => setFieldValue('categoryId', e)}
                                value={values.categoryId}
                            />
                            <Select
                                size='md'
                                name='subCategoryId'
                                label='Subcategory'
                                data={subCategories}
                                onChange={(e) => setFieldValue('subCategoryId', e)}
                                value={values.subCategoryId}
                            />
                            <Select
                                size='md'
                                name='subCategoryTypeId'
                                label='Subcategory type'
                                data={subCategoriesType}
                                onChange={(e) => setFieldValue('subCategoryTypeId', e)}
                                value={values.subCategoryTypeId}
                            />
                        </div>

                        <div className='row'>
                            <NumberInput
                                size='md'
                                decimalSeparator=','
                                label='rating'
                                defaultValue={0.0}
                                name='rating'
                                precision={2}
                                step={0.5}
                                max={5}
                                onChange={(val) => setFieldValue('rating', val)}
                                icon={<StarIcon className='w-6 h-6' />}
                            />
                            <NumberInput
                                size='md'
                                label='Amount rating'
                                defaultValue={0}
                                name='amountRating'
                                onChange={(val) => setFieldValue('amountRating', val)}
                            />
                        </div>

                        <InputFile
                            name='image'
                            image={image}
                            setImage={setImage}
                            createObjectURL={createObjectURL}
                            setCreateObjectURL={setCreateObjectURL}
                            setFieldValue={setFieldValue}
                        />

                        <Button variant='outline' type='submit' my='lg'>
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
