import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FileUploader } from 'components/common/fileUploader';
import FormikControl from 'components/common/formik/FormikControl';
import { CheckIcon, CloseIcon } from 'components/common/icons';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { IChempionship } from 'src/interfaces/IChempionship';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateChampionshipForm = ({
    currentChampionship,
    setCurrentChampionship,
}: {
    currentChampionship: IChempionship;
    setCurrentChampionship: (championship: IChempionship | undefined) => void;
}) => {
    const { params } = useContext(Store);
    const { userInfo } = params;

    const initialValues = {
        name: currentChampionship?.name ?? '',
        link: currentChampionship?.link ?? '',
        url: currentChampionship?.image?.url ?? '',
    };

    const onSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
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
                    setCurrentChampionship(undefined);
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

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
            {({ values, setFieldValue }) => {
                return (
                    <Form className='grid gap-8 sm:gap-5'>
                        <div className='grid grid-cols-2 sm:grid-cols-1 gap-8'>
                            <FormikControl name='name' control='input' label='Chempionat nomi' />
                            <FormikControl
                                name='link'
                                control='input'
                                label='Chempionat havolasi (link)'
                            />
                        </div>

                        <div className='grid place-items-start'>
                            <FileUploader
                                name='url'
                                type='IMAGE'
                                preview={values?.url}
                                setFieldValue={setFieldValue}
                            />
                        </div>
                        <Button variant='outline' type='submit' my='lg' size='md'>
                            Qabul qilish
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
