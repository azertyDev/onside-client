import React from 'react';
import sInputFile from './inputFile.module.scss';
import Image from 'next/image';
import InputFileProps from './inputFile.props';
import FormikControl from 'components/common/formik/FormikControl';

const InputFile = ({
    name,
    image,
    setImage,
    createObjectURL,
    setCreateObjectURL,
    setFieldValue,
}: InputFileProps) => {

    const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        if (target.files && target.files[0]) {
            setCreateObjectURL([...createObjectURL, URL.createObjectURL(target.files[0])]);
            setImage([...image, target.files[0]]);
            setFieldValue(name, [...image, target.files[0]]);
        }
    };

    const handleRemoveImage = (url: string) => {
        const s = createObjectURL.filter((item, index) => {
            if (item !== url) {
                return item;
            }
        });
        console.log(s);
        
        setCreateObjectURL(s);
    };

    return (
        <div className={sInputFile.wrapperInputFile}>
            <span className={sInputFile.titleInputFile}>Картинка</span>
            <div className={sInputFile.bodyLoad}>
                <label className={sInputFile.fileLoadBlock}>
                    <div className={sInputFile.imgBlock}>
                        <Image
                            src='/assets/icons/loadIcon.svg'
                            alt='imgIcon'
                            layout='fill'
                            className={sInputFile.imgIcon}
                        />
                    </div>
                    <div className={sInputFile.tetleLoadBlock}>
                        <span>Загрузить фото</span>
                    </div>
                    <FormikControl
                        id='myFile'
                        control='imageUpload'
                        name={name}
                        placeholder='Загрузить картинку'
                        type='file'
                        onChange={(e: any) => uploadToClient(e)}
                    />
                </label>

                {createObjectURL.length === 0 ? (
                    <div className={sInputFile.previewLoadImg}>
                        <Image
                            src='/assets/img/vector.png'
                            alt='upload'
                            layout='fill'
                            className={sInputFile.previewLoad}
                        />
                    </div>
                ) : (
                    createObjectURL.map((url, i) => {
                        return (
                            <div key={i} className={sInputFile.previewblock}>
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(url)}
                                    className={sInputFile.btnBlock}
                                >
                                    <div className={sInputFile.btnImgBlock}>
                                        <Image
                                            src='/assets/icons/close.svg'
                                            alt='imgIcon'
                                            layout='fill'
                                            className={sInputFile.btnIcon}
                                        />
                                    </div>
                                </button>
                                <div className={sInputFile.previewImg}>
                                    <Image
                                        src={url}
                                        // src={`https://pic.sunagro.uz${url}`}
                                        alt='preview-img'
                                        layout='fill'
                                        className={sInputFile.preview}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default InputFile;
