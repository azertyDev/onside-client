import { Image } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';
import { BallIcon, CheckIcon, CloseIcon, DeleteIcon } from '../icons';
import s from './index.module.scss';

export const FileUploader = (props: any) => {
    const { params } = useContext(Store);
    const { userInfo } = params;
    const [preview, setPreview] = useState<any>();

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const fileUploaded: File = event.target.files![0];

        await axiosInstance
            .post(
                '/common/image',
                {
                    image: fileUploaded,
                },
                {
                    headers: {
                        'authorization': `Bearer ${userInfo!.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then((data) => {
                if (data) {
                    showNotification({
                        title: '',
                        message: data.statusText,
                        color: 'teal',
                        icon: <CheckIcon />,
                        autoClose: 5000,
                    });
                }
                if (data.status === 200) {
                    props.setFieldValue(props.name, data.data.url);
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

        setPreview(URL.createObjectURL(fileUploaded));
    };

    const deleteImage = (event?: MouseEvent<HTMLElement>) => {
        setPreview(undefined);
        props.setFieldValue(props.name, '');
    };

    const deleteCurrentImage = async (event: MouseEvent<HTMLElement>) => {
        await axiosInstance
            .put(
                '/common/image',
                {
                    url: props.currentPreview,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo!.token}`,
                    },
                }
            )
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
                    props.setFieldValue(props.name, '');
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
        <div className={s.wrapper}>
            {!!props.currentPreview || preview ? (
                <div className={s.preview_block}>
                    <Image
                        src={props.currentPreview ?? preview}
                        alt='preview'
                        height={300}
                        width={300}
                    />
                    <span onClick={props.currentPreview ? deleteCurrentImage : deleteImage}>
                        <DeleteIcon className='w-5 h-5' fill='#ffffff' />
                    </span>
                </div>
            ) : (
                <div className={s.imageUpload}>
                    <label htmlFor='image'>
                        <BallIcon className='w-20 h-20' />
                        <input
                            name={props.name}
                            id='image'
                            type='file'
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            accept='image/*, video/*'
                        />
                    </label>
                </div>
            )}
        </div>
    );
};
