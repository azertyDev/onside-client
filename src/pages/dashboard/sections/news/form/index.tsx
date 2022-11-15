import { Button, Group, NumberInput, Select } from '@mantine/core';
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

    const fetchCategories = async () => {
        await axiosInstance
            .get('/categories')
            .then(({ data }) => {
                data.map((i: any) => {
                    categoriesArray.push({
                        value: i.id,
                        label: i.name,
                    });

                    i.menu.map((j: any) => {
                        subCategoriesArray.push({
                            value: j.id,
                            label: j.name,
                            group: i.name,
                        });

                        j.menu.map((e: any) => {
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
        author: '',
        authorLink: '',
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
            author,
            authorLink,
            nameLink,
            link,
            type,
            amountRating,
            rating,
            publishedAt,
        } = JSON.parse(JSON.stringify(values));

        const body: any = new FormData();

        if (subCategoryTypeId) {
            body.append('subCategoryTypeId', subCategoryTypeId);
        }
        body.append('image', image[0]);
        body.append('categoryId', categoryId);
        body.append('subCategoryId', subCategoryId);

        body.append('text', text);
        body.append('author', author);
        body.append('authorLink', authorLink);
        body.append('nameLink', nameLink);
        body.append('link', link);
        body.append('type', type);
        body.append('amountRating', amountRating);
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
                console.log(data);

                if (data) {
                    showNotification({
                        title: '',
                        message: data.statusText,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleRichText = (setFieldValue: any, value: any) => {
        setRichText(value);
        setFieldValue('editorText', richText);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <div className='row'>
                            <Select
                                size='md'
                                name='categoryId'
                                label='categoryId'
                                data={categories}
                                onChange={(e) => setFieldValue('categoryId', e)}
                                value={values.categoryId}
                            />
                            <Select
                                size='md'
                                name='subCategoryId'
                                label='subCategoryId'
                                data={subCategories}
                                onChange={(e) => setFieldValue('subCategoryId', e)}
                                value={values.subCategoryId}
                            />
                            <Select
                                size='md'
                                name='subCategoryTypeId'
                                label='subCategoryTypeId'
                                data={subCategoriesType}
                                onChange={(e) => setFieldValue('subCategoryTypeId', e)}
                                value={values.subCategoryTypeId}
                            />
                        </div>

                        <div className='row'>
                            <FormikControl name='text' control='input' label='text' />
                            <FormikControl name='author' control='input' label='author' />
                            <FormikControl name='authorLink' control='input' label='authorLink' />
                        </div>

                        <div className='row'>
                            <FormikControl name='nameLink' control='input' label='nameLink' />
                            <FormikControl name='link' control='input' label='link' />
                            <Select
                                size='md'
                                name='type'
                                label='type'
                                data={newsTypes}
                                onChange={(e) => setFieldValue('type', e)}
                                value={values.type}
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
                                label='amountRating'
                                defaultValue={0}
                                name='amountRating'
                                onChange={(val) => setFieldValue('amountRating', val)}
                            />
                            <FormikControl
                                name='publishedAt'
                                control='dateTime'
                                label='publishedAt'
                            />
                        </div>

                        <div>
                            <label htmlFor='editorText' className='mb-4'>
                                editorText
                            </label>
                            <Rich_text
                                value={richText!}
                                onChange={(value) => handleRichText(setFieldValue, value)}
                                className='editorText'
                                placeholder='Описание'
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
