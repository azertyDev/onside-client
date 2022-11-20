import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FileUploader } from 'components/common/fileUploader';
import FormikControl from 'components/common/formik/FormikControl';
import { CheckIcon, CloseIcon } from 'components/common/icons';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { IChempionship } from 'src/interfaces/IChempionship';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateChampionshipForm = ({
    currentChampionship,
}: {
    currentChampionship: IChempionship;
}) => {
    const { reload } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;
    console.log(currentChampionship);

    const initialValues = {
        name: currentChampionship?.name ?? '',
        link: currentChampionship?.link ?? '',
        url: currentChampionship?.image?.url ?? '',
    };

    const onSubmit = async (values: any) => {
        console.log(values);

        await axiosInstance({
            data: values,
            method: currentChampionship ? 'PATCH' : 'POST',
            url: `/chempionships${currentChampionship ? `/${currentChampionship.id}` : ''}`,
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
                        <div className='row'>
                            <FormikControl name='name' control='input' label='name' />
                            <FormikControl name='link' control='input' label='link' />
                        </div>

                        <FileUploader
                            name='url'
                            setFieldValue={setFieldValue}
                            currentPreview={values?.url}
                        />

                        <Button variant='outline' type='submit' my='lg' size='md'>
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
