import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { Store } from 'utils/Store';

export const CreateCategoriesForm = () => {
    const { params } = useContext(Store);
    const { userInfo } = params;

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

    const onSubmit = async (values: any) => {};

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => {
                return <Form className='grid gap-8 sm:gap-5'></Form>;
            }}
        </Formik>
    );
};
