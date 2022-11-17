import { Field, ErrorMessage } from 'formik';
import { AddIcon } from '../icons';
import { ErrorText } from './ErrorText';
import s from './index.module.scss';

export const FormikImageUpload = (props: any) => {
    const { label, name, ...rest } = props;
    return (
        <div className={s.input_wrapper}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                {...rest}
                className={s.upload_input}
                type='file'
                accept='image/jpeg, image/png, image/gif, image/jpg, video/mp4'
            />
            <ErrorMessage component={ErrorText} name={name} />
        </div>
    );
};

export const ImageUpload = ({ preview, onChange }: any) => {
    return (
        <div className={s.add_logo_wrapper}>
            <div className={s.img_wrapper}>
                <div className={s.input_wrapper}>
                    <label htmlFor='avatar'>
                        <AddIcon />
                    </label>
                    <input
                        type='file'
                        id='avatar'
                        name='avatar'
                        onChange={onChange}
                        className={s.upload_input}
                        accept='image/jpeg, image/png, image/gif, image/jpg'
                    />
                </div>
                {preview !== null && (
                    <div
                        id='imagePreview'
                        className={s.preview_img ?? ''}
                        style={{
                            backgroundImage: `url(${preview})`,
                        }}
                    />
                )}
            </div>
        </div>
    );
};
