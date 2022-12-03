import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FileUploader } from 'components/common/fileUploader';
import FormikControl from 'components/common/formik/FormikControl';
import { CheckIcon, CloseIcon } from 'components/common/icons';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { IChannel } from 'src/interfaces/IСhannel';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';

export const CreateChannelForm = ({
    currentChannel,
    setCurrentChannel,
}: {
    currentChannel: IChannel;
    setCurrentChannel: (channel: IChannel | undefined) => void;
}) => {
    const { params } = useContext(Store);
    const { userInfo } = params;

    const initialValues = {
        name: currentChannel?.name ?? '',
        link: currentChannel?.link ?? '',
        image: {
            url: currentChannel?.image?.url ?? '',
        },
    };

    const onSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
        await axiosInstance({
            data: values,
            method: currentChannel ? 'PATCH' : 'POST',
            url: `/channels${currentChannel ? `/${currentChannel.id}` : ''}`,
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
                    setCurrentChannel(undefined);
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
                            <FormikControl name='name' control='input' label='Kanal nomi' />
                            <FormikControl
                                name='link'
                                control='input'
                                label='Kanal havolasi (link)'
                            />
                        </div>

                        <div className='grid place-items-start'>
                            <FileUploader
                                name='image.url'
                                type='IMAGE'
                                preview={values?.image?.url}
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
