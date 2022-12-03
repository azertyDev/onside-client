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

    // console.log(props);
    
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
    };

    const deleteImage = (event?: MouseEvent<HTMLElement>) => {
        props.setFieldValue(props.name, '');
    };

    const deleteCurrentImage = async (event: MouseEvent<HTMLElement>) => {
        await axiosInstance
            .put(
                '/common/image',
                {
                    url: props.preview,
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
            <span className='mb-4'>
                {props.type === 'IMAGE' ? 'Rasm yuklash' : 'Video yuklash'}
                <span className='text-red-500 text-lg ml-[2px]'>*</span>
            </span>
            {props.preview ? (
                <div className={s.preview_block}>
                    {props.type === 'IMAGE' ? (
                        <Image width={300} height={300} alt='preview' src={props.preview} />
                    ) : props.type === 'VIDEO' ? (
                        <div className='w-full min-w-[300px] max-w-[500px] h-[300px]'>
                            <video controls className={s.video} src={props.preview} />
                        </div>
                    ) : null}

                    <span onClick={props.preview ? deleteCurrentImage : deleteImage}>
                        <span className={s.pulse} />
                        <DeleteIcon className='w-5 h-5' fill='#ffffff' />
                    </span>
                </div>
            ) : (
                <div className={s.imageUpload}>
                    <label htmlFor='file'>
                        <BallIcon
                            className={`w-20 h-20 ${props.type === 'VIDEO' ? 'animate-spin' : ''}`}
                        />
                        <input
                            name={props.name}
                            id='file'
                            type='file'
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            accept={`${
                                props.type === 'VIDEO'
                                    ? 'video/*'
                                    : props.type === 'IMAGE'
                                    ? 'image/*'
                                    : ''
                            }`}
                        />
                    </label>
                </div>
            )}
        </div>
    );
};
